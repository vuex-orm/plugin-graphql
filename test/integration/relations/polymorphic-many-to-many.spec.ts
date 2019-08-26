import { Post, setupMockData, Tag } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("Polymorphic Many To Many", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // @ts-ignore
    await Tag.fetch();

    // @ts-ignore
    await Post.fetch(1);

    const tag: Data = Tag.query()
      .withAllRecursive()
      .find(1)! as Data;

    const post: Data = Post.query()
      .withAllRecursive()
      .find(1)! as Data;

    expect(post!.tags).toContain(tag);
  });
});
