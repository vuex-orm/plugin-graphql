import { Post, setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("One To Many Relation", async () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // @ts-ignore
    await User.fetch();

    // @ts-ignore
    await Post.fetch();

    const user: Data = User.query()
      .withAllRecursive()
      .first()! as Data;

    expect(user.name).toEqual("Charlie Brown");
    expect(user.posts.length).not.toEqual(0);
    expect(user.posts[0].title).toEqual("GraphQL");
  });
});
