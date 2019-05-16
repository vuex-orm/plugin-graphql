import { setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("Many To Many Relation", async () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // FIXME
  });
});
