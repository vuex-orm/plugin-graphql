import { createStore } from 'test/support/Helpers';
import { Model as ORMModel } from '@vuex-orm/core';
import QueryBuilder from 'app/queryBuilder';
import Model from 'app/model';
import Logger from 'app/logger';
import Context from "app/context";

let queryBuilder;
let store;
let vuexOrmApollo;

// TODO: move this setup to the Helpers file

class User extends ORMModel {
  static entity = 'users';

  static fields () {
    return {
      id: this.increment(0),
      name: this.string(''),
      posts: this.hasMany(Post, 'userId'),
      comments: this.hasMany(Comment, 'userId')
    };
  }
}

class Video extends ORMModel {
  static entity = 'videos';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(null),
      content: this.string(''),
      title: this.string(''),
      userId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      user: this.belongsTo(User, 'userId'),
      comments: this.morphMany(Comment, 'subjectId', 'subjectType')
    };
  }
}

class Post extends ORMModel {
  static entity = 'posts';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(null),
      content: this.string(''),
      title: this.string(''),
      userId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      user: this.belongsTo(User, 'userId'),
      comments: this.morphMany(Comment, 'subjectId', 'subjectType')
    };
  }
}


class Comment extends ORMModel {
  static entity = 'comments';

  static fields () {
    return {
      id: this.increment(0),
      content: this.string(''),
      userId: this.number(0),
      user: this.belongsTo(User, 'userId'),

      subjectId: this.number(0),
      subjectType: this.string('')
    };
  }
}

class ContractContractOption extends ORMModel {
  static entity = 'contractContractOptions';

  static primaryKey = ['contractId', 'contractOptionId'];

  static fields () {
    return {
      contractId: this.attr(null),
      contractOptionId: this.attr(null),
    }
  }
}

class Contract extends ORMModel {
  static entity = 'contracts';

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      displayName: this.attr(''),
      slug: this.attr(''),

      contractOptions: this.belongsToMany(ContractOption, ContractContractOption, 'contractId',
        'contractOptionId'),
    }
  }
}


class ContractOption extends ORMModel {
  static entity = 'contractOptions';

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      description: this.attr(''),

      contracts: this.belongsToMany(Contract, ContractContractOption, 'contractOptionId', 'contractId')
    }
  }
}



beforeEach(() => {
  [store, vuexOrmApollo] = createStore([
    { model: User }, { model: Post }, { model: Video }, { model: Comment }, { model: ContractOption }, { model: Contract },
    { model: ContractContractOption }
  ]);

  store.dispatch('entities/users/insert', { data: { id: 1, name: 'Charlie Brown' }});
  store.dispatch('entities/users/insert', { data: { id: 2, name: 'Peppermint Patty' }});
  store.dispatch('entities/posts/insert', { data: { id: 1, userId: 1, title: 'Example post 1', content: 'Foo' }});
  store.dispatch('entities/posts/insert', { data: { id: 1, userId: 1, title: 'Example post 2', content: 'Bar' }});
  store.dispatch('entities/videos/insert', { data: { id: 1, userId: 1, title: 'Example video', content: 'Video' }});
  store.dispatch('entities/comments/insert', { data: { id: 1, userId: 1, subjectId: 1, subjectType: 'videos', content: 'Example comment 1' }});
  store.dispatch('entities/comments/insert', { data: { id: 1, userId: 2, subjectId: 1, subjectType: 'posts', content: 'Example comment 2' }});
  store.dispatch('entities/comments/insert', { data: { id: 1, userId: 2, subjectId: 2, subjectType: 'posts', content: 'Example comment 3' }});

  queryBuilder = vuexOrmApollo.queryBuilder;
});


