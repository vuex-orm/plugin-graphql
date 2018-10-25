import { setupMockData, User, Post } from "../support/mock-data";
import { mock } from "../../src/test-utils";
import { recordGraphQLRequest } from "../support/helpers";

// @ts-ignore
let store;
let vuexOrmGraphQL;

const userData = {
  id: 42,
  name: "Charlie Brown"
};

const userResult = {
  users: [
    {
      id: 42,
      $id: 42,
      $isPersisted: true,
      name: "Charlie Brown",
      profileId: 0,
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

  test("allows to mock a fetch", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to return multiple records", async () => {
    const userData2 = JSON.parse(JSON.stringify(userData));
    userData2.id = 8;
    userData2.name = "Snoopy";

    mock("fetch")
      .for(User)
      .andReturn([userData, userData2]);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual({
      users: [
        {
          id: 8,
          $id: 8,
          $isPersisted: true,
          name: "Snoopy",
          profileId: 0,
          posts: [],
          comments: [],
          profile: null
        },
        {
          id: 42,
          $id: 42,
          $isPersisted: true,
          name: "Charlie Brown",
          profileId: 0,
          posts: [],
          comments: [],
          profile: null
        }
      ]
    });
  });

  test("only mocks matched options", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch(1);
    }, true);

    expect(request).not.toEqual(null);
    expect(result).not.toEqual(userResult);
  });

  test("allows to mock a action with a dynamic value", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to mock a action without options", async () => {
    mock("fetch")
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to mock a action without partial matching options", async () => {
    mock("fetch", { filter: { id: 42 } })
      .for(User)
      .andReturn(() => userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.fetch(42);
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to mock a destroy", async () => {
    mock("destroy", { id: 42 })
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user = User.query().last();

    const request = await recordGraphQLRequest(async () => {
      result = await user!.$destroy();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(true);
  });

  test("allows to mock a mutate", async () => {
    mock("mutate", { name: "upvote", args: { id: 4 } })
      .for(Post)
      .andReturn({
        id: 4,
        content: "Test content",
        title: "Test title",
        published: true
      });

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await Post.mutate({ name: "upvote", args: { id: 4 } });
    }, true);

    expect(request).toEqual(null);

    expect(result).toEqual({
      posts: [
        {
          id: 4,
          $id: 4,
          $isPersisted: true,
          content: "Test content",
          title: "Test title",
          authorId: 0,
          otherId: 0,
          published: true,
          author: null,
          comments: []
        }
      ]
    });
  });

  test("allows to mock a persist", async () => {
    mock("persist", { id: 42 })
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user = User.query().last();

    const request = await recordGraphQLRequest(async () => {
      result = await user!.$persist();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to mock a push", async () => {
    mock("push")
      .for(User)
      .andReturn(userData);

    let result;
    await User.create({ data: userData });
    const user = User.query().last();

    const request = await recordGraphQLRequest(async () => {
      result = await user!.$push();
    }, true);

    expect(request).toEqual(null);
    expect(result).toEqual(userResult);
  });

  test("allows to mock a custom query", async () => {
    mock("query", { name: "example" })
      .for(User)
      .andReturn(userData);

    let result;
    const request = await recordGraphQLRequest(async () => {
      result = await User.customQuery({ name: "example", filter: { test: 42 } });
    }, true);

    expect(request).toEqual(null);
    expect(result).not.toEqual(null);
  });

  test("allows to mock a simple mutation", async () => {
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

  test("allows to mock a simple query", async () => {
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
});
