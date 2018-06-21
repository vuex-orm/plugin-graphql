import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data'
import {sendWithMockFetch} from "../support/helpers";
import Context from "app/common/context";

let store;
let vuexOrmGraphQL;

describe('VuexORMGraphQL', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  it('fetches the schema on the first action', async () => {
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
              subjectType: 'Post',
              user: {
                __typename: 'user',
                id: 2,
                name: 'Charly Brown',
                profile: {
                  __typename: 'profile',
                  id: 2,
                  sex: true,
                  age: 8,
                  email: 'charly@peanuts.com'
                }
              }
            }]
          },
          user: {
            __typename: 'user',
            id: 1,
            name: 'Johnny Imba',
            profile: {
              __typename: 'profile',
              id: 1,
              sex: true,
              age: 36,
              email: 'johnny@rocks.com'
            }
          }
        }
      }
    };

    let request = await sendWithMockFetch(response, async () => {
      await Post.fetch(42);
    });

    const context = Context.getInstance();
    expect(!!context.schema).not.toEqual(false);
    expect(context.schema.getType('Post').name).toEqual('Post');
    expect(context.schema.getQuery('post').name).toEqual('post');
    expect(context.schema.getMutation('createPost').name).toEqual('createPost');
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
                subjectType: 'Post',
                user: {
                  __typename: 'user',
                  id: 2,
                  name: 'Charly Brown',
                  profile: {
                    __typename: 'profile',
                    id: 1,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
                }
              }]
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
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
      profile {
        id
        email
        age
        sex
        __typename
      }
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        user {
          id
          name
          profile {
            id
            email
            age
            sex
            __typename
          }
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
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 1,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
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
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
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
    profile {
      id
      email
      age
      sex
      __typename
    }
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
                  name: 'Charlie Brown',
                  profile: {
                    __typename: 'profile',
                    id: 2,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
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
      profile {
        id
        email
        age
        sex
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
                  name: 'Charlie Brown',
                  profile: {
                    __typename: 'profile',
                    id: 2,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
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
      profile {
        id
        email
        age
        sex
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
                subjectType: 'Post',
                user: {
                  __typename: 'user',
                  id: 2,
                  name: 'Charly Brown',
                  profile: {
                    __typename: 'profile',
                    id: 2,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
                }
              }]
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Charlie Brown',
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 8,
                email: 'charly@peanuts.com'
              }
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
            name: 'Charlie Brown',
            profileId: 1,
            profile: {
              id: 1,
              sex: true,
              age: 8,
              email: 'charly@peanuts.com'
            }
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
      profile {
        id
        email
        age
        sex
        __typename
      }
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        user {
          id
          name
          profile {
            id
            email
            age
            sex
            __typename
          }
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


  describe('push', () => {
    it('sends the correct query to the API', async () => {
      const response = {
        data: {
          updateUser: {
            __typename: 'user',
            id: 1,
            name: 'Snoopy',
            profile: {
              __typename: 'profile',
              id: 2,
              sex: true,
              age: 11,
              email: 'snoopy@peanuts.com'
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        const user = User.find(1);
        user.name = 'Snoopy';

        await user.$push();
      });

      expect(request.variables).toEqual({ id: 1, user: { id: 1, name: 'Snoopy', profileId: 1 } });
      expect(request.query).toEqual(`
mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    id
    name
    profile {
      id
      email
      age
      sex
      __typename
    }
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
          deletePost: {
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
                subjectType: 'Post',
                user: {
                  __typename: 'user',
                  id: 2,
                  name: 'Charly Brown',
                  profile: {
                    __typename: 'profile',
                    id: 2,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
                }
              }]
            },
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 1,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        const post = Post.find(1);
        await post.$destroy();
      });

      expect(request.variables).toEqual({ id: 1 });
      expect(request.query).toEqual(`
mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
      profile {
        id
        email
        age
        sex
        __typename
      }
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        user {
          id
          name
          profile {
            id
            email
            age
            sex
            __typename
          }
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


  describe('custom query', () => {
    it('via Model method sends the correct query to the API', async () => {
      const response = {
        data: {
          unpublishedPosts: {
            nodes: [
              {
                __typename: 'post',
                id: 1,
                otherId: 13548,
                published: false,
                title: 'Example Post 1',
                content: 'Foo',
                comments: {
                  __typename: 'comment',
                  nodes: []
                },
                user: {
                  __typename: 'user',
                  id: 2,
                  name: 'Johnny Imba',
                  profile: {
                    __typename: 'profile',
                    id: 2,
                    sex: true,
                    age: 8,
                    email: 'charly@peanuts.com'
                  }
                }
              }
            ],
            __typename: 'post'
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        await Post.customQuery({ name: 'unpublishedPosts', filter: { userId: 2 }});
      });

      expect(request.variables.userId).toEqual(2);
      expect(request.query).toEqual(`
query UnpublishedPosts($userId: ID!) {
  unpublishedPosts(userId: $userId) {
    nodes {
      id
      content
      title
      otherId
      published
      user {
        id
        name
        profile {
          id
          email
          age
          sex
          __typename
        }
        __typename
      }
      comments {
        nodes {
          id
          content
          subjectId
          subjectType
          user {
            id
            name
            profile {
              id
              email
              age
              sex
              __typename
            }
            __typename
          }
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

    it('via record method sends the correct query to the API', async () => {
      const post = Post.find(1);
      const response = {
        data: {
          example: {
            __typename: 'post',
            id: 1,
            otherId: 13548,
            published: false,
            title: 'Example Post 1',
            content: 'Foo',
            comments: {
              __typename: 'comment',
              nodes: []
            },
            user: {
              __typename: 'user',
              id: 2,
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        await post.$customQuery({ name: 'example', filter: { userId: 2 } });
      });

      expect(request.variables.userId).toEqual(2);
      expect(request.variables.id).toEqual(1);
      expect(request.query).toEqual(`
query Example($userId: ID!, $id: ID!) {
  example(userId: $userId, id: $id) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
      profile {
        id
        email
        age
        sex
        __typename
      }
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        user {
          id
          name
          profile {
            id
            email
            age
            sex
            __typename
          }
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
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
            }
          }
        }
      };

      const request = await sendWithMockFetch(response, async () => {
        await post.$mutate({ name: 'upvotePost', args: { captchaToken: '15' } });
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
      profile {
        id
        email
        age
        sex
        __typename
      }
      __typename
    }
    comments {
      nodes {
        id
        content
        subjectId
        subjectType
        user {
          id
          name
          profile {
            id
            email
            age
            sex
            __typename
          }
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


  describe('simple mutation', () => {
    it('sends my query to the api', async () => {
      let result;

      const response = {
        data: {
          sendSms: {
            __typename: 'smsStatus',
            delivered: true
          }
        }
      };

      const query = `
mutation SendSms($to: string!, $text: string!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}`;

      const request = await sendWithMockFetch(response, async () => {
        result = await store.dispatch('entities/simpleMutation', {
          query,
          variables: { to: '+4912345678', text: 'GraphQL is awesome!' }
        });
      });

      expect(request.variables).toEqual({ to: '+4912345678', text: 'GraphQL is awesome!' });
      expect(result).toEqual({
        sendSms: {
          __typename: 'smsStatus',
          delivered: true,
        }
      });
      expect(request.query).toEqual(`
mutation SendSms($to: string!, $text: string!) {
  sendSms(to: $to, text: $text) {
    delivered
    __typename
  }
}
      `.trim() + "\n");
    });
  });


  describe('simple query', () => {
    it('sends my query to the api', async () => {
      let result;

      const response = {
        data: {
          __typename: 'status',
          backend: true,
          smsGateway: false,
          paypalIntegration: true
        }
      };

      const query = `
query status {
  backend
  smsGateway
  paypalIntegration
}`;

      const request = await sendWithMockFetch(response, async () => {
        result = await store.dispatch('entities/simpleQuery', { query, variables: {} });
      });

      const idSymbol = Object.getOwnPropertySymbols(result)[0];

      expect(result).toEqual({
        backend: true,
        smsGateway: false,
        paypalIntegration: true,
        [idSymbol]: "ROOT_QUERY"
      });
      expect(request.query).toEqual(`
query status {
  backend
  smsGateway
  paypalIntegration
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
            profile: {
              __typename: 'profile',
              id: 2,
              sex: true,
              age: 11,
              email: 'snoopy@peanuts.com'
            },
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
            profile: {
              __typename: 'profile',
              id: 2,
              sex: true,
              age: 36,
              email: 'johnny@rocks.com'
            },
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


  describe('Relations', () => {
    describe('One To One', async () => {
      it('works', async () => {
        const response = {
          data: {
            user: {
              __typename: 'user',
              id: 1,
              name: 'Johnny Imba',
              profile: {
                __typename: 'profile',
                id: 2,
                sex: true,
                age: 36,
                email: 'johnny@rocks.com'
              }
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await User.fetch(1);
        });

        const user = User.query().withAllRecursive().find(1);
        expect(user.name).toEqual('Johnny Imba');
        expect(user.profile).not.toEqual(null);
        expect(user.profile.sex).toEqual(true);
        expect(user.profile.email).toEqual('johnny@rocks.com');
      });
    });

    describe('One To Many', async () => {
      it('works', async () => {
        // TODO
      });
    });

    describe('Has Many Through', async () => {
      it('works', async () => {
        const response = {
          data: {
            tariffs: {
              __typename: 'tariff',
              nodes: [{
                __typename: 'tariff',
                id: 1,
                tariffType: 'dsl',
                name: 'Tariff S',
                displayName: 'Tariff S',
                slug: 'tariff-s',
                checked: false,
                tariffOptions: {
                  __typename: 'tariffOption',
                  nodes: [
                    {
                      __typename: 'tariffOption',
                      id: 1,
                      name: 'Foo Bar 1',
                      description: 'Very foo, much more bar'
                    }
                  ]
                }
              }]
            }
          }
        };

        const request = await sendWithMockFetch(response, async () => {
          await Tariff.fetch();
        });

        const tariff = Tariff.query().withAllRecursive().find(1);
        expect(tariff.name).toEqual('Tariff S');
        expect(tariff.tariffOptions).not.toEqual(null);
        expect(tariff.tariffOptions.length).not.toEqual(0);
        expect(tariff.tariffOptions[0].name).toEqual('Foo Bar 1');
        expect(tariff.tariffOptions[0].tariffs).not.toEqual(null);
        expect(tariff.tariffOptions[0].tariffs[0].name).toEqual('Tariff S');
      });
    });

    describe('Polymorphic One To One', async () => {
      it('works', async () => {
        // TODO
      });
    });

    describe('Polymorphic One To Many', async () => {
      it('works', async () => {
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
                  subjectType: 'Post',
                  user: {
                    __typename: 'user',
                    id: 2,
                    name: 'Charly Brown',
                    profile: {
                      __typename: 'profile',
                      id: 2,
                      sex: true,
                      age: 8,
                      email: 'charly@peanuts.com'
                    }
                  }
                }]
              },
              user: {
                __typename: 'user',
                id: 1,
                name: 'Johnny Imba',
                profile: {
                  __typename: 'profile',
                  id: 1,
                  sex: true,
                  age: 36,
                  email: 'johnny@rocks.com'
                }
              }
            }
          }
        };

        let request = await sendWithMockFetch(response, async () => {
          await Post.fetch(42);
        });

        const post = Post.query().withAllRecursive().find(42);
        expect(post.user).not.toEqual(null);
        expect(post.comments).not.toEqual(null);
        expect(post.comments.length).not.toEqual(0);
        expect(post.user.name).toEqual('Johnny Imba');
        expect(post.comments[0].content).toEqual('Works!');
      });
    });

    describe('Polymorphic Many To Many', async () => {
      it('works', async () => {
        // TODO
      });
    });
  })
});
