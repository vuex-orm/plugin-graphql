import QueryBuilder from 'app/graphql/query-builder';
import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data'
import {prettify} from "app/support/utils";
import Context from "app/common/context";

let context;
let store;
let vuexOrmGraphQL;


describe('QueryBuilder', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
    await context.loadSchema();
  });

  describe('.buildArguments', () => {
    it('can generate signatures', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        authorId: 5,
        author: { __type: 'User' },
        comments: [{
          id: 1,
          content: 'test'
        }]
      }, true, false, false);

      expect(args).toEqual('$content: String!, $title: String!, $otherId: ID!, $author: UserInput!');



      args = QueryBuilder.buildArguments(model, {
        id: 5,
        itemIds: [1, 2, 4, 9, 68]
      }, true, false, true, context.schema.getMutation('reorderItems'));

      expect(args).toEqual('$id: ID!, $itemIds: [ID]!');
    });

    it('can generate fields with variables', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        authorId: 5,
        author: { __type: 'User' },
        crazyIDList: [1, 2, 4, 9, 68],
        comments: [{
          id: 1,
          content: 'test'
        }]
      }, false, false, false);

      expect(args).toEqual('content: $content, title: $title, otherId: $otherId, author: $author, ' +
        'crazyIDList: $crazyIDList');
    });

    it('can generate filter field with variables', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        authorId: 5,
        author: { __type: 'User' }
      }, false, true, false);

      expect(args).toEqual('filter: { content: $content, title: $title, otherId: $otherId, author: $author }');
    });
  });


  describe('.buildRelationsQuery', () => {
    it('generates query fields for all relations', () => {
      const fields = QueryBuilder.buildRelationsQuery(context.getModel('post'), ['post']);
      const query = prettify(`query test { ${fields} }`).trim();

      expect(query).toEqual(`
query test {
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
      `.trim());
    });


    it('respects nested categories', () => {
      const fields = QueryBuilder.buildRelationsQuery(context.getModel('category'), ['category']);
      const query = prettify(`query test { ${fields} }`).trim();

      expect(query).toEqual(`
query test {
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
      `.trim());
    });
  });


  describe('.buildField', () => {
    it('generates query fields for all model fields and relations', () => {
      let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, undefined, true);
      query = prettify(`query users { ${query} }`).trim();

      expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
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
      `.trim());
    });

    describe('connection querys', () => {
      it('contains a nodes field when connection mode is nodes', () => {
        context.connectionQueryMode = 'nodes';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
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
      `.trim());
      });

      it('contains a edges field when connection mode is edges', () => {
        context.connectionQueryMode = 'edges';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
    edges {
      node {
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
      `.trim());
      });

      it('contains no meta field when connection mode is plain', () => {
        context.connectionQueryMode = 'plain';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
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
      `.trim());
      });
    });
  });


  describe('.buildQuery', () => {
    it('generates a complete query for a model', () => {
      const args = { title: 'Example Post 1' };

      let query = QueryBuilder.buildQuery('query', context.getModel('post'), null, args, undefined, true, true);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
query Posts($title: String!) {
  posts(filter: {title: $title}) {
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

    it('generates a complete create mutation query for a model', () => {
      const variables = { post: { id: 15, authorId: 2, title: 'test', content: 'even more test' } };
      let post = context.getModel('post');
      let query = QueryBuilder.buildQuery('mutation', post, 'createPost', variables, undefined, false);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
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

    it('generates a complete update mutation query for a model', () => {
      const variables = { id: 2, post: { id: 2, authorId: 1, title: 'test', content: 'Even more test' } };
      let post = context.getModel('post');
      let query = QueryBuilder.buildQuery('mutation', post, 'updatePost', variables, undefined, false);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation UpdatePost($id: ID!, $post: PostInput!) {
  updatePost(id: $id, post: $post) {
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



    it('generates a complete delete mutation query for a model', () => {
      let query = QueryBuilder.buildQuery('mutation', context.getModel('user'), 'deleteUser', { id: 15 }, undefined);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
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


  describe('.determineAttributeType', () => {
    it('throws a exception when the input is something unknown', () => {
      const model = context.getModel('post');
      expect(() => QueryBuilder.determineAttributeType(model, 'asdfsfa', undefined))
        .toThrowError("Can't find suitable graphql type for field 'post.asdfsfa'");
    });

    it('returns String for string typed fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'title', 'Example')).toEqual('String');
    });

    it('returns Int for number typed fields', () => {
      const model = context.getModel('profile');
      expect(QueryBuilder.determineAttributeType(model, 'age', 24)).toEqual('Int');
    });

    it('returns ID for id typed fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'authorId', 15)).toEqual('ID');
    });

    it('returns Boolean for boolean typed fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'published', true)).toEqual('Boolean');
    });

    it('returns String for string typed values in generic fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'generic', 'test')).toEqual('String');
    });

    it('returns the correct type for a argument in a query or mutation', () => {
      const model = context.getModel('post');
      const field = context.schema.getMutation('updatePost');
      expect(QueryBuilder.determineAttributeType(model, 'post', null, field)).toEqual('PostInput');
    });

    it('returns the correct type for a argument within a query', () => {
      const model = context.getModel('post');
      const field = context.schema.getQuery('posts');
      expect(QueryBuilder.determineAttributeType(model, 'author', null, field)).toEqual('UserInput');
    });
  });
});
