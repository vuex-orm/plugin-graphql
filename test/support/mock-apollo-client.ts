import * as fetch from "cross-fetch";
import { ApolloClient, FetchPolicy } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";

export default class MockApolloClient {
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
    /* istanbul ignore next */
    this.httpLink = new HttpLink({
      ...fetch,
      uri: "/graphql",
      credentials: "same-origin",
      useGETForQueries: false
    });

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
  }
}
