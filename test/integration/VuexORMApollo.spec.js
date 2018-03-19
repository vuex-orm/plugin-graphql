import {Model as ORMModel} from "@vuex-orm/core";
import Vue from 'vue';
import {createStore, sendWithMockFetch} from "../support/Helpers";
import fetchMock from 'fetch-mock';

let store;

describe('VuexORMApollo', () => {
  class User extends ORMModel {
    static entity = 'users';

    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(null),
        posts: this.hasMany(Post, 'userId')
      };
    }
  }

  class Post extends ORMModel {
    static entity = 'posts';

    static fields () {
      return {
        id: this.attr(null),
        title: this.attr(null),
        content: this.attr(null),
        userId: this.attr(null),
        user: this.belongsTo(User, 'userId')
      };
    }
  }

  beforeEach(() => {
    store = createStore([{ model: User }, { model: Post }]);
    store.dispatch('entities/users/insert', { data: { id: 1, name: 'Johnny Imba' }});
    store.dispatch('entities/posts/insert', { data: { id: 1, title: 'Example Post 1', content: 'Foo', userId: 1 }});
    store.dispatch('entities/posts/insert', { data: { id: 2, title: 'Example Post 2', content: 'Bar', userId: 1 }});
  });

  describe('fetch', () => {
    describe('with ID', () => {
      it('sends the correct query to the API', async () => {
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

        const request = await sendWithMockFetch(response, async () => {
          await store.dispatch('entities/users/fetch', { id: 1 });
        });

        expect(request.variables).toEqual({ id: 1 });
        expect(request.query).toEqual(`
query User($id: ID!) {
  user(id: $id) {
    id
    name
    posts {
      nodes {
        id
        title
        content
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

    describe('without ID', () => {
      it('sends the correct query to the API', async () => {
        const response = {
          data: {
            users: {
              __typename: 'user',
              nodes: [
                {
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
              ]
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await store.dispatch('entities/users/fetch');
        });

        expect(request.variables).toEqual({});
        expect(request.query).toEqual(`
query Users {
  users {
    nodes {
      id
      name
      posts {
        nodes {
          id
          title
          content
          __typename
        }
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
  });


  describe('persist', () => {
    it('sends the correct query to the API', async () => {
      const response = {
        data: {
          createUser: {
            __typename: 'user',
            id: 1,
            name: 'Johnny Imba',
            posts: {
              __typename: 'post',
              nodes: []
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        await store.dispatch('entities/users/persist', { id: 1 });
      });

      expect(request.variables).toEqual({ id: 1, user: { name: 'Johnny Imba' } });
      expect(request.query).toEqual(`
mutation CreateUser($user: UserInput!) {
  createUser(user: $user) {
    id
    name
    posts {
      nodes {
        id
        title
        content
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
});
