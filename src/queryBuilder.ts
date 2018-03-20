import { parse } from 'graphql/language/parser';
import Logger from './logger';
import Model from './model';
import { print } from 'graphql/language/printer';
import { Arguments, Data, Field } from './interfaces';
import { downcaseFirstLetter, upcaseFirstLetter } from './utils';
import gql from 'graphql-tag';

const inflection = require('inflection');

/**
 * Contains all logic to build GraphQL queries and transform variables between the format Vuex-ORM requires and the
 * format of the GraphQL API.
 */
export default class QueryBuilder {
  /**
   * Logger, is injected into the constructor.
   */
  private readonly logger: Logger;

  /**
   * Helper method to get the model by name
   * @param {Model|string} name
   * @returns {Model}
   */
  private readonly getModel: (name: Model | string) => Model;

  /**
   * Constructor.
   * @param {Logger} logger
   * @param {(name: (Model | string)) => Model} getModel
   */
  public constructor (logger: Logger, getModel: (name: Model | string) => Model) {
    this.logger = logger;
    this.getModel = getModel;
  }

  /**
   * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
   * @param {string} query
   * @returns {string}
   */
  public static prettify (query: string): string {
    return print(parse(query));
  }

  /**
   * Builds a field for the GraphQL query and a specific model
   *
   * @param {Model|string} model The model to use
   * @param {boolean} multiple Determines whether plural/nodes syntax or singular syntax is used.
   * @param {Arguments} args The args that will be passed to the query field ( user(role: $role) )
   * @param {Model} rootModel The model of the root query field. Used to avoid endless recursion
   * @param {string} name Optional name of the field. If not provided, this will be the model name
   * @param {boolean} allowIdFields Optional. Determines if id fields will be ignored for the argument generation.
   *                                See buildArguments
   * @returns {string}
   *
   * @todo Do we need the allowIdFields param?
   * @todo There could be a endless recursion even with rootModel correctly set. We should track an array of models here probably?
   */
  public buildField (model: Model | string,
                     multiple: boolean = true,
                     args?: Arguments,
                     rootModel?: Model,
                     name?: string,
                     allowIdFields: boolean = false): string {
    model = this.getModel(model);

    let params: string = this.buildArguments(args, false, allowIdFields);

    const fields = `
      ${model.getQueryFields().join(' ')}
      ${this.buildRelationsQuery(model, rootModel)}
    `;

    if (multiple) {
      return `
        ${name ? name : model.pluralName}${params} {
          nodes {
            ${fields}
          }
        }
      `;
    } else {
      return `
        ${name ? name : model.singularName}${params} {
          ${fields}
        }
      `;
    }
  }

  /**
   * Generates a query.
   * Currently only one root field for the query is possible.
   * @param {string} type 'mutation' or 'query'
   * @param {Model | string} model The model this query or mutation affects. This mainly determines the query fields.
   * @param {string} name Optional name of the query/mutation. Will overwrite the name from the model.
   * @param {Arguments} args Arguments for the query
   * @param {boolean} multiple Determines if the root query field is a connection or not (will be passed to buildField)
   * @returns {any}
   */
  public buildQuery (type: string, model: Model | string, name?: string, args?: Arguments, multiple?: boolean) {
    // model
    model = this.getModel(model);
    if (!model) throw new Error('No model provided to build the query!');

    // args
    args = args ? JSON.parse(JSON.stringify(args)) : {};
    if (!args) throw new Error('args is undefined');

    if (args[model.singularName] && typeof args[model.singularName] === 'object') {
      args[model.singularName] = { __type: upcaseFirstLetter(model.singularName) };
    }

    // multiple
    multiple = multiple === undefined ? !args['id'] : multiple;

    // name
    if (!name) name = (multiple ? model.pluralName : model.singularName);

    // build query
    const query: string =
      `${type} ${upcaseFirstLetter(name)}${this.buildArguments(args, true)} {\n` +
      `  ${this.buildField(model, multiple, args, model, name, true)}\n` +
      `}`;

    return gql(query);
  }

