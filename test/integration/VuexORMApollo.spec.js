import { setupMockData, User, Video, Post, Comment, ContractContractOption, Contract, ContractOption } from 'test/support/mock-data'
import {sendWithMockFetch} from "../support/helpers";

let store;
let vuexOrmApollo;

describe('VuexORMApollo', () => {
  beforeEach(async () => {
    [store, vuexOrmApollo] = await setupMockData();
  });

  describe('fetch', () => {
    it('also requests the otherId field', async () => {
      const response = {
        data: {
          post: {
            __typename: 'post',
            id: 42,
            otherId: 13548,
            published: true,
            title: 'Example Post 5',
            content: 'Foo',
            comments: {
              __typename: 'comment',
              nodes: [{
                __typename: 'comment',
                id: 15,
                content: 'Works!',
                subjectId: 42,
                subjectType: 'Post'
              }]
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba',
            }
          }
        }
      };

      let request = await sendWithMockFetch(response, async () => {
        await Post.fetch(42);
      });
      expect(request).not.toEqual(null);

      expect(request.query).toEqual(`
query Post($id: ID!) {
  post(id: $id) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        __typename
      }
      __typename
    }
    __typename
  }
}
        `.trim() + "\n");

      const post = Post.query().withAll().where('id', 42).first();
      expect(post.title).toEqual('Example Post 5');
      expect(post.comments.length).toEqual(1);
      expect(post.comments[0].content).toEqual('Works!');
    });


    describe('with ID', () => {
      it("doesn't cache when bypassCache = true", async () => {
        const response = {
          data: {
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba'
            }
          }
        };

        let request = await sendWithMockFetch(response, async () => {
          await User.fetch(1);
        });
        expect(request).not.toEqual(null);

        request = await sendWithMockFetch(response, async () => {
          await User.fetch(1);
        }, true);
        expect(request).toEqual(null);

        request = await sendWithMockFetch(response, async () => {
          await User.fetch(1, true);
        });
        expect(request).not.toEqual(null);
      });

      it('sends the correct query to the API', async () => {
        const response = {
          data: {
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba'
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await User.fetch(1);
        });

        expect(request.variables).toEqual({ id: 1 });
        expect(request.query).toEqual(`
query User($id: ID!) {
  user(id: $id) {
    id
    name
    __typename
  }
}
        `.trim() + "\n");
      });
    });

    describe('without ID but with filter', () => {
      it('sends the correct query to the API', async () => {
        const response = {
          data: {
            users: {
              __typename: 'user',
              nodes: [
                {
                  __typename: 'user',
                  id: 1,
                  name: 'Charlie Brown'
                }
              ]
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await User.fetch({ active: true });
        });

        expect(request.variables).toEqual({ active: true });
        expect(request.query).toEqual(`
query Users($active: Boolean!) {
  users(filter: {active: $active}) {
    nodes {
      id
      name
      __typename
    }
    __typename
  }
}
          `.trim() + "\n");
      });
    });

    describe('without ID or filter', () => {
      it('sends the correct query to the API', async () => {
        const response = {
          data: {
            users: {
              __typename: 'user',
              nodes: [
                {
                  __typename: 'user',
                  id: 1,
                  name: 'Charlie Brown'
                }
              ]
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await User.fetch();
        });

        expect(request.variables).toEqual({});
        expect(request.query).toEqual(`
query Users {
  users {
    nodes {
      id
      name
      __typename
    }
    __typename
  }
}
          `.trim() + "\n");
      });
    });
  });


  describe('persist', () => {
    it('sends the correct query to the API', async () => {
      const response = {
        data: {
          createPost: {
            __typename: 'post',
            id: 42,
            otherId: 13548,
            published: true,
            title: 'Example post 1',
            content: 'Foo',
            comments: {
              __typename: 'comment',
              nodes: [{
                __typename: 'comment',
                id: 15,
                content: 'Works!',
                subjectId: 42,
                subjectType: 'Post'
              }]
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Charlie Brown',
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        const post = Post.find(1);
        await post.$persist();
      });

      expect(request.variables).toEqual({
        post: {
          content: "Foo",
          id: 1,
          otherId: 9,
          published: true,
          title: "Example post 1",
          userId: 1,
          user: {
            id: 1,
            name: 'Charlie Brown'
          }
        }
      });


      expect(request.query).toEqual(`
mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        __typename
      }
      __typename
    }
    __typename
  }
}
      `.trim() + "\n");
    });
  });


  describe('push', () => {
    it('sends the correct query to the API', async () => {
      const response = {
        data: {
          updateUser: {
            __typename: 'user',
            id: 1,
            name: 'Snoopy'
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        const user = User.find(1);
        user.name = 'Snoopy';

        await user.$push();
      });

      expect(request.variables).toEqual({ id: 1, user: { id: 1, name: 'Snoopy' } });
      expect(request.query).toEqual(`
mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    id
    name
    __typename
  }
}
      `.trim() + "\n");
    });
  });


  describe('destroy', () => {
    it('sends the correct query to the API', async () => {
      const response = {
        data: {
          deleteUser: {
            __typename: 'user',
            id: 1,
            name: 'Charlie Brown'
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        const user = User.find(1);
        await user.$destroy();
      });

      expect(request.variables).toEqual({ id: 1 });
      expect(request.query).toEqual(`
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    __typename
  }
}
      `.trim() + "\n");
    });
  });


  describe('custom mutation', () => {
    it('sends the correct query to the API', async () => {
      const post = Post.find(1);
      const response = {
        data: {
          upvotePost: {
            __typename: 'post',
            id: 1,
            otherId: 13548,
            published: true,
            title: 'Example Post 1',
            content: 'Foo',
            comments: {
              __typename: 'comment',
              nodes: []
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba',
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        await post.$mutate({ mutation: 'upvotePost', captchaToken: '15' });
      });

      expect(request.variables.captchaToken).toEqual('15');
      expect(request.variables.id).toEqual(post.id);
      expect(request.query).toEqual(`
mutation UpvotePost($captchaToken: String!, $id: ID!) {
  upvotePost(captchaToken: $captchaToken, id: $id) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        __typename
      }
      __typename
    }
    __typename
  }
}
      `.trim() + "\n");
    });
  });

  describe('$isPersisted', () => {
    it('is false for newly created records', async () => {
      const insertedData = await User.insert({ data: { name: 'Snoopy' }} );
      let user = insertedData.users[0];
      expect(user.$isPersisted).toBeFalsy();

      user = User.find(user.id);
      expect(user.$isPersisted).toBeFalsy();
    });

    it('is true for persisted records', async () => {
      const insertedData = await User.insert({ data: { name: 'Snoopy' }} );
      let user = insertedData.users[0];
      const response = {
        data: {
          createUser: {
            __typename: 'user',
            id: 15,
            name: 'Snoopy',
            posts: {
              __typename: 'post',
              nodes: []
            }
          }
        }
      };

      expect(user.$isPersisted).toBeFalsy();

      await sendWithMockFetch(response, async () => {
        user = await user.$persist();
      });

      expect(user.$isPersisted).toBeTruthy();
    });

    it('is true for fetched records', async () => {
      const response = {
        data: {
          user: {
            __typename: 'user',
            id: 1,
            name: 'Johnny Imba',
            posts: {
              __typename: 'post',
              nodes: [
                {
                  __typename: 'post',
                  id: 1,
                  userId: 1,
                  title: 'Example Post 1',
                  content: 'Foo'
                },
                {
                  __typename: 'post',
                  id: 2,
                  userId: 1,
                  title: 'Example Post 2',
                  content: 'Bar'
                }
              ]
            }
          }
        }
      };

      await sendWithMockFetch(response, async () => {
        await User.fetch(1);
      });

      const user = User.find(1);
      expect(user.$isPersisted).toBeTruthy();
    });
  });
});
