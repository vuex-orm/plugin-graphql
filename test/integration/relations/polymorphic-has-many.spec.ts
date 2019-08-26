import { Post, setupMockData, Tariff, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";

let store: any;
let vuexOrmGraphQL;

describe("Polymorphic Has Many", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("works", async () => {
    // @ts-ignore
    const result = await Post.fetch(1, true);

    const post: Data = Post.query()
      .withAllRecursive()
      .find(1)! as Data;
    expect(post.author).not.toEqual(null);
    expect(post.comments).not.toEqual(null);
    expect(post.comments.length).not.toEqual(0);
    expect(post.author.name).toEqual("Charlie Brown");
    expect(post.comments[0].content).toEqual("Yes!!!!");
  });
});
