import { Arguments, Data } from "../support/interfaces";
import Model from "../orm/model";
/**
 * This class takes care of the communication with the graphql endpoint by leveraging the awesome apollo-client lib.
 */
export default class Apollo {
    /**
     * The http link instance to use.
     * @type {HttpLink}
     */
    private readonly httpLink;
    /**
     * The ApolloClient instance
     * @type {ApolloClient}
     */
    private readonly apolloClient;
    /**
     * @constructor
     */
    constructor();
    /**
     * Sends a request to the GraphQL API via apollo
     * @param model
     * @param {any} query The query to send (result from gql())
     * @param {Arguments} variables Optional. The variables to send with the query
     * @param {boolean} mutation Optional. If this is a mutation (true) or a query (false, default)
     * @param {boolean} bypassCache If true the query will be send to the server without using the cache. For queries only
     * @returns {Promise<Data>} The new records
     */
    request(model: Model, query: any, variables?: Arguments, mutation?: boolean, bypassCache?: boolean): Promise<Data>;
    simpleQuery(query: string, variables: Arguments, bypassCache?: boolean, context?: Data): Promise<any>;
    simpleMutation(query: string, variables: Arguments, context?: Data): Promise<any>;
    private static getHeaders;
}
