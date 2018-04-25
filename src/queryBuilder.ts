import { parse } from 'graphql/language/parser';
import Logger from './logger';
import Model from './model';
import { print } from 'graphql/language/printer';
import { Arguments, Data, Field } from './interfaces';
import { downcaseFirstLetter, upcaseFirstLetter } from './utils';
import gql from 'graphql-tag';
import { BelongsTo } from '@vuex-orm/core';
import Context from './context';

const inflection = require('inflection');

/**
 * Contains all logic to build GraphQL queries and transform variables between the format Vuex-ORM requires and the
 * format of the GraphQL API.
 */
export default class QueryBuilder {
  /**
   * Context
   */
  private readonly context: Context;

  /**
   * Constructor.
   * @param {Logger} logger
   * @param {(name: (Model | string)) => Model} getModel
   */
  public constructor (context: Context) {
    this.context = context;
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
   * @param {Array<Model>} ignoreModels The models in this list are ignored (while traversing relations). Mainly for recursion
   * @param {string} name Optional name of the field. If not provided, this will be the model name
   * @param {boolean} allowIdFields Optional. Determines if id fields will be ignored for the argument generation.
   *                                See buildArguments
   * @returns {string}
   *
   * @todo Do we need the allowIdFields param?
   */
  public buildField (model: Model | string,
                     multiple: boolean = true,
                     args?: Arguments,
                     ignoreModels: Array<Model> = [],
                     name?: string,
                     allowIdFields: boolean = false): string {
    model = this.getModel(model);
    ignoreModels.push(model);

    let params: string = this.buildArguments(model, args, false, multiple, allowIdFields);

    const fields = `
      ${model.getQueryFields().join(' ')}
      ${this.buildRelationsQuery(model, ignoreModels)}
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
      `${type} ${upcaseFirstLetter(name)}${this.buildArguments(model, args, true, false)} {\n` +
      `  ${this.buildField(model, multiple, args, [], name, true)}\n` +
      `}`;

    return gql(query);
  }

  /**
   * Transforms outgoing data. Use for variables param.
   *
   * Omits relations and id fields.
   *
   * @param model
   * @param {Data} data
   * @returns {Data}
   */
  public transformOutgoingData (model: Model, data: Data): Data {
    const relations: Map<string, Field> = model.getRelations();
    const returnValue: Data = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Ignore IDs and connections and empty fields
      if (!relations.has(key) && !key.startsWith('$') && key !== 'id' && value !== null) {
        returnValue[key] = value;
      }
    });

    return returnValue;
  }

  /**
   * Transforms a set of incoming data to the format vuex-orm requires.
   *
   * @param {Data | Array<Data>} data
   * @param model
   * @param mutation required to transform something like `disableUserAddress` to the actual model name.
   * @param {boolean} recursiveCall
   * @returns {Data}
   */
  public transformIncomingData (data: Data | Array<Data>, model: Model, mutation: boolean = false, recursiveCall: boolean = false): Data {
    let result: Data = {};

    if (!recursiveCall) {
      this.context.logger.group('Transforming incoming data');
      this.context.logger.log('Raw data:', data);
    }

    if (data instanceof Array) {
      result = data.map(d => this.transformIncomingData(d, model, mutation, true));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof Object) {
            if (data[key].nodes) {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes, model, mutation, true);
            } else {
              let newKey = key;

              if (mutation && !recursiveCall) {
                newKey = data[key].nodes ? model.pluralName : model.singularName;
                newKey = downcaseFirstLetter(newKey);
              }

              result[newKey] = this.transformIncomingData(data[key], model, mutation, true);
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
      this.context.logger.log('Transformed data:', result);
      this.context.logger.groupEnd();
    } else {
      result['$isPersisted'] = true;
    }

    // MAke sure this is really a plain JS object. We had some issues in testing here.
    return JSON.parse(JSON.stringify(result));
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
   * 4) Filter fields with variables (signature = false, filter = true)
   *      query users(filter: { active: $active })
   *
   * @param model
   * @param {Arguments | undefined} args
   * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
   * @param filter
   * @param {boolean} allowIdFields If true, ID fields will be included in the arguments list
   * @returns {String}
   */
  private buildArguments (model: Model, args?: Arguments, signature: boolean = false, filter: boolean = false,
                          allowIdFields: boolean = true): string {
    if (args === undefined) return '';

    let returnValue: string = '';
    let first: boolean = true;

    if (args) {
      Object.keys(args).forEach((key: string) => {
        let value: any = args[key];

        const isForeignKey = model.skipField(key);
        const skipFieldDueId = (key === 'id' || isForeignKey) && !allowIdFields;

        // Ignore null fields, ids and connections
        if (value && !(value instanceof Array || skipFieldDueId)) {
          let typeOrValue: any = '';

          if (signature) {
            if (typeof value === 'object' && value.__type) {
              // Case 2 (User!)
              typeOrValue = value.__type + 'Input!';
            } else if (key === 'id' || isForeignKey) {
              // Case 1 (ID!)
              typeOrValue = 'ID!';
            } else {
              // Case 1 (String!)
              typeOrValue = this.determineAttributeType(model, key, value);
              typeOrValue = typeOrValue + '!';
            }
          } else {
            // Case 3 or 4
            typeOrValue = `$${key}`;
          }

          returnValue = `${returnValue}${first ? '' : ', '}${(signature ? '$' : '') + key}: ${typeOrValue}`;

          first = false;
        }
      });

      if (!first) {
        if (filter) returnValue = `filter: { ${returnValue} }`;
        returnValue = `(${returnValue})`;
      }
    }

    return returnValue;
  }

  /**
   * Determines the GraphQL primitive type of a field in the variables hash by the field type or (when
   * the field type is generic attribute) by the variable type.
   * @param {Model} model
   * @param {string} key
   * @param {string} value
   * @returns {string}
   */
  private determineAttributeType (model: Model, key: string, value: any): string {
    const field: undefined | Field = model.fields.get(key);

    if (field && field instanceof this.context.components.String) {
      return 'String';
    } else if (field && field instanceof this.context.components.Number) {
      return 'Int';
    } else if (field && field instanceof this.context.components.Boolean) {
      return 'Boolean';
    } else {
      if (typeof value === 'number') return 'Int';
      if (typeof value === 'string') return 'String';
      if (typeof value === 'boolean') return 'Boolean';
    }

    throw new Error(`Can't find suitable graphql type for variable ${key} for model ${model.singularName}`);
  }

  /**
   *
   * @param {Model} model
   * @param {Array<Model>} ignoreModels The models in this list are ignored (while traversing relations).
   * @returns {string}
   */
  private buildRelationsQuery (model: (null | Model), ignoreModels: Array<Model> = []): string {
    if (model === null) return '';

    const relationQueries: Array<string> = [];

    model.getRelations().forEach((field: Field, name: string) => {
      let relatedModel: Model;

      if (field.related) {
        relatedModel = this.getModel(field.related.name);
      } else if (field.parent) {
        relatedModel = this.getModel(field.parent.name);
      } else {
        relatedModel = this.getModel(name);
        this.context.logger.log('WARNING: field has neither parent nor related property. Fallback to attribute name',
          field);
      }

      if (this.shouldEagerLoadRelation(model, field, relatedModel) &&
          !this.shouldModelBeIgnored(relatedModel, ignoreModels)) {

        const multiple: boolean = !(field instanceof this.context.components.BelongsTo ||
          field instanceof this.context.components.HasOne);

        relationQueries.push(this.buildField(relatedModel, multiple, undefined, ignoreModels, name));
      }
    });

    return relationQueries.join('\n');
  }

  /**
   * Determines if we should eager load (means: add a query field) a related entity. belongsTo or hasOne related
   * entities are always eager loaded. Others can be added to the eagerLoad array of the model.
   *
   * @param {Model} model The base model
   * @param {Field} field Relation field
   * @param {Model} relatedModel Related model
   * @returns {boolean}
   */
  private shouldEagerLoadRelation (model: Model, field: Field, relatedModel: Model): boolean {
    if (field instanceof this.context.components.HasOne || field instanceof this.context.components.BelongsTo) {
      return true;
    }

    const eagerLoadList: Array<String> = model.baseModel.eagerLoad || [];
    return eagerLoadList.find((n) => n === relatedModel.singularName || n === relatedModel.pluralName) !== undefined;
  }

  private shouldModelBeIgnored (model: Model, ignoreModels: Array<Model>): boolean {
    return ignoreModels.find((m) => m.singularName === model.singularName) !== undefined;
  }

  /**
   * Helper method to get the model by name
   * @param {Model|string} name
   * @returns {Model}
   */
  private getModel (name: Model | string): Model {
    return this.context.getModel(name);
  }
}
