import Model from "../orm/model";
import { Arguments, GraphQLField } from "../support/interfaces";
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
    static buildField(model: Model | string, multiple?: boolean, args?: Arguments, path?: Array<string>, name?: string, filter?: boolean, allowIdFields?: boolean): string;
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
    static buildQuery(type: string, model: Model | string, name?: string, args?: Arguments, multiple?: boolean, filter?: boolean): any;
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
    static buildArguments(model: Model, args?: Arguments, signature?: boolean, filter?: boolean, allowIdFields?: boolean, field?: GraphQLField | null): string;
    /**
     * Determines the GraphQL primitive type of a field in the variables hash by the field type or (when
     * the field type is generic attribute) by the variable type.
     * @param {Model} model
     * @param {string} key
     * @param {string} value
     * @param {GraphQLField} query Pass when we have to detect the type of an argument
     * @returns {string}
     */
    static determineAttributeType(model: Model, key: string, value: any, query?: GraphQLField): string;
    private static findSchemaFieldForArgument;
    /**
     * Generates the fields for all related models.
     *
     * @param {Model} model
     * @param {Array<Model>} path
     * @returns {string}
     */
    static buildRelationsQuery(model: null | Model, path?: Array<string>): string;
}
