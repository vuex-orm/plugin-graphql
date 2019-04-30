import { setupMockData, Post } from "../support/mock-data";
import Context from "../../src/common/context";
import Action from "../../src/actions/action";

let store;
let vuexOrmGraphQL;
let context: Context;

beforeEach(async () => {
  [store, vuexOrmGraphQL] = await setupMockData();
  context = Context.getInstance();
});

describe("Action", () => {
  describe(".getModelFromState", () => {
    test("returns the model", () => {
      expect(Action.getModelFromState({ $name: "post" })).toEqual(context.getModel("post"));
    });
  });

  describe(".prepareArgs", () => {
    test("returns a args object without the id", () => {
      expect(Action.prepareArgs(undefined, 15)).toEqual({ id: 15 });
      expect(Action.prepareArgs({}, 42)).toEqual({ id: 42 });
    });

    test("returns a args object with the id", () => {
      expect(Action.prepareArgs(undefined)).toEqual({});
      expect(Action.prepareArgs({ test: 15 })).toEqual({ test: 15 });
    });
  });

  describe(".addRecordToArgs", () => {
    test("returns a args object with the record", async () => {
      const model = context.getModel("post");
      // @ts-ignore
      await Post.fetch(1);

      const record = model.getRecordWithId(1)!;

      expect(Action.addRecordToArgs({ test: 2 }, model, record)).toEqual({
        post: {
          id: 1,
          content: "GraphQL is so nice!",
          otherId: 123,
          published: true,
          title: "GraphQL",
          author: {
            id: 1,
            name: "Charlie Brown",
            profile: {
              age: 8,
              email: "charlie@peanuts.com",
              id: 1,
              sex: true
            },
            profileId: 1
          },
          tags: [{ id: 1, name: "GraphQL" }, { id: 2, name: "Ruby" }],
          authorId: 1
        },

        test: 2
      });
    });
  });
});
