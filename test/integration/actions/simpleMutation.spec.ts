import { setupMockData } from "../../support/mock-data";
import { recordGraphQLRequest } from "../../support/helpers";
import gql from "graphql-tag";

let store: any;
let vuexOrmGraphQL;

describe("simple mutation", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("sends my query to the api", async () => {
    let result;

    const query = `
mutation SendSms($to: String!, $text: String!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}`;

    const request = await recordGraphQLRequest(async () => {
      result = await store.dispatch("entities/simpleMutation", {
        query,
        variables: { to: "+4912345678", text: "GraphQL is awesome!" }
      });
    });

    expect(request!.variables).toEqual({ to: "+4912345678", text: "GraphQL is awesome!" });
    expect(result).toEqual({
      sendSms: {
        __typename: "SmsStatus", // TODO: this could removed by Vuex-ORM-GraphQL IMHO
        delivered: true
      }
    });
    expect(request!.query).toEqual(
      `
mutation SendSms($to: String!, $text: String!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}
      `.trim() + "\n"
    );
  });

  test("also accepts GraphQL AST DocumentNode", async () => {
    let result;

    const query = gql`
      mutation SendSms($to: String!, $text: String!) {
        sendSms(to: $to, text: $text) {
          delivered
        }
      }
    `;

    const request = await recordGraphQLRequest(async () => {
      result = await store.dispatch("entities/simpleMutation", {
        query,
        variables: { to: "+4912345678", text: "GraphQL is awesome!" }
      });
    });

    expect(request!.variables).toEqual({ to: "+4912345678", text: "GraphQL is awesome!" });
    expect(result).toEqual({
      sendSms: {
        __typename: "SmsStatus", // TODO: this could removed by Vuex-ORM-GraphQL IMHO
        delivered: true
      }
    });
    expect(request!.query).toEqual(
      `
mutation SendSms($to: String!, $text: String!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}
      `.trim() + "\n"
    );
  });
});
