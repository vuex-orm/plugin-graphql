import QueryBuilder from 'app/graphql/query-builder';
import { setupMockData, User, Video, Post, Comment, ContractContractOption, Contract, ContractOption } from 'test/support/mock-data'
import {prettify} from "app/support/utils";
import Context from "app/common/context";

let context;
let store;
let vuexOrmApollo;


beforeEach(async () => {
  [store, vuexOrmApollo] = await setupMockData();
  context = Context.getInstance();
});


describe('QueryBuilder', () => {
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
    }
  }
}
      `.trim());
    });
  });



  describe('.buildField', () => {
    it('generates query fields for all model fields and relations', () => {
      let query = QueryBuilder.buildField(context.getModel('user'), true, { age: 32 });
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
  });


  describe('.buildQuery', () => {
    it('generates a complete query for a model', () => {
      const args = { title: 'Example Post 1' };

      let query = QueryBuilder.buildQuery('query', context.getModel('post'), null, args, true);
      query = prettify(query.loc.source.body);

      expect(query).toEqual(`
query Posts($title: String!) {
  posts(filter: {title: $title}) {
    nodes {
      id
      content
      title
      otherId
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
});
