import { Relation } from "@vuex-orm/core";
import Model from "../orm/model";
import { Arguments, Field, GraphQLField } from "../support/interfaces";
import { clone, isPlainObject, takeWhile, upcaseFirstLetter } from "../support/utils";
import gql from "graphql-tag";
import Context from "../common/context";
import Schema from "./schema";

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
  public static buildField(
    model: Model | string,
    multiple: boolean = true,
    args?: Arguments,
    path: Array<string> = [],
    name?: string,
    filter: boolean = false,
    allowIdFields: boolean = false
  ): string {
    const context = Context.getInstance();
    model = context.getModel(model);

    name = name ? name : model.pluralName;
    const field = context.schema!.getMutation(name, true) || context.schema!.getQuery(name, true);

    let params: string = this.buildArguments(model, args, false, filter, allowIdFields, field);
    path = path.length === 0 ? [model.singularName] : path;

    const fields = `
      ${model.getQueryFields().join(" ")}
      ${this.buildRelationsQuery(model, path)}
    `;

    if (multiple) {
      const header: string = `${name}${params}`;

      if (context.connectionQueryMode === "nodes") {
        return `
          ${header} {
            nodes {
              ${fields}
            }
          }
        `;
      } else if (context.connectionQueryMode === "edges") {
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
  public static buildQuery(
    type: string,
    model: Model | string,
    name?: string,
    args?: Arguments,
    multiple?: boolean,
    filter?: boolean
  ) {
    const context = Context.getInstance();

    // model
    model = context.getModel(model);
    if (!model) throw new Error("No model provided to build the query!");

    // args
    args = args ? clone(args) : {};
    if (!args) throw new Error("args is undefined");

    Object.keys(args).forEach((key: string) => {
      if (args && args[key] && isPlainObject(args[key])) {
        args[key] = { __type: upcaseFirstLetter(key) };
      }
    });

    // multiple
    multiple = multiple === undefined ? !args["id"] : multiple;

    // name
    if (!name) name = multiple ? model.pluralName : model.singularName;

    // field
    const field = context.schema!.getMutation(name, true) || context.schema!.getQuery(name, true);

    // build query
    const query: string =
      `${type} ${upcaseFirstLetter(name)}${this.buildArguments(
        model,
        args,
        true,
        filter,
        true,
        field
      )} {\n` +
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
   * @param {GraphQLField} field Optional. The GraphQL mutation or query field
   * @returns {String}
   */
  public static buildArguments(
    model: Model,
    args?: Arguments,
    signature: boolean = false,
    filter: boolean = false,
    allowIdFields: boolean = true,
    field: GraphQLField | null = null
  ): string {
    if (args === undefined) return "";

    let returnValue: string = "";
    let first: boolean = true;

    if (args) {
      Object.keys(args).forEach((key: string) => {
        let value: any = args[key];

        const isForeignKey = model.skipField(key);
        const skipFieldDueId = (key === "id" || isForeignKey) && !allowIdFields;

        let schemaField: GraphQLField | undefined = this.findSchemaFieldForArgument(
          key,
          field,
          model,
          filter
        );

        const isConnectionField =
          schemaField && Schema.getTypeNameOfField(schemaField).endsWith("TypeConnection");

        // Ignore null fields, ids and connections
        if (value && !skipFieldDueId && !isConnectionField) {
          let typeOrValue: any = "";

          if (signature) {
            if (isPlainObject(value) && value.__type) {
              // Case 2 (User!)
              typeOrValue = value.__type + "Input!";
            } else if (Array.isArray(value) && field) {
              const arg = QueryBuilder.findSchemaFieldForArgument(key, field, model, filter);
              if (!arg) {
                throw new Error(
                  `The argument ${key} is of type array but it's not possible to determine the type, because it's not in the field ${
                    field.name
                  }`
                );
              }

              typeOrValue = Schema.getTypeNameOfField(arg) + "!";
            } else if (schemaField && Schema.getTypeNameOfField(schemaField)) {
              // Case 1, 3 and 4
              typeOrValue = Schema.getTypeNameOfField(schemaField) + "!";
            } else if (key === "id" || isForeignKey) {
              // Case 1 (ID!)
              typeOrValue = "ID!";
            } else {
              // Case 1 (String!)
              typeOrValue = this.determineAttributeType(model, key, value, field || undefined);
              typeOrValue = typeOrValue + "!";
            }
          } else {
            // Case 3 or 4
            typeOrValue = `$${key}`;
          }

          returnValue = `${returnValue}${first ? "" : ", "}${(signature ? "$" : "") +
            key}: ${typeOrValue}`;

          first = false;
        }
      });

      if (!first) {
        if (!signature && filter) returnValue = `filter: { ${returnValue} }`;
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
   * @param {GraphQLField} query Pass when we have to detect the type of an argument
   * @returns {string}
   */
  public static determineAttributeType(
    model: Model,
    key: string,
    value: any,
    query?: GraphQLField
  ): string {
    const context: Context = Context.getInstance();
    const field: undefined | Field = model.fields.get(key);
    let schemaField: undefined | GraphQLField;

    if (query) {
      schemaField = query.args.find(f => f.name === key);

      if (!schemaField) {
        const filterField = query.args.find(f => f.name === "filter");

        if (filterField) {
          schemaField = this.findSchemaFieldForArgument(key, null, model, true);
        }
      }
    } else {
      schemaField = context.schema!.getType(model.singularName)!.fields!.find(f => f.name === key);
    }

    if (schemaField && Schema.getTypeNameOfField(schemaField)) {
      return Schema.getTypeNameOfField(schemaField);
    } else {
      if (field instanceof context.components.String) {
        return "String";
      } else if (field && field instanceof context.components.Number) {
        return "Int";
      } else if (field && field instanceof context.components.Boolean) {
        return "Boolean";
      } else {
        if (typeof value === "number") return "Int";
        if (typeof value === "string") return "String";
        if (typeof value === "boolean") return "Boolean";

        throw new Error(
          `Can't find suitable graphql type for field '${model.singularName}.${key}'.`
        );
      }
    }
  }

  private static findSchemaFieldForArgument(
    name: String,
    field: GraphQLField | null,
    model: Model,
    isFilter: boolean
  ): GraphQLField | undefined {
    const schema = Context.getInstance().schema!;
    let schemaField: GraphQLField | undefined;

    if (field) {
      schemaField = field.args.find(f => f.name === name);
      if (schemaField) return schemaField;
    }

    // We try to find the FilterType or at least the Type this query belongs to.
    const type = schema.getType(model.singularName + (isFilter ? "Filter" : ""), true);

    // Next we try to find the field from the type
    schemaField = type
      ? (isFilter ? type.inputFields! : type.fields!).find(f => f.name === name)
      : undefined;

    // Warn before we return null
    if (!schemaField) {
      Context.getInstance().logger.warn(
        `Couldn't find the argument with name ${name} for the mutation/query ${
          field ? field.name : "(?)"
        }`
      );
    }

    return schemaField;
  }

  /**
   * Generates the fields for all related models.
   *
   * @param {Model} model
   * @param {Array<Model>} path
   * @returns {string}
   */
  static buildRelationsQuery(model: null | Model, path: Array<string> = []): string {
    if (model === null) return "";

    const context = Context.getInstance();
    const relationQueries: Array<string> = [];

    model.getRelations().forEach((field: Field, name: string) => {
      let relatedModel: Model;
      let fieldAsRelation: Relation = field as Relation;

      if (
        fieldAsRelation instanceof context.components.BelongsToMany ||
        fieldAsRelation instanceof context.components.HasMany ||
        fieldAsRelation instanceof context.components.HasManyThrough ||
        fieldAsRelation instanceof context.components.MorphedByMany ||
        fieldAsRelation instanceof context.components.MorphMany ||
        fieldAsRelation instanceof context.components.MorphOne ||
        fieldAsRelation instanceof context.components.MorphToMany ||
        fieldAsRelation instanceof context.components.HasOne
      ) {
        relatedModel = context.getModel(fieldAsRelation.related.entity);
      } else if (
        fieldAsRelation instanceof context.components.BelongsTo ||
        fieldAsRelation instanceof context.components.HasManyBy
      ) {
        relatedModel = context.getModel(fieldAsRelation.parent.entity);
      } else if (fieldAsRelation instanceof context.components.MorphTo) {
        relatedModel = context.getModel(fieldAsRelation.type);
      } else {
        relatedModel = context.getModel(name);

        context.logger.log(
          "WARNING: unknown field type. Fallback to attribute name",
          fieldAsRelation
        );
      }

      // We will ignore the field, when it's already in the path. Means: When it's already queried. However there are
      // cases where the model will have a relationship to itself. For example a nested category strucure where the
      // category model has a parent: belongsTo(Category). So we also check if the model references itself. If this is
      // the case, we allow the nesting up to 5 times.
      const referencesItSelf = takeWhile(
        path.slice(0).reverse(),
        (p: string) => p === relatedModel.singularName
      ).length;
      const ignore = referencesItSelf
        ? referencesItSelf > 5
        : path.includes(relatedModel.singularName);

      // console.log(`-----> Will ${ignore ? '' : 'not'} ignore ${model.singularName}.${name}, path: ${path.join('.')}`);

      if (model.shouldEagerLoadRelation(name, field, relatedModel) && !ignore) {
        const newPath = path.slice(0);
        newPath.push(relatedModel.singularName);

        relationQueries.push(
          this.buildField(relatedModel, Model.isConnection(field), undefined, newPath, name, false)
        );
      }
    });

    return relationQueries.join("\n");
  }
}
