import { ApolloClient, FetchPolicy } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import Context from "../common/context";
import { Arguments, Data } from "../support/interfaces";
import Transformer from "./transformer";
import Model from "../orm/model";
import gql from "graphql-tag";

/**
 * This class takes care of the communication with the graphql endpoint by leveraging the awesome apollo-client lib.
 */
export default class Apollo {
  /**
   * The http link instance to use.
   * @type {HttpLink}
   */
  private readonly httpLink: ApolloLink;

  /**
   * The ApolloClient instance
   * @type {ApolloClient}
   */
  private readonly apolloClient: ApolloClient<any>;

  /**
   * @constructor
   */
  public constructor() {
    const context = Context.getInstance();

    // This allows the test suite to pass a custom link
    if (context.options.link) {
      this.httpLink = context.options.link;
    } else {
      /* istanbul ignore next */
      this.httpLink = new HttpLink({
        uri: context.options.url ? context.options.url : "/graphql",
        credentials: context.options.credentials ? context.options.credentials : "same-origin",
        useGETForQueries: Boolean(context.options.useGETForQueries)
      });
    }

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: context.debugMode
    });
  }

  /**
   * Sends a request to the GraphQL API via apollo
   * @param model
   * @param {any} query The query to send (result from gql())
   * @param {Arguments} variables Optional. The variables to send with the query
   * @param {boolean} mutation Optional. If this is a mutation (true) or a query (false, default)
   * @param {boolean} bypassCache If true the query will be send to the server without using the cache. For queries only
   * @returns {Promise<Data>} The new records
   */
  public async request(
    model: Model,
    query: any,
    variables?: Arguments,
    mutation: boolean = false,
    bypassCache: boolean = false
  ): Promise<Data> {
    const fetchPolicy: FetchPolicy = bypassCache ? "network-only" : "cache-first";
    Context.getInstance().logger.logQuery(query, variables, fetchPolicy);

    const context = { headers: Apollo.getHeaders() };

    let response;
    if (mutation) {
      response = await this.apolloClient.mutate({ mutation: query, variables, context });
    } else {
      response = await this.apolloClient.query({ query, variables, fetchPolicy, context });
    }

    // Transform incoming data into something useful
    return Transformer.transformIncomingData(response.data as Data, model, mutation);
  }

  public async simpleQuery(
    query: string,
    variables: Arguments,
    bypassCache: boolean = false,
    context?: Data
  ): Promise<any> {
    const fetchPolicy: FetchPolicy = bypassCache ? "network-only" : "cache-first";
    return this.apolloClient.query({
      query: gql(query),
      variables,
      fetchPolicy,
      context: { headers: Apollo.getHeaders() }
    });
  }

  public async simpleMutation(query: string, variables: Arguments, context?: Data): Promise<any> {
    return this.apolloClient.mutate({
      mutation: gql(query),
      variables,
      context: { headers: Apollo.getHeaders() }
    });
  }

  private static getHeaders() {
    const context = Context.getInstance();

    let headers: any = context.options.headers ? context.options.headers : {};

    if (typeof headers === "function") {
      headers = headers(context);
    }

    return headers;
  }
}
