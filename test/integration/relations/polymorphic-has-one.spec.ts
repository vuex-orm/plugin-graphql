import { Post, setupMockData, Tariff, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("Polymorphic Has One", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // FIXME
  });
});
