import { setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("One To One Relation", async () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // @ts-ignore
    await User.fetch(1, true);

    const user: Data = User.query()
      .withAllRecursive()
      .find(1)! as Data;

    expect(user.name).toEqual("Charlie Brown");
    expect(user.profile).not.toEqual(null);
    expect(user.profile.sex).toEqual(true);
    expect(user.profile.email).toEqual("charlie@peanuts.com");
  });
});
