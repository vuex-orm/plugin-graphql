import Transformer from "app/graphql/transformer";
import { setupMockData, User, Video, Post, Comment, ContractContractOption, Contract, ContractOption } from 'test/support/mock-data'
import Context from "app/common/context";

let store;
let vuexOrmApollo;
let context;


beforeEach(async () => {
  [store, vuexOrmApollo] = await setupMockData();
  context = Context.getInstance();
});


describe('Transformer', () => {
  describe('.transformOutgoingData', () => {
    it('transforms models to a useful data hashmap', () => {
      const user = User.query().first();
      const transformedData = Transformer.transformOutgoingData(context.getModel('user'), user);
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

      const contract = context.getModel('contract');
      const post = context.getModel('post');
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

      const model = context.getModel('contract');
      const transformedData = Transformer.transformIncomingData(incomingData, model, true);

      expect(transformedData).toEqual(expectedData);
    });
  });
});
