import { Post, setupMockData } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";
import { recordGraphQLRequest } from "../../support/helpers";

let store: any;
let vuexOrmGraphQL;

describe("custom query", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("via Model method sends the correct query to the API", async () => {
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      await Post.customQuery({ name: "unpublishedPosts", filter: { authorId: 3 } });
    });

    expect(request!.variables.authorId).toEqual(3);
    expect(request!.query).toEqual(
      `
query UnpublishedPosts($authorId: ID!) {
  unpublishedPosts(authorId: $authorId) {
    nodes {
      id
      content
      title
      otherId
      published
      author {
        id
        name
        role
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
            role
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
}
      `.trim() + "\n"
    );
  });

  test("via record method sends the correct query to the API", async () => {
    // @ts-ignore
    await Post.fetch(1);
    const post: Data = Post.find(1)! as Data;

    const request = await recordGraphQLRequest(async () => {
      await post.$customQuery({ name: "unpublishedPosts", filter: { authorId: 2 } });
    });

    expect(request!.variables.authorId).toEqual(2);
    expect(request!.variables.id).toEqual(1);
    expect(request!.query).toEqual(
      `
query UnpublishedPosts($authorId: ID!, $id: ID!) {
  unpublishedPosts(authorId: $authorId, id: $id) {
    nodes {
      id
      content
      title
      otherId
      published
      author {
        id
        name
        role
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
            role
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
}
      `.trim() + "\n"
    );
  });
});