describe('QueryBuilder', () => {
  describe('.buildArguments', () => {
    it('can generate signatures', () => {
      const model = vuexOrmApollo.context.getModel('post');
      let args = queryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, true, false, false);

      expect(args).toEqual('($content: String!, $title: String!, $otherId: Int!, $user: UserInput!)');
    });

    it('can generate fields with variables', () => {
      const model = vuexOrmApollo.context.getModel('post');
      let args = queryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, false, false, false);

      expect(args).toEqual('(content: $content, title: $title, otherId: $otherId, user: $user)');
    });

    it('can generate filter field with variables', () => {
      const model = vuexOrmApollo.context.getModel('post');
      let args = queryBuilder.buildArguments(model, {
        content: 'Foo Bar',
        title: 'Example',
        otherId: 18,
        userId: 5,
        user: { __type: 'User' }
      }, false, true, false);

      expect(args).toEqual('(filter: { content: $content, title: $title, otherId: $otherId, user: $user })');
    });
  });


  describe('.transformOutgoingData', () => {
    it('transforms models to a useful data hashmap', () => {
      const user = store.getters['entities/users/query']().first();
      const transformedData = queryBuilder.transformOutgoingData(vuexOrmApollo.context.getModel('user'), user);
      expect(transformedData).toEqual({ id: 1, name: 'Charlie Brown' });
    });
  });


  describe('.transformIncomingData', () => {
    it('transforms incoming data into a Vuex-ORM readable structure', () => {
      const incomingData1 = {
        "contracts": {
          "nodes": [
            {
              "id": "1",
              "name": "Contract S",
              "displayName": "Contract S",
              "slug": "contract-s",
              "checked": false,
              "contractOptions": {
                "nodes": [
                  {
                    "id": "1",
                    "name": "Foo Bar 1",
                    "description": "Very foo, much more bar"
                  }
                ]
              }
            },
            {
              "id": "2",
              "name": "Contract M",
              "displayName": "Contract M",
              "slug": "contract-m",
              "checked": true,
              "contractOptions": {
                "nodes": [
                  {
                    "id": "1",
                    "name": "Foo Bar 1",
                    "description": "Very foo, much more bar"
                  }
                ]
              }
            },
            {
              "id": "3",
              "name": "Contract L",
              "displayName": "Contract L",
              "slug": "contract-l",
              "checked": false,
              "contractOptions": {
                "nodes": [
                  {
                    "id": "1",
                    "name": "Foo Bar 1",
                    "description": "Very foo, much more bar"
                  }
                ]
              }
            }
          ]
        }
      };
      const expectedData1 = {
        "contracts": [
          {
            "$isPersisted": true,
            "checked": false,
            "contractOptions": [
              {
                "$isPersisted": true,
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract S",
            "id": 1,
            "name": "Contract S",
            "slug": "contract-s",
          },
          {
            "$isPersisted": true,
            "checked": true,
            "contractOptions": [
              {
                "$isPersisted": true,
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract M",
            "id": 2,
            "name": "Contract M",
            "slug": "contract-m",
          },
          {
            "$isPersisted": true,
            "checked": false,
            "contractOptions": [
              {
                "$isPersisted": true,
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract L",
            "id": 3,
            "name": "Contract L",
            "slug": "contract-l",
          },
        ],
      };

      const incomingData2 = {
        "posts": {
          "nodes": [
            {
              "id": "1",
              "content": "example content",
              "title": "example title",
              "user": {
                "id": "15",
                "name": "Charly Brown"
              },
              "otherId": "4894.35",
              "comments": {
                "nodes": [
                  {
                    "id": "42",
                    "content": "Works!",
                    "user": {
                      "id": "14",
                      "name": "Peppermint Patty"
                    },
                    "subjectId": "1",
                    "subjectType": "Post"
                  }
                ]
              }
            }
          ]
        }
      };
      const expectedData2 = {
        "posts": [
          {
            "$isPersisted": true,
            "id": 1,
            "content": "example content",
            "title": "example title",
            "user": {
              "$isPersisted": true,
              "id": 15,
              "name": "Charly Brown"
            },
            "otherId": 4894.35,
            "comments": [
              {
                "$isPersisted": true,
                "id": 42,
                "content": "Works!",
                "user": {
                  "$isPersisted": true,
                  "id": 14,
                  "name": "Peppermint Patty"
                },
                "subjectId": 1,
                "subjectType": "posts"
              }
            ]
          }
        ]
      };

      const contract = vuexOrmApollo.context.getModel('contract');
      const post = vuexOrmApollo.context.getModel('post');
      expect(queryBuilder.transformIncomingData(incomingData1, contract, false)).toEqual(expectedData1);
      expect(queryBuilder.transformIncomingData(incomingData2, post, false)).toEqual(expectedData2);
    });
  });


  describe('.transformIncomingData', () => {
    it('transforms incoming data after a mutation into a Vuex-ORM readable structure', () => {
      const incomingData = {
        "createContract": {
          "id": "1",
          "name": "Contract S",
          "displayName": "Contract S",
          "slug": "contract-s",
          "contractOptions": {
            "nodes": [
              {
                "id": "1",
                "name": "Foo Bar 1",
                "description": "Very foo, much more bar"
              }
            ]
          }
        }
      };
      const expectedData = {
        "contract": {
            "$isPersisted": true,
            "contractOptions": [
              {
                "$isPersisted": true,
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract S",
            "id": 1,
            "name": "Contract S",
            "slug": "contract-s",
          }
        };

      const model = vuexOrmApollo.context.getModel('contract');
      const transformedData = queryBuilder.transformIncomingData(incomingData, model, true);

      expect(transformedData).toEqual(expectedData);
    });
  });


  describe('.buildRelationsQuery', () => {
    it('generates query fields for all relations', () => {
      const fields = queryBuilder.buildRelationsQuery(vuexOrmApollo.context.getModel('post'));
      const query = QueryBuilder.prettify(`query test { ${fields} }`).trim();

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
      let query = queryBuilder.buildField(vuexOrmApollo.context.getModel('user'), true, { age: 32 });
      query = QueryBuilder.prettify(`query users { ${query} }`).trim();

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

      let query = queryBuilder.buildQuery('query', vuexOrmApollo.context.getModel('post'), null, args, true);
      query = QueryBuilder.prettify(query.loc.source.body);

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
      let post = vuexOrmApollo.context.getModel('post');
      let query = queryBuilder.buildQuery('mutation', post, 'createPost', variables, false);
      query = QueryBuilder.prettify(query.loc.source.body);

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
      let post = vuexOrmApollo.context.getModel('post');
      let query = queryBuilder.buildQuery('mutation', post, 'updatePost', variables, false);
      query = QueryBuilder.prettify(query.loc.source.body);

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
      let query = queryBuilder.buildQuery('mutation', vuexOrmApollo.context.getModel('user'), 'deleteUser', { id: 15 });
      query = QueryBuilder.prettify(query.loc.source.body);

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
