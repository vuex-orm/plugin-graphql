import { ApolloClient, FetchPolicy } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Context from '../common/context';
import { Arguments, Data } from '../support/interfaces';
import Transformer from './transformer';
import Model from '../orm/model';

/**
 * This class takes care of the communication with the graphql endpoint by leveraging the awesome apollo-client lib.
 */
export default class Apollo {
  /**
   * The http link instance to use.
   * @type {HttpLink}
   */
  private readonly httpLink: HttpLink;

  /**
   * The ApolloClient instance
   * @type {ApolloClient}
   */
  private readonly apolloClient: ApolloClient<any>;

  /**
   * @constructor
   */
  public constructor () {
    const context = Context.getInstance();

    this.httpLink = new HttpLink({
      uri: context.options.url ? context.options.url : '/graphql',
      credentials: context.options.credentials ? context.options.credentials : 'same-origin',
      headers: context.options.headers ? context.options.headers : {},
      useGETForQueries: Boolean(context.options.useGETForQueries)
    });

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
  public async request (model: Model, query: any, variables?: Arguments, mutation: boolean = false,
                        bypassCache: boolean = false): Promise<Data> {

    const fetchPolicy: FetchPolicy = bypassCache ? 'network-only' : 'cache-first';
    Context.getInstance().logger.logQuery(query, variables, fetchPolicy);

    let response;
    if (mutation) {
      response = await this.apolloClient.mutate({ mutation: query, variables });
    } else {
      response = await this.apolloClient.query({ query, variables, fetchPolicy });
    }

    // Transform incoming data into something useful
    return Transformer.transformIncomingData(response.data as Data, model, mutation);
  }
}
