import Transformer from "../../src/graphql/transformer";
import { setupMockData, Video } from "../support/mock-data";
import Context from "../../src/common/context";
import { ConnectionMode } from "../../src/adapters/adapter";

let store;
let vuexOrmGraphQL;
let context: Context;

describe("Transformer", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
    await context.loadSchema();
  });

  describe(".transformOutgoingData", () => {
    test("transforms models to a useful data hashmap", async () => {
      // @ts-ignore
      await Video.fetch(1);
      const video = context.getModel("video").getRecordWithId(1);
      const transformedData = Transformer.transformOutgoingData(context.getModel("video"), video);
      expect(transformedData).toEqual({
        id: 1,
        ignoreMe: "",
        content: "Foo",
        title: "Example Video 1",
        otherId: 42,
        authorId: 1,

        author: {
          id: 1,
          name: "Charlie Brown",
          profileId: 1,
          profile: {
            id: 1,
            email: "charlie@peanuts.com",
            age: 8,
            sex: true
          }
        }
      });
    });
  });

  describe(".transformIncomingData", () => {
    test("transforms incoming data into a Vuex-ORM readable structure", () => {
      const incomingData1 = {
        tariffs: {
          nodes: [
            {
              id: "1",
              name: "Tariff S",
              displayName: "Tariff S",
              slug: "tariff-s",
              checked: false,
              tariffOptions: {
                nodes: [
                  {
                    id: "1",
                    name: "Foo Bar 1",
                    description: "Very foo, much more bar"
                  }
                ]
              }
            },
            {
              id: "2",
              name: "Tariff M",
              displayName: "Tariff M",
              slug: "tariff-m",
              checked: true,
              tariffOptions: {
                nodes: [
                  {
                    id: "1",
                    name: "Foo Bar 1",
                    description: "Very foo, much more bar"
                  }
                ]
              }
            },
            {
              id: "3",
              name: "Tariff L",
              displayName: "Tariff L",
              slug: "tariff-l",
              checked: false,
              tariffOptions: {
                nodes: [
                  {
                    id: "1",
                    name: "Foo Bar 1",
                    description: "Very foo, much more bar"
                  }
                ]
              }
            }
          ]
        }
      };
      const expectedData1 = {
        tariffs: [
          {
            $isPersisted: true,
            checked: false,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff S",
            id: 1,
            name: "Tariff S",
            slug: "tariff-s"
          },
          {
            $isPersisted: true,
            checked: true,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff M",
            id: 2,
            name: "Tariff M",
            slug: "tariff-m"
          },
          {
            $isPersisted: true,
            checked: false,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff L",
            id: 3,
            name: "Tariff L",
            slug: "tariff-l"
          }
        ]
      };

      const incomingData2 = {
        posts: {
          nodes: [
            {
              id: "1",
              content: "example content",
              title: "example title",
              author: {
                id: "15",
                name: "Charly Brown"
              },
              otherId: "4894.35",
              comments: {
                nodes: [
                  {
                    id: "42",
                    content: "Works!",
                    author: {
                      id: "14",
                      name: "Peppermint Patty"
                    },
                    subjectId: "1",
                    subjectType: "Post"
                  }
                ]
              }
            }
          ]
        }
      };
      const expectedData2 = {
        posts: [
          {
            $isPersisted: true,
            id: 1,
            content: "example content",
            title: "example title",
            author: {
              $isPersisted: true,
              id: 15,
              name: "Charly Brown"
            },
            otherId: 4894.35,
            comments: [
              {
                $isPersisted: true,
                id: 42,
                content: "Works!",
                author: {
                  $isPersisted: true,
                  id: 14,
                  name: "Peppermint Patty"
                },
                subjectId: 1,
                subjectType: "posts"
              }
            ]
          }
        ]
      };

      const tariff = context.getModel("tariff");
      const post = context.getModel("post");
      expect(Transformer.transformIncomingData(incomingData1, tariff, false)).toEqual(
        expectedData1
      );
      expect(Transformer.transformIncomingData(incomingData2, post, false)).toEqual(expectedData2);
    });

    test("transforms incoming data after a mutation into a Vuex-ORM readable structure", () => {
      const incomingData = {
        createTariff: {
          id: "1",
          name: "Tariff S",
          displayName: "Tariff S",
          slug: "tariff-s",
          tariffOptions: {
            nodes: [
              {
                id: "1",
                name: "Foo Bar 1",
                description: "Very foo, much more bar"
              }
            ]
          }
        }
      };
      const expectedData = {
        tariff: {
          $isPersisted: true,
          tariffOptions: [
            {
              $isPersisted: true,
              description: "Very foo, much more bar",
              id: 1,
              name: "Foo Bar 1"
            }
          ],
          displayName: "Tariff S",
          id: 1,
          name: "Tariff S",
          slug: "tariff-s"
        }
      };

      const model = context.getModel("tariff");
      const transformedData = Transformer.transformIncomingData(incomingData, model, true);

      expect(transformedData).toEqual(expectedData);
    });

    test("transforms incoming data into a Vuex-ORM readable structure in edges connection mode", () => {
      const incomingData1 = {
        tariffs: {
          edges: [
            {
              node: {
                id: "1",
                name: "Tariff S",
                displayName: "Tariff S",
                slug: "tariff-s",
                checked: false,
                tariffOptions: {
                  edges: [
                    {
                      node: {
                        id: "1",
                        name: "Foo Bar 1",
                        description: "Very foo, much more bar"
                      }
                    }
                  ]
                }
              }
            },
            {
              node: {
                id: "2",
                name: "Tariff M",
                displayName: "Tariff M",
                slug: "tariff-m",
                checked: true,
                tariffOptions: {
                  edges: [
                    {
                      node: {
                        id: "1",
                        name: "Foo Bar 1",
                        description: "Very foo, much more bar"
                      }
                    }
                  ]
                }
              }
            },
            {
              node: {
                id: "3",
                name: "Tariff L",
                displayName: "Tariff L",
                slug: "tariff-l",
                checked: false,
                tariffOptions: {
                  edges: [
                    {
                      node: {
                        id: "1",
                        name: "Foo Bar 1",
                        description: "Very foo, much more bar"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      };
      const expectedData1 = {
        tariffs: [
          {
            $isPersisted: true,
            checked: false,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff S",
            id: 1,
            name: "Tariff S",
            slug: "tariff-s"
          },
          {
            $isPersisted: true,
            checked: true,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff M",
            id: 2,
            name: "Tariff M",
            slug: "tariff-m"
          },
          {
            $isPersisted: true,
            checked: false,
            tariffOptions: [
              {
                $isPersisted: true,
                description: "Very foo, much more bar",
                id: 1,
                name: "Foo Bar 1"
              }
            ],
            displayName: "Tariff L",
            id: 3,
            name: "Tariff L",
            slug: "tariff-l"
          }
        ]
      };

      const incomingData2 = {
        posts: {
          edges: [
            {
              node: {
                id: "1",
                content: "example content",
                title: "example title",
                author: {
                  id: "15",
                  name: "Charly Brown"
                },
                otherId: "4894.35",
                comments: {
                  edges: [
                    {
                      node: {
                        id: "42",
                        content: "Works!",
                        author: {
                          id: "14",
                          name: "Peppermint Patty"
                        },
                        subjectId: "1",
                        subjectType: "Post"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      };
      const expectedData2 = {
        posts: [
          {
            $isPersisted: true,
            id: 1,
            content: "example content",
            title: "example title",
            author: {
              $isPersisted: true,
              id: 15,
              name: "Charly Brown"
            },
            otherId: 4894.35,
            comments: [
              {
                $isPersisted: true,
                id: 42,
                content: "Works!",
                author: {
                  $isPersisted: true,
                  id: 14,
                  name: "Peppermint Patty"
                },
                subjectId: 1,
                subjectType: "posts"
              }
            ]
          }
        ]
      };

      const tariff = context.getModel("tariff");
      const post = context.getModel("post");

      context.connectionMode = ConnectionMode.EDGES;

      expect(Transformer.transformIncomingData(incomingData1, tariff, false)).toEqual(
        expectedData1
      );
      expect(Transformer.transformIncomingData(incomingData2, post, false)).toEqual(expectedData2);
    });
  });
});
