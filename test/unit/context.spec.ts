import { setupMockData } from "../support/mock-data";
import Context from "../../src/common/context";
import MockApolloClient from "../support/mock-apollo-client";

let store;
let vuexOrmGraphQL;
let context: Context;

describe("Context", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
  });

  describe(".debugMode", () => {
    test("to be false", () => {
      expect(context.debugMode).toEqual(false);
    });
  });

  describe(".apolloClient", () => {
    test("returns an apollo client", () => {
      context.options.apolloClient = new MockApolloClient();
      expect(context.options.apolloClient instanceof MockApolloClient).toBe(true);
    });
  });

  describe(".getModel", () => {
    test("returns a model", () => {
      expect(context.getModel("post")).toEqual(context.models.get("post"));
    });
  });
});
