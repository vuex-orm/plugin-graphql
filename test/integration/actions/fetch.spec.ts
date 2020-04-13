import { recordGraphQLRequest } from "../../support/helpers";
import { Category, Post, Profile, setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";
import Context from "../../../src/common/context";

let store: any;
let vuexOrmGraphQL;

describe("fetch", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("also requests the otherId field", async () => {
    const request = await recordGraphQLRequest(async () => {
      // @ts-ignore
      await Post.fetch("1");
    });

    expect(request!.query).toEqual(
      `
query Post($id: ID!) {
  post(id: $id) {
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

    const post: Data = Post.query()
      .withAll()
      .where("id", "1")
      .first()! as Data;

    expect(post.title).toEqual("GraphQL");
    expect(post.content).toEqual("GraphQL is so nice!");
    expect(post.comments.length).toEqual(1);
    expect(post.comments[0].content).toEqual("Yes!!!!");
  });

  describe("with ID", () => {
    test("doesn't cache when bypassCache = true", async () => {
      let request1 = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch(1);
      }, true);
      expect(request1).not.toEqual(null);

      let request2 = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch(1);
      }, true);
      expect(request2).toEqual(null);

      let request3 = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch(1, true);
      }, true);
      expect(request3).not.toEqual(null);
    });

    test("sends the correct query to the API", async () => {
      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch(1);
      });

      expect(request!.variables).toEqual({ id: 1 });
      expect(request!.query).toEqual(
        `
query User($id: ID!) {
  user(id: $id) {
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
        `.trim() + "\n"
      );
    });
  });

  describe("without ID but with filter with array", () => {
    test("sends the correct query to the API", async () => {
      // @ts-ignore
      await User.fetch(1);

      const insertedData = await Post.insert({
        data: {
          title: "It works!",
          content: "This is a test!",
          published: false,
          otherId: 15,
          author: User.find(1)
        }
      });

      const post = insertedData.posts[0];

      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch({ profileId: 2, posts: [post] });
      });

      expect(request!.variables).toEqual({
        profileId: 2,
        posts: [
          {
            id: "$uid3",
            authorId: "1",
            content: "This is a test!",
            otherId: 15,
            published: false,
            title: "It works!"
          }
        ]
      });
      expect(request!.query).toEqual(
        `
query Users($profileId: ID!, $posts: [PostFilter]!) {
  users(filter: {profileId: $profileId, posts: $posts}) {
    nodes {
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
          `.trim() + "\n"
      );
    });
  });

  describe("without ID but with filter with object", () => {
    test("sends the correct query to the API", async () => {
      // @ts-ignore
      await Profile.fetch("2");
      const profile: Data = Context.getInstance()
        .getModel("profile")
        .getRecordWithId("2")! as Data;

      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch({ profile });
      });

      expect(request!.variables).toEqual({
        profile: {
          id: profile.id,
          email: profile.email,
          age: profile.age,
          sex: profile.sex
        }
      });

      expect(request!.query).toEqual(
        `
query Users($profile: ProfileInput!) {
  users(filter: {profile: $profile}) {
    nodes {
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
          `.trim() + "\n"
      );
    });
  });

  describe("without ID or filter", () => {
    test("sends the correct query to the API", async () => {
      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await User.fetch();
      });

      expect(request!.variables).toEqual({});
      expect(request!.query).toEqual(
        `
query Users {
  users {
    nodes {
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
          `.trim() + "\n"
      );
    });
  });

  describe("without ID or filter and no FilterType exists", () => {
    test("sends the correct query to the API", async () => {
      const request = await recordGraphQLRequest(async () => {
        // @ts-ignore
        await Category.fetch();
      });

      expect(request!.variables).toEqual({});
      expect(request!.query).toEqual(
        `
query Categories {
  categories {
    nodes {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}
          `.trim() + "\n"
      );
    });
  });
});
