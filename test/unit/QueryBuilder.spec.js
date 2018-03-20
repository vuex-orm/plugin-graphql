import { createStore } from 'test/support/Helpers';
import { Model as ORMModel } from '@vuex-orm/core';
import QueryBuilder from 'app/queryBuilder';
import Model from 'app/model';
import Logger from 'app/logger';
import gql from 'graphql-tag';

let queryBuilder;
let store;

class User extends ORMModel {
  static entity = 'users';

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
      profile: this.hasOne(Profile, 'user_id')
    };
  }
}

class Profile extends ORMModel {
  static entity = 'profiles';

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null)
    };
  }
}

beforeEach(() => {
  store = createStore([{ model: User }, { model: Profile }]);
  store.dispatch('entities/profiles/insert', { data: { id: 1, user_id: 1 }});
  store.dispatch('entities/users/insert', { data: { id: 1, name: 'Foo Bar', profile: { id: 1 } }});

  const logger = new Logger(false);
  queryBuilder = new QueryBuilder(logger, (model) => {
    if (typeof model === 'object') return model;

    if (model === 'user' || model === 'users') {
      return new Model(User);
    } else {
      return new Model(Profile);
    }
  });
});


describe('QueryBuilder', () => {
  describe('.buildArguments', () => {
    it('can generate signatures', () => {
      let args = queryBuilder.buildArguments({
        name: 'Foo Bar',
        email: 'example@foo.net',
        age: 32,
        user: { __type: 'User' }
      }, true);

      expect(args).toEqual('($name: String!, $email: String!, $age: Number!, $user: UserInput!)');
    });

    it('can generate fields with variables', () => {
      let args = queryBuilder.buildArguments({
        name: 'Foo Bar',
        email: 'example@foo.net',
        age: 32,
        user: { __type: 'User' }
      }, false, true);

      expect(args).toEqual('(name: $name, email: $email, age: $age, user: $user)');
    });
  });


  describe('.transformOutgoingData', () => {
    it('transforms models to a useful data hashmap', () => {
      const user = store.getters['entities/users/find']();
      const transformedData = queryBuilder.transformOutgoingData(user);
      expect(transformedData).toEqual({ name: 'Foo Bar' });
    });
  });


  describe('.transformIncomingData', () => {
    it('transforms incoming data into Vuex-ORM a readable structure', () => {
      const incomingData = {
        "contracts": {
          "nodes": [
            {
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
              },
              "documentReferences": {
                "nodes": []
              }
            },
            {
              "id": "2",
              "name": "Contract M",
              "displayName": "Contract M",
              "slug": "contract-m",
              "contractOptions": {
                "nodes": [
                  {
                    "id": "1",
                    "name": "Foo Bar 1",
                    "description": "Very foo, much more bar"
                  }
                ]
              },
              "documentReferences": {
                "nodes": []
              }
            },
            {
              "id": "3",
              "name": "Contract L",
              "displayName": "Contract L",
              "slug": "contract-l",
              "contractOptions": {
                "nodes": [
                  {
                    "id": "1",
                    "name": "Foo Bar 1",
                    "description": "Very foo, much more bar"
                  }
                ]
              },
              "documentReferences": {
                "nodes": []
              }
            }
          ]
        }
      };
      const expectedData = {
        "contracts": [
          {
            "contractOptions": [
              {
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract S",
            "documentReferences": [],
            "id": 1,
            "name": "Contract S",
            "slug": "contract-s",
          },
          {
            "contractOptions": [
              {
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract M",
            "documentReferences": [],
            "id": 2,
            "name": "Contract M",
            "slug": "contract-m",
          },
          {
            "contractOptions": [
              {
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract L",
            "documentReferences": [],
            "id": 3,
            "name": "Contract L",
            "slug": "contract-l",
          },
        ],
      };

      expect(queryBuilder.transformIncomingData(incomingData)).toEqual(expectedData);
    });
  });


  describe('.transformIncomingData', () => {
    it('transforms incoming data after a mutation into Vuex-ORM a readable structure', () => {
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
          },
          "documentReferences": {
            "nodes": []
          }
        }
      };
      const expectedData = {
        "contract": {
            "contractOptions": [
              {
                "description": "Very foo, much more bar",
                "id": 1,
                "name": "Foo Bar 1",
              },
            ],
            "displayName": "Contract S",
            "documentReferences": [],
            "id": 1,
            "name": "Contract S",
            "slug": "contract-s",
          }
        };

      expect(queryBuilder.transformIncomingData(incomingData, true)).toEqual(expectedData);
    });
  });


  describe('.buildRelationsQuery', () => {
    it('generates query fields for all relations', () => {
      let queries = queryBuilder.buildRelationsQuery(new Model(User));

      queries = queries.map(v => QueryBuilder.prettify(`query test { ${v} }`).trim());

      expect(queries).toEqual([`
query test {
  profiles {
    nodes {
      id
      user_id
    }
  }
}
      `.trim()]);
    });
  });



  describe('.buildField', () => {
    it('generates query fields for all model fields and relations', () => {
      let query = queryBuilder.buildField(new Model(User), true, { age: 32 });
      query = QueryBuilder.prettify(`query users { ${query} }`).trim();

      expect(query).toEqual(`
query users {
  users(age: $age) {
    nodes {
      id
      name
      profiles {
        nodes {
          id
          user_id
        }
      }
    }
  }
}
      `.trim());

    });
  });


  describe('.buildQuery', () => {
    it('generates a complete query for a model', () => {
      const args = new Map();
      args.set('age', 32);

      let query = queryBuilder.buildQuery('query', new Model(User), null, args, args);
      query = QueryBuilder.prettify(query.loc.source.body);

      expect(query).toEqual(`
query Users {
  users {
    nodes {
      id
      name
      profiles {
        nodes {
          id
          user_id
        }
      }
    }
  }
}
      `.trim() + "\n");

    });

    it('generates a complete create mutation query for a model', () => {
      let query = queryBuilder.buildQuery('mutation', new Model(User), 'createUser', { user: { id: 15, name: 'test' } }, false);
      query = QueryBuilder.prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation CreateUser($user: UserInput!) {
  createUser(user: $user) {
    id
    name
    profiles {
      nodes {
        id
        user_id
      }
    }
  }
}
      `.trim() + "\n");

    });

    it('generates a complete update mutation query for a model', () => {
      let query = queryBuilder.buildQuery('mutation', new Model(User), 'updateUser', { id: 15, user: { name: 'test' } }, false);
      query = QueryBuilder.prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    id
    name
    profiles {
      nodes {
        id
        user_id
      }
    }
  }
}
      `.trim() + "\n");

    });



    it('generates a complete delete mutation query for a model', () => {
      let query = queryBuilder.buildQuery('mutation', new Model(User), 'deleteUser', { id: 15 });
      query = QueryBuilder.prettify(query.loc.source.body);

      expect(query).toEqual(`
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
    profiles {
      nodes {
        id
        user_id
      }
    }
  }
}
      `.trim() + "\n");

    });
  });
});
