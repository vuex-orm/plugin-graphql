import { setupMockData } from "../../support/mock-data";

let store: any;
let vuexOrmGraphQL;

describe("Has Many Through", async () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // TODO
  });
});
