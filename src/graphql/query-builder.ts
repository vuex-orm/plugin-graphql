import Model from '../orm/model';
import { Arguments, Field } from '../support/interfaces';
import { upcaseFirstLetter } from '../support/utils';
import gql from 'graphql-tag';
import Context from '../common/context';
const inflection = require('inflection');

/**
 * Contains all logic to build GraphQL queries/mutations.
 */
export default class QueryBuilder {
  /**
   * Builds a field for the GraphQL query and a specific model
   *
   * @param {Model|string} model The model to use
   * @param {boolean} multiple Determines whether plural/nodes syntax or singular syntax is used.
   * @param {Arguments} args The args that will be passed to the query field ( user(role: $role) )
   * @param {Array<Model>} path The relations in this list are ignored (while traversing relations).
   *                                    Mainly for recursion
   * @param {string} name Optional name of the field. If not provided, this will be the model name
   * @param filter
   * @param {boolean} allowIdFields Optional. Determines if id fields will be ignored for the argument generation.
   *                                See buildArguments
   * @returns {string}
   *
   * @todo Do we need the allowIdFields param?
   */
  public static buildField (model: Model | string,
                     multiple: boolean = true,
                     args?: Arguments,
                     path: Array<string> = [],
                     name?: string,
                     filter: boolean = false,
                     allowIdFields: boolean = false): string {

    const context = Context.getInstance();
    model = context.getModel(model);

    let params: string = this.buildArguments(model, args, false, filter, allowIdFields);
    path = path.length === 0 ? [model.singularName] : path;

    const fields = `
      ${model.getQueryFields().join(' ')}
      ${this.buildRelationsQuery(model, path)}
    `;

    if (multiple) {
      const header: string = `${name ? name : model.pluralName}${params}`;

      if (context.connectionQueryMode === 'nodes') {
        return `
          ${header} {
            nodes {
              ${fields}
            }
          }
        `;
      } else if (context.connectionQueryMode === 'edges') {
        return `
          ${header} {
            edges {
              node {
                ${fields}
              }
            }
          }
        `;
      } else {
        return `
          ${header} {
            ${fields}
          }
        `;
      }
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
   * @param {boolean} filter When true the query arguments are passed via a filter object.
   * @returns {any} Whatever gql() returns
   */
  public static buildQuery (type: string, model: Model | string, name?: string, args?: Arguments, multiple?: boolean,
                            filter?: boolean) {
    const context = Context.getInstance();

    // model
    model = context.getModel(model);
    if (!model) throw new Error('No model provided to build the query!');

    // args
    args = args ? JSON.parse(JSON.stringify(args)) : {};
    if (!args) throw new Error('args is undefined');

    Object.keys(args).forEach((key: string) => {
      if (args && args[key] && typeof args[key] === 'object') {
        args[key] = { __type: upcaseFirstLetter(key) };
      }
    });

    // multiple
    multiple = multiple === undefined ? !args['id'] : multiple;

    // name
    if (!name) name = (multiple ? model.pluralName : model.singularName);

    // build query
    const query: string =
      `${type} ${upcaseFirstLetter(name)}${this.buildArguments(model, args, true, false)} {\n` +
      `  ${this.buildField(model, multiple, args, [], name, filter, true)}\n` +
      `}`;

    return gql(query);
  }

  /**
   * Generates the arguments string for a graphql query based on a given map.
   *
   * There are three types of arguments:
   *
   * 1) Signatures with primitive types (signature = true)
   *      => 'mutation createUser($name: String!)'
   *
   * 2) Signatures with object types (signature = true, args = { user: { __type: 'User' }})
   *      => 'mutation createUser($user: UserInput!)'
   *
   * 3) Fields with variables (signature = false)
   *      => 'user(id: $id)'
   *
   * 4) Filter fields with variables (signature = false, filter = true)
   *      => 'users(filter: { active: $active })'
   *
   * @param model
   * @param {Arguments | undefined} args
   * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
   * @param filter
   * @param {boolean} allowIdFields If true, ID fields will be included in the arguments list
   * @returns {String}
   */
  private static buildArguments (model: Model, args?: Arguments, signature: boolean = false, filter: boolean = false,
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
            const schemaField = Context.getInstance().schema!.getType(model.singularName).fields!
              .find(f => f.name === key);

            if (typeof value === 'object' && value.__type) {
              // Case 2 (User!)
              typeOrValue = value.__type + 'Input!';
            } else if (schemaField && schemaField.type.name) {
              // Case 1, 3 and 4
              typeOrValue = schemaField.type.name + '!';
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
  private static determineAttributeType (model: Model, key: string, value: any): string {
    const context: Context = Context.getInstance();
    const field: undefined | Field = model.fields.get(key);

    const schemaField = context.schema!.getType(model.singularName).fields!.find(f => f.name === key);

    if (schemaField && schemaField.type.name) {
      return schemaField.type.name;
    } else {
      if (field instanceof context.components.String) {
        return 'String';
      } else if (field && field instanceof context.components.Number) {
        return 'Int';
      } else if (field && field instanceof context.components.Boolean) {
        return 'Boolean';
      } else {
        if (typeof value === 'number') return 'Int';
        if (typeof value === 'string') return 'String';
        if (typeof value === 'boolean') return 'Boolean';

        throw new Error(`Can't find suitable graphql type for field '${model.singularName}.${key}'.`);
      }
    }
  }

  /**
   * Generates the fields for all related models.
   *
   * @param {Model} model
   * @param {Array<Model>} path
   * @returns {string}
   */
  private static buildRelationsQuery (model: (null | Model), path: Array<string> = []): string {
    if (model === null) return '';

    const context = Context.getInstance();
    const relationQueries: Array<string> = [];

    model.getRelations().forEach((field: Field, name: string) => {
      let relatedModel: Model;

      if (field.related) {
        relatedModel = context.getModel(field.related.entity);
      } else if (field.parent) {
        relatedModel = context.getModel(field.parent.entity);
      } else {
        relatedModel = context.getModel(name);
        context.logger.log('WARNING: field has neither parent nor related property. Fallback to attribute name', field);
      }

      const singularizedFieldName = inflection.singularize(name);
      const ignore = path.includes(singularizedFieldName);

      // console.log(`-----> Will ${ignore ? '' : 'not'} ignore ${model.singularName}.${name}, path: ${path.join('.')}`);

      if (model.shouldEagerLoadRelation(name, field, relatedModel) && !ignore) {
        const multiple: boolean = !(field instanceof context.components.BelongsTo ||
          field instanceof context.components.HasOne);

        const newPath = path.slice(0);
        newPath.push(singularizedFieldName);

        relationQueries.push(this.buildField(relatedModel, multiple, undefined, newPath, name, false));
      }
    });

    return relationQueries.join('\n');
  }
}
