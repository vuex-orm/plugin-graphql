import QueryBuilder from 'app/graphql/query-builder';
import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data'
import {prettify} from "app/support/utils";
import Context from "app/common/context";
import Schema from "app/graphql/schema";
import {introspectionResult} from "../support/mock-data";

let context;
let store;
let vuexOrmGraphQL;


describe('QueryBuilder', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();

    // Make sure schema is filled
    context.schema = new Schema(introspectionResult.data.__schema);
    context.processSchema();
  });

  describe('.buildArguments', () => {
    it('can generate signatures', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, true, false, false);

      expect(args).toEqual('($content: String!, $title: String!, $otherId: Int!, $user: UserInput!)');
    });

    it('can generate fields with variables', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, false, false, false);

      expect(args).toEqual('(content: $content, title: $title, otherId: $otherId, user: $user)');
    });

    it('can generate filter field with variables', () => {
      const model = context.getModel('post');
      let args = QueryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, false, true, false);

      expect(args).toEqual('(filter: { content: $content, title: $title, otherId: $otherId, user: $user })');
    });
  });


  describe('.buildRelationsQuery', () => {
    it('generates query fields for all relations', () => {
      const fields = QueryBuilder.buildRelationsQuery(context.getModel('post'));
      const query = prettify(`query test { ${fields} }`).trim();

      expect(query).toEqual(`
query test {
  user {
    id
    name
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
      }
    }
  }
}
      `.trim());
    });
  });


  describe('.buildField', () => {
    it('generates query fields for all model fields and relations', () => {
      let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, true);
      query = prettify(`query users { ${query} }`).trim();

      expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
    nodes {
      id
      name
    }
  }
}
      `.trim());
    });

    describe('connection querys', () => {
      it('contains a nodes field when connection mode is nodes', () => {
        context.connectionQueryMode = 'nodes';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
    nodes {
      id
      name
    }
  }
}
      `.trim());
      });

      it('contains a edges field when connection mode is edges', () => {
        context.connectionQueryMode = 'edges';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
    edges {
      node {
        id
        name
      }
    }
  }
}
      `.trim());
      });

      it('contains no meta field when connection mode is plain', () => {
        context.connectionQueryMode = 'plain';

        let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 }, undefined, undefined, true);
        query = prettify(`query users { ${query} }`).trim();

        expect(query).toEqual(`
query users {
  users(filter: {age: $age}) {
    id
    name
  }
}
      `.trim());
      });
    });
  });


  describe('.buildQuery', () => {
    it('generates a complete query for a model', () => {
      const args = { title: 'Example Post 1' };

      let query = QueryBuilder.buildQuery('query', context.getModel('post'), null, args, true, true);
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
      user {
        id
        name
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
          }
        }
      }
    }
  }
}
      `.trim() + "\n");

    });

    it('generates a complete create mutation query for a model', () => {
      const variables = { post: { id: 15, userId: 2, title: 'test', content: 'even more test' } };
      let post = context.getModel('post');
      let query = QueryBuilder.buildQuery('mutation', post, 'createPost', variables, false);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
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
        }
      }
    }
  }
}
      `.trim() + "\n");

    });

    it('generates a complete update mutation query for a model', () => {
      const variables = { id: 2, post: { id: 2, userId: 1, title: 'test', content: 'Even more test' } };
      let post = context.getModel('post');
      let query = QueryBuilder.buildQuery('mutation', post, 'updatePost', variables, false);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation UpdatePost($id: ID!, $post: PostInput!) {
  updatePost(id: $id, post: $post) {
    id
    content
    title
    otherId
    published
    user {
      id
      name
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
        }
      }
    }
  }
}
      `.trim() + "\n");

    });



    it('generates a complete delete mutation query for a model', () => {
      let query = QueryBuilder.buildQuery('mutation', context.getModel('user'), 'deleteUser', { id: 15 });
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
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
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'userId', 15)).toEqual('Int');
    });

    it('returns Boolean for boolean typed fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'published', true)).toEqual('Boolean');
    });

    it('returns String for string typed values in generic fields', () => {
      const model = context.getModel('post');
      expect(QueryBuilder.determineAttributeType(model, 'generic', 'test')).toEqual('String');
    });
  });
});
