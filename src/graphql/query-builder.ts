import Model from '../orm/model';
import { Arguments, Field } from '../support/interfaces';
import { upcaseFirstLetter } from '../support/utils';
import gql from 'graphql-tag';
import Context from '../common/context';

/**
 * Contains all logic to build GraphQL queries and transform variables between the format Vuex-ORM requires and the
 * format of the GraphQL API.
 */
export default class QueryBuilder {


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
  public static buildField (model: Model | string,
                     multiple: boolean = true,
                     args?: Arguments,
                     ignoreModels: Array<Model> = [],
                     name?: string,
                     allowIdFields: boolean = false): string {

    const context = Context.getInstance();
    model = context.getModel(model);
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
  public static buildQuery (type: string, model: Model | string, name?: string, args?: Arguments, multiple?: boolean) {
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
      `  ${this.buildField(model, multiple, args, [], name, true)}\n` +
      `}`;

    return gql(query);
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
  private static determineAttributeType (model: Model, key: string, value: any): string {
    const field: undefined | Field = model.fields.get(key);
    const context = Context.getInstance();

    if (field && field instanceof context.components.String) {
      return 'String';
    } else if (field && field instanceof context.components.Number) {
      return 'Int';
    } else if (field && field instanceof context.components.Boolean) {
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
  private static buildRelationsQuery (model: (null | Model), ignoreModels: Array<Model> = []): string {
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

      if (model.shouldEagerLoadRelation(field, relatedModel) &&
          !this.shouldModelBeIgnored(relatedModel, ignoreModels)) {

        const multiple: boolean = !(field instanceof context.components.BelongsTo ||
          field instanceof context.components.HasOne);

        relationQueries.push(this.buildField(relatedModel, multiple, undefined, ignoreModels, name));
      }
    });

    return relationQueries.join('\n');
  }

  private static shouldModelBeIgnored (model: Model, ignoreModels: Array<Model>): boolean {
    return ignoreModels.find((m) => m.singularName === model.singularName) !== undefined;
  }
}
