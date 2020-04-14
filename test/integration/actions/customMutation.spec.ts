import { Post, setupMockData } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";
import { recordGraphQLRequest } from "../../support/helpers";

let store: any;
let vuexOrmGraphQL;

describe("custom mutation", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  describe("via Model.mutate", () => {
    test("sends the correct query to the API", async () => {
      // @ts-ignore
      await Post.fetch(1);
      const post: Data = Post.find(1)! as Data;

      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await Post.mutate({ name: "upvotePost", args: { captchaToken: "15", id: post.id } });
      });

      expect(request!.variables.captchaToken).toEqual("15");
      expect(request!.variables.id).toEqual(post.id);
      expect(request!.query).toEqual(
        `
mutation UpvotePost($captchaToken: String!, $id: ID!) {
  upvotePost(captchaToken: $captchaToken, id: $id) {
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

  describe("via post.$mutate", () => {
    test("sends the correct query to the API", async () => {
      // @ts-ignore
      await Post.fetch(1);
      const post: Data = Post.find(1)! as Data;

      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await post.$mutate({ name: "upvotePost", args: { captchaToken: "15", id: post.id } });
      });

      expect(request!.variables.captchaToken).toEqual("15");
      expect(request!.variables.id).toEqual(post.id);
      expect(request!.query).toEqual(
        `
mutation UpvotePost($captchaToken: String!, $id: ID!) {
  upvotePost(captchaToken: $captchaToken, id: $id) {
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
});
