import { createStore } from 'test/support/Helpers';
import { Model as ORMModel } from '@vuex-orm/core';
import Transformer from "../../src/transformer";

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



beforeEach(async () => {
  [store, vuexOrmApollo] = createStore([
    { model: User }, { model: Post }, { model: Video }, { model: Comment }, { model: ContractOption }, { model: Contract },
    { model: ContractContractOption }
  ]);

  await User.insert({ data: { id: 1, name: 'Charlie Brown' }});
  await User.insert({ data: { id: 1, name: 'Charlie Brown' }});
  await User.insert({ data: { id: 2, name: 'Peppermint Patty' }});
  await Post.insert({ data: { id: 1, otherId: 9, userId: 1, title: 'Example post 1', content: 'Foo' }});
  await Post.insert({ data: { id: 2, otherId: 10, userId: 1, title: 'Example post 2', content: 'Bar' }});
  await Video.insert({ data: { id: 1, otherId: 11, userId: 1, title: 'Example video', content: 'Video' }});
  await Comment.insert({ data: { id: 1, userId: 1, subjectId: 1, subjectType: 'videos', content: 'Example comment 1' }});
  await Comment.insert({ data: { id: 2, userId: 2, subjectId: 1, subjectType: 'posts', content: 'Example comment 2' }});
  await Comment.insert({ data: { id: 3, userId: 2, subjectId: 2, subjectType: 'posts', content: 'Example comment 3' }});
});


describe('Transformer', () => {
  describe('.transformOutgoingData', () => {
    it('transforms models to a useful data hashmap', () => {
      const user = User.query().first();
      const transformedData = Transformer.transformOutgoingData(vuexOrmApollo.context.getModel('user'), user);
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
      expect(Transformer.transformIncomingData(incomingData1, contract, false)).toEqual(expectedData1);
      expect(Transformer.transformIncomingData(incomingData2, post, false)).toEqual(expectedData2);
    });


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
      const transformedData = Transformer.transformIncomingData(incomingData, model, true);

      expect(transformedData).toEqual(expectedData);
    });
  });
});
