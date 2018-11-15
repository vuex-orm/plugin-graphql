import { setupMockData } from "../support/mock-data";
import Context from "../../src/common/context";

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

  describe(".getModel", () => {
    test("returns a model", () => {
      expect(context.getModel("post")).toEqual(context.models.get("post"));
    });
  });
});
