import Transformer from "../../src/graphql/transformer";
import { Comment, setupMockData, Tag, Taggable, User, Video } from "../support/mock-data";
import Context from "../../src/common/context";
import { ConnectionMode } from "../../src/adapters/adapter";
import { Data } from "../../src/support/interfaces";

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
      const video = context.getModel("video").getRecordWithId(1)!;
      const transformedData = Transformer.transformOutgoingData(
        context.getModel("video"),
        video,
        false
      );
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
              uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
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
              uuid: "3F8EC67A-314D-413F-996F-87CB9A28A56C",
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
              uuid: "DDDB5333-DCD7-40AF-A863-DD0E9249155A",
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
            uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
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
            uuid: "3F8EC67A-314D-413F-996F-87CB9A28A56C",
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
            uuid: "DDDB5333-DCD7-40AF-A863-DD0E9249155A",
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
      expect(
        Transformer.transformIncomingData((incomingData1 as unknown) as Data, tariff, false)
      ).toEqual(expectedData1);
      expect(
        Transformer.transformIncomingData((incomingData2 as unknown) as Data, post, false)
      ).toEqual(expectedData2);
    });

    test("transforms incoming data after a mutation into a Vuex-ORM readable structure", () => {
      const incomingData = {
        createTariff: {
          uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
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
          uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
          name: "Tariff S",
          slug: "tariff-s"
        }
      };

      const model = context.getModel("tariff");
      const transformedData = Transformer.transformIncomingData(
        (incomingData as unknown) as Data,
        model,
        true
      );

      expect(transformedData).toEqual(expectedData);
    });

    test("transforms incoming data into a Vuex-ORM readable structure in edges connection mode", () => {
      const incomingData1 = {
        tariffs: {
          edges: [
            {
              node: {
                uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
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
                uuid: "3F8EC67A-314D-413F-996F-87CB9A28A56C",
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
                uuid: "DDDB5333-DCD7-40AF-A863-DD0E9249155A",
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
            uuid: "210306B3-3008-4B91-88E0-8ED1024F5F83",
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
            uuid: "3F8EC67A-314D-413F-996F-87CB9A28A56C",
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
            uuid: "DDDB5333-DCD7-40AF-A863-DD0E9249155A",
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

      expect(
        Transformer.transformIncomingData((incomingData1 as unknown) as Data, tariff, false)
      ).toEqual(expectedData1);
      expect(
        Transformer.transformIncomingData((incomingData2 as unknown) as Data, post, false)
      ).toEqual(expectedData2);
    });
  });

  describe(".shouldIncludeOutgoingField", () => {
    test("works", () => {
      const user = context.getModel("user");
      const post = context.getModel("post");

      expect(Transformer.shouldIncludeOutgoingField(false, "posts", 15, user, ["posts"])).toEqual(
        true
      );
      expect(Transformer.shouldIncludeOutgoingField(true, "profile", {}, user)).toEqual(false);

      expect(Transformer.shouldIncludeOutgoingField(false, "id", 15, user)).toEqual(true);
      expect(Transformer.shouldIncludeOutgoingField(false, "name", "test", user)).toEqual(true);
      expect(Transformer.shouldIncludeOutgoingField(false, "profileId", 15, user)).toEqual(true);
      expect(Transformer.shouldIncludeOutgoingField(false, "posts", [], user)).toEqual(false);
      expect(Transformer.shouldIncludeOutgoingField(false, "comments", [], user)).toEqual(false);
      expect(Transformer.shouldIncludeOutgoingField(false, "profile", {}, user)).toEqual(true);

      expect(Transformer.shouldIncludeOutgoingField(false, "otherId", {}, post)).toEqual(true);
      expect(Transformer.shouldIncludeOutgoingField(false, "author", {}, post)).toEqual(true);
      expect(Transformer.shouldIncludeOutgoingField(false, "comments", {}, post)).toEqual(false);
      expect(Transformer.shouldIncludeOutgoingField(false, "tags", {}, post)).toEqual(true);
    });
  });
});
