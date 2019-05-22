import { Post, setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";
import { recordGraphQLRequest } from "../../support/helpers";

let store: any;
let vuexOrmGraphQL;

describe("persist", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  // Skipped due to https://github.com/vuex-orm/vuex-orm/issues/367
  test.skip("sends the correct query to the API", async () => {
    // @ts-ignore
    await User.fetch(1);

    const insertedData = await Post.insert({
      data: {
        title: "It works!",
        content: "This is a test!",
        published: false,
        otherId: 15,
        author: User.find(1),
        tags: [{ name: "Foo" }, { name: "Bar" }]
      }
    });

    let post: Data = insertedData.posts[0] as Data;

    expect(post.tags.length).toEqual(2);

    const request = await recordGraphQLRequest(async () => {
      post = await post.$persist();
    });

    expect(post.id).toEqual(4); // was set from the server

    expect(request!.variables).toEqual({
      post: {
        content: "This is a test!",
        id: 1,
        otherId: 15,
        published: false,
        title: "It works!",
        authorId: 1,
        tags: [{ name: "Foo" }, { name: "Bar" }],
        author: {
          id: 1,
          name: "Charlie Brown",
          profileId: 1,
          profile: {
            id: 1,
            sex: true,
            age: 8,
            email: "charlie@peanuts.com"
          }
        }
      }
    });

    expect(request!.query).toEqual(
      `
mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
    id
    content
    title
    otherId
    published
    author {
      id
      name
      profile {
        id
        email
        age
        sex
      }
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        author {
          id
          name
          profile {
            id
            email
            age
            sex
          }
        }
      }
    }
    tags {
      nodes {
        id
        name
      }
    }
  }
}
      `.trim() + "\n"
    );
  });
});
