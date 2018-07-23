import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data'
import Context from "app/common/context";
import {recordGraphQLRequest} from "../support/helpers";

let store;
let vuexOrmGraphQL;

describe('VuexORMGraphQL', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  it('fetches the schema on the first action', async () => {
    let result;

    const request = await recordGraphQLRequest(async () => {
      result = await Post.fetch(2);
    });

    expect(request).not.toEqual(null);
    expect(result).not.toEqual(null);

    const context = Context.getInstance();
    expect(!!context.schema).not.toEqual(false);
    expect(context.schema.getType('Post').name).toEqual('Post');
    expect(context.schema.getQuery('post').name).toEqual('post');
    expect(context.schema.getMutation('createPost').name).toEqual('createPost');
  });

  describe('fetch', () => {
    it('also requests the otherId field', async () => {
      const request = await recordGraphQLRequest(async () => {
        await Post.fetch(1);
      });

      expect(request.query).toEqual(`
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
  }
}
        `.trim() + "\n");

      const post = Post.query().withAll().where('id', 1).first();

      expect(post.title).toEqual('GraphQL');
      expect(post.content).toEqual('GraphQL is so nice!');
      expect(post.comments.length).toEqual(1);
      expect(post.comments[0].content).toEqual('Yes!!!!');
    });


    describe('with ID', () => {
      it("doesn't cache when bypassCache = true", async () => {
        let request1 = await recordGraphQLRequest(async () => { await User.fetch(1); }, true);
        expect(request1).not.toEqual(null);

        let request2 = await recordGraphQLRequest(async () => { await User.fetch(1); }, true);
        expect(request2).toEqual(null);

        let request3 = await recordGraphQLRequest(async () => { await User.fetch(1, true); }, true);
        expect(request3).not.toEqual(null);
      });

      it('sends the correct query to the API', async () => {
        const request = await recordGraphQLRequest(async () => { await User.fetch(1); });

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
    }
  }
}
        `.trim() + "\n");
      });
    });

    describe('without ID but with filter', () => {
      it('sends the correct query to the API', async () => {
        const request = await recordGraphQLRequest(async () => {
          await User.fetch({ profileId: 2 });
        });

        expect(request.variables).toEqual({ profileId: 2 });
        expect(request.query).toEqual(`
query Users($profileId: ID!) {
  users(filter: {profileId: $profileId}) {
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
          `.trim() + "\n");
      });
    });

    describe('without ID or filter', () => {
      it('sends the correct query to the API', async () => {
        const request = await recordGraphQLRequest(async () => { await User.fetch(); });

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
      }
    }
  }
}
          `.trim() + "\n");
      });
    });
  });


  describe('persist', () => {
    it('sends the correct query to the API', async () => {
      await User.fetch(1);

      const insertedData = await Post.insert({
        data: {
          title: 'It works!',
          content: "This is a test!",
          published: false,
          otherId: 15,
          author: User.find(1)
      }});

      let post = insertedData.posts[0];

      const request = await recordGraphQLRequest(async () => {
        post = await post.$persist();
      });

      expect(post.id).toEqual(4); // was set from the server

      expect(request.variables).toEqual({
        post: {
          content: "This is a test!",
          id: 1,
          otherId: 15,
          published: false,
          title: "It works!",
          authorId: 1,
          author: {
            id: 1,
            name: 'Charlie Brown',
            profileId: 1,
            profile: {
              id: 1,
              sex: true,
              age: 8,
              email: 'charlie@peanuts.com'
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
  }
}
      `.trim() + "\n");
    });
  });


  describe('push', () => {
    it('sends the correct query to the API', async () => {
      await User.fetch(1);
      const user = User.find(1);
      user.name = 'Snoopy';

      const request = await recordGraphQLRequest(async () => {
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
    }
  }
}
      `.trim() + "\n");
    });
  });


  describe('destroy', () => {
    it('sends the correct query to the API', async () => {
      await Post.fetch(1);
      const post = Post.find(1);

      const request = await recordGraphQLRequest(async () => {
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
  }
}
      `.trim() + "\n");
    });
  });


  describe('custom query', () => {
    it('via Model method sends the correct query to the API', async () => {
      const request = await recordGraphQLRequest(async () => {
        await Post.customQuery({name: 'unpublishedPosts', filter: {authorId: 3}});
      });

      expect(request.variables.authorId).toEqual(3);
      expect(request.query).toEqual(`
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
    }
  }
}
      `.trim() + "\n");
    });

    it('via record method sends the correct query to the API', async () => {
      await Post.fetch(1);
      const post = Post.find(1);

      const request = await recordGraphQLRequest(async () => {
        await post.$customQuery({name: 'unpublishedPosts', filter: {authorId: 2}});
      });

      expect(request.variables.authorId).toEqual(2);
      expect(request.variables.id).toEqual(1);
      expect(request.query).toEqual(`
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
    }
  }
}
      `.trim() + "\n");
    });
  });


  describe('custom mutation', () => {
    it('sends the correct query to the API', async () => {
      await Post.fetch(1);
      const post = Post.find(1);

      const request = await recordGraphQLRequest(async () => {
        await Post.mutate({name: 'upvotePost', args: { captchaToken: '15', postId: post.id }});
      });

      expect(request.variables.captchaToken).toEqual('15');
      expect(request.variables.postId).toEqual(post.id);
      expect(request.query).toEqual(`
