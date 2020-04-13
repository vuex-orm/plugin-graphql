import { Post, setupMockData, Tag } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("Polymorphic Many To Many", async () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // @ts-ignore
    await Tag.fetch();

    // @ts-ignore
    await Post.fetch(1);

    let tag: Tag = Tag.query()
      .withAllRecursive()
      .find("1")! as Tag;

    const post: Data = Post.query()
      .withAllRecursive()
      .find(1)! as Data;

    expect(post!.tags[0]).toEqual(expect.objectContaining(tag));
  });
});
