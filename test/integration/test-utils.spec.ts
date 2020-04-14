import { setupMockData, User, Post } from "../support/mock-data";
import { clearORMStore, mock } from "../../src";
import { recordGraphQLRequest } from "../support/helpers";
import { Data } from "../../src/support/interfaces";

// @ts-ignore
let store;
let vuexOrmGraphQL;

const userData = {
  id: "42",
  name: "Charlie Brown"
};

const userResult = {
  users: [
    {
      id: "42",
      $id: "42",
      $isPersisted: true,
      name: "Charlie Brown",
      profileId: expect.stringMatching(/(\$uid\d+)/),
      posts: [],
      comments: [],
      profile: null
    }
  ]
};

describe("TestUtils", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  it("allows to mock a fetch", async () => {
    mock("fetch", { filter: { id: "42" } })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch("42");
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  it("allows to return multiple records", async () => {
    const userData2 = JSON.parse(JSON.stringify(userData));
    userData2.id = "8";
    userData2.name = "Snoopy";

    mock("fetch")
      .for(User)
      .andReturn([userData, userData2]);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual({
      users: [
        {
          id: "8",
          $id: "8",
          $isPersisted: true,
          name: "Snoopy",
          profileId: "$uid2",
          posts: [],
          comments: [],
          profile: null
        },
        {
          id: "42",
          $id: "42",
          $isPersisted: true,
          name: "Charlie Brown",
          profileId: "$uid3",
          posts: [],
          comments: [],
          profile: null
        }
      ]
    });
  });

  it("only mocks matched options", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch(1);
    }, true);

    expect(request).not.toEqual(null);
    expect(result).not.toEqual(userResult);
  });

  it("only mocks once", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(userData);

    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch(1);
    }, true);

    expect(request).not.toEqual(null);
    expect(result).not.toEqual(userResult);
  });

  it("allows to mock a action with a dynamic value", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  it("allows to mock a action without options", async () => {
    mock("fetch")
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  it("allows to mock a action without partial matching options", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);

    expect(result).toEqual(userResult);
  });

  it("allows to mock a destroy", async () => {
    mock("destroy", { id: "42" })
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user: Data = User.query().last()! as Data;

    const request = await recordGraphQLRequest(async () => {
      result = await user.$destroy();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(true);
  });

  it("allows to mock a mutate", async () => {
    mock("mutate", { name: "upvote", args: { id: "4" } })
      .for(Post)
      .andReturn({
        id: 4,
        content: "Test content",
        title: "Test title",
        published: true,
        tags: []
      });

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await Post.mutate({ name: "upvote", args: { id: "4" } });
    }, true);

    expect(request).toEqual(null);

    expect(result).toMatchObject({
      posts: [
        {
          id: 4,
          $id: "4",
          content: "Test content",
          title: "Test title",
          authorId: expect.stringMatching(/(\$uid\d+)/),
          otherId: 0,
          published: true,
          author: null,
          comments: [],
          tags: []
        }
      ]
    });
  });

  it("allows to mock a persist", async () => {
    mock("persist", { id: "42" })
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user: Data = User.query().last()! as Data;

    const request = await recordGraphQLRequest(async () => {
      result = await user.$persist();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  it("allows to mock a push", async () => {
    mock("push")
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user: Data = User.query().last()! as Data;

    const request = await recordGraphQLRequest(async () => {
      result = await user.$push();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  it("allows to mock a custom query", async () => {
    mock("query", { name: "example" })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await User.customQuery({ name: "example", filter: { test: 42 } });
    }, true);

    expect(request).toEqual(null);
    expect(result).not.toEqual(null);
  });

  it("allows to mock a simple mutation", async () => {
    mock("simpleMutation", {
      name: "SendSms",
      variables: { to: "+4912345678", text: "GraphQL is awesome!" }
    }).andReturn({ sendSms: { delivered: true } });

    let result;
    const query = `
      mutation SendSms($to: string!, $text: string!) {
        sendSms(to: $to, text: $text) {
          delivered
        }
      }
    `;

    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await store.dispatch("entities/simpleMutation", {
        query,
        variables: { to: "+4912345678", text: "GraphQL is awesome!" }
      });
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual({ sendSms: { delivered: true } });
  });

  it("allows to mock a simple query", async () => {
    mock("simpleQuery", { name: "example" }).andReturn({ success: true });

    let result;
    const query = `
      query example {
        success
      }
    `;

    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      result = await store.dispatch("entities/simpleQuery", { query });
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual({ success: true });
  });

  describe("clearORMStore", () => {
    it("cleans the store", async () => {
      await Post.create({ data: { name: "test" } });
      const post: Data = Post.query().last()! as Data;
      expect(Post.find(post.id)).not.toEqual(null);
      await clearORMStore();
      expect(Post.find(post.id)).toEqual(null);
    });
  });
});