  /**
   * Transforms outgoing data. Use for variables param.
   *
   * Omits relations and id fields.
   *
   * @param {Data} data
   * @returns {Data}
   */
  public transformOutgoingData (data: Data): Data {
    const model: Model = this.getModel(data.$self().entity);
    const relations: Map<string, Field> = model.getRelations();
    const returnValue: Data = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Ignore IDs and connections
      if (!relations.has(key) && key !== 'id') {
        returnValue[key] = value;
      }
    });

    return returnValue;
  }

  /**
   * Transforms a set of incoming data to the format vuex-orm requires.
   *
   * @param {Data | Array<Data>} data
   * @param {boolean} recursiveCall
   * @returns {Data}
   */
  public transformIncomingData (data: Data | Array<Data>, mutationResult: boolean = false, recursiveCall: boolean = false): Data {
    let result: Data = {};

    if (!recursiveCall) {
      this.logger.group('Transforming incoming data');
      this.logger.log('Raw data:', data);
    }

    if (data instanceof Array) {
      result = data.map(d => this.transformIncomingData(d, mutationResult, true));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof Object) {
            if (data[key].nodes) {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes, mutationResult, true);
            } else {
              let newKey = key;

              if (mutationResult) {
                newKey = newKey.replace(/^(create|update)(.+)/, '$2');
                newKey = downcaseFirstLetter(newKey);
              }

              result[inflection.singularize(newKey)] = this.transformIncomingData(data[key], mutationResult, true);
            }
          } else if (key === 'id') {
            result[key] = parseInt(data[key], 0);
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    if (!recursiveCall) {
      this.logger.log('Transformed data:', result);
      this.logger.groupEnd();
    }

    return result;
  }

  /**
   * Generates the arguments string for a graphql query based on a given map.
   *
   * There are three types of arguments:
   *
   * 1) Signatures with simple types (signature = true)
   *      mutation createUser($name: String!)
   *
   * 2) Signatures with object types (signature = true, args = { user: { __type: 'User' }})
   *      mutation createUser($user: UserInput!)
   *
   * 3) Fields with variables (signature = false)
   *      query user(id: $id)
   *
   * @param {Arguments | undefined} args
   * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
   * @param {boolean} allowIdFields If true, ID fields will be included in the arguments list
   * @returns {String}
   */
  private buildArguments (args?: Arguments, signature: boolean = false, allowIdFields: boolean = true): string {
    if (args === undefined) return '';

    let returnValue: string = '';
    let first: boolean = true;

    if (args) {
      Object.keys(args).forEach((key: string) => {
        let value: any = args[key];

        // Ignore ids and connections
        if (!(value instanceof Array || (key === 'id' && !allowIdFields))) {
          let typeOrValue: any = '';

          if (signature) {
            if (typeof value === 'object' && value.__type) {
              // Case 2 (User!)
              typeOrValue = value.__type + 'Input!';
            } else if (key === 'id') {
              // Case 1 (ID!)
              typeOrValue = 'ID!';
            } else {
              // Case 1 (String!)
              typeOrValue = typeof value === 'number' ? 'Number!' : 'String!';
            }
          } else {
            // Case 3 (user: $user)
            typeOrValue = `$${key}`;
          }

          returnValue = `${returnValue}${first ? '' : ', '}${(signature ? '$' : '') + key}: ${typeOrValue}`;
          first = false;
        }
      });

      if (!first) returnValue = `(${returnValue})`;
    }

    return returnValue;
  }

  /**
   *
   * @param {Model} model
   * @param {Model} rootModel
   * @returns {Array<String>}
   */
  private buildRelationsQuery (model: (null | Model), rootModel?: Model) {
    if (model === null) return '';

    const relationQueries: Array<string> = [];

    model.getRelations().forEach((field: Field, name: string) => {
      if (!rootModel || (name !== rootModel.singularName && name !== rootModel.pluralName)) {
        const multiple: boolean = field.constructor.name !== 'BelongsTo';
        relationQueries.push(this.buildField(name, multiple, undefined, rootModel || model));
      }
    });

    return relationQueries;
  }
}