mutation UpvotePost($captchaToken: String!, $postId: ID!) {
  upvotePost(captchaToken: $captchaToken, postId: $postId) {
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
  }
}
      `.trim() + "\n");
    });
  });


  describe('simple mutation', () => {
    it('sends my query to the api', async () => {
      let result;

      const query = `
mutation SendSms($to: String!, $text: String!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}`;

      const request = await recordGraphQLRequest(async () => {
        result = await store.dispatch('entities/simpleMutation', {
          query,
          variables: {to: '+4912345678', text: 'GraphQL is awesome!'}
        });
      });

      expect(request.variables).toEqual({ to: '+4912345678', text: 'GraphQL is awesome!' });
      expect(result).toEqual({
        sendSms: {
          __typename: "SmsStatus", // TODO: this could removed by Vuex-ORM-GraphQL IMHO
          delivered: true,
        }
      });
      expect(request.query).toEqual(`
mutation SendSms($to: String!, $text: String!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}
      `.trim() + "\n");
    });
  });


  describe('simple query', () => {
    it('sends my query to the api', async () => {
      let result;

      const query = `
query Status {
  status {
    backend
    smsGateway
    paypalIntegration
  }
}`;

      const request = await recordGraphQLRequest(async () => {
        result = await store.dispatch('entities/simpleQuery', {query, variables: {}});
      });

      expect(result).toEqual({
        status: {
          __typename: 'Status',
          backend: true,
          paypalIntegration: true,
          smsGateway: false,
        },
      });

      expect(request.query).toEqual(`
query Status {
  status {
    backend
    smsGateway
    paypalIntegration
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

      expect(user.$isPersisted).toBeFalsy();

      const result = await user.$persist();
      user = User.find(4);


      expect(user.$isPersisted).toBeTruthy();
    });

    it('is true for fetched records', async () => {
      await User.fetch(1);

      const user = User.find(1);
      expect(user.$isPersisted).toBeTruthy();
    });
  });


  describe('Relations', () => {
    describe('One To One', async () => {
      it('works', async () => {
        await User.fetch(1, true);

        const user = User.query().withAllRecursive().find(1);
        expect(user.name).toEqual('Charlie Brown');
        expect(user.profile).not.toEqual(null);
        expect(user.profile.sex).toEqual(true);
        expect(user.profile.email).toEqual('charlie@peanuts.com');
      });
    });

    describe('One To Many', async () => {
      it('works', async () => {
        // TODO
      });
    });

    describe('Has Many Through', async () => {
      it('works', async () => {
        await Tariff.fetch();

        const tariff = Tariff.query().withAllRecursive().find(1);
        expect(tariff.name).toEqual('Super DSL S');
        expect(tariff.tariffOptions).not.toEqual(null);
        expect(tariff.tariffOptions.length).not.toEqual(0);
        expect(tariff.tariffOptions[0].name).toEqual('Installation');
        expect(tariff.tariffOptions[0].tariffs).not.toEqual(null);
        expect(tariff.tariffOptions[0].tariffs[0].name).toEqual('Super DSL S');
      });
    });

    describe('Polymorphic One To One', async () => {
      it('works', async () => {
        // TODO
      });
    });

    describe('Polymorphic One To Many', async () => {
      it('works', async () => {
        const result = await Post.fetch(1, true);

        const post = Post.query().withAllRecursive().find(1);
        expect(post.author).not.toEqual(null);
        expect(post.comments).not.toEqual(null);
        expect(post.comments.length).not.toEqual(0);
        expect(post.author.name).toEqual('Charlie Brown');
        expect(post.comments[0].content).toEqual('Yes!!!!');
      });
    });

    describe('Polymorphic Many To Many', async () => {
      it('works', async () => {
        // TODO
      });
    });
  })
});
