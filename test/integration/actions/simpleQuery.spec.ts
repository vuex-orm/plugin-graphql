import { setupMockData } from "../../support/mock-data";
import { recordGraphQLRequest } from "../../support/helpers";
import gql from "graphql-tag";

let store: any;
let vuexOrmGraphQL;

describe("simple query", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("sends my query to the api", async () => {
    let result;

    const query = `
query Status {
  status {
    backend
    smsGateway
    paypalIntegration
  }
}`;

    const request = await recordGraphQLRequest(async () => {
      result = await store.dispatch("entities/simpleQuery", { query, variables: {} });
    });

    expect(result).toEqual({
      status: {
        __typename: "Status",
        backend: true,
        paypalIntegration: true,
        smsGateway: false
      }
    });

    expect(request!.query).toEqual(
      `
query Status {
  status {
    backend
    smsGateway
    paypalIntegration
  }
}
      `.trim() + "\n"
    );
  });
  test("also accepts GraphQL AST DocumentNode", async () => {
    let result;

    const query = gql`
      query Status {
        status {
          backend
          smsGateway
          paypalIntegration
        }
      }
    `;

    const request = await recordGraphQLRequest(async () => {
      result = await store.dispatch("entities/simpleQuery", { query, variables: {} });
    });

    expect(result).toEqual({
      status: {
        __typename: "Status",
        backend: true,
        paypalIntegration: true,
        smsGateway: false
      }
    });

    expect(request!.query).toEqual(
      `
query Status {
  status {
    backend
    smsGateway
    paypalIntegration
  }
}
      `.trim() + "\n"
    );
  });
});
