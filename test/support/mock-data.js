import {Model as ORMModel} from "@vuex-orm/core";
import {createStore} from "./helpers";

export class User extends ORMModel {
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

export class Video extends ORMModel {
  static entity = 'videos';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(null),
      content: this.string(''),
      title: this.string(''),
      userId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      ignoreMe: this.string(''),
      user: this.belongsTo(User, 'userId'),
      comments: this.morphMany(Comment, 'subjectId', 'subjectType')
    };
  }
}

export class Post extends ORMModel {
  static entity = 'posts';
  static eagerLoad = ['comments'];

  static fields () {
    return {
      id: this.increment(null),
      content: this.string(''),
      title: this.attr(),
      userId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      published: this.boolean(true),
      user: this.belongsTo(User, 'userId'),
      comments: this.morphMany(Comment, 'subjectId', 'subjectType')
    };
  }
}


export class Comment extends ORMModel {
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

export class TariffTariffOption extends ORMModel {
  static entity = 'tariffTariffOptions';

  static primaryKey = ['tariffId', 'tariffOptionId'];

  static fields () {
    return {
      tariffId: this.attr(null),
      tariffOptionId: this.attr(null),
    }
  }
}

export class Tariff extends ORMModel {
  static entity = 'tariffs';

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      displayName: this.attr(''),
      tariffType: this.string(''),
      slug: this.attr(''),

      tariffOptions: this.belongsToMany(TariffOption, TariffTariffOption, 'tariffId',
        'tariffOptionId'),
    }
  }
}


export class TariffOption extends ORMModel {
  static entity = 'tariffOptions';

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      description: this.attr(''),

      tariffs: this.belongsToMany(Tariff, TariffTariffOption, 'tariffOptionId', 'tariffId')
    }
  }
}


export async function setupMockData() {
  let store, vuexOrmGraphQL;

  [store, vuexOrmGraphQL] = createStore([
    { model: User },
    { model: Post },
    { model: Video },
    { model: Comment },
    { model: TariffOption },
    { model: Tariff },
    { model: TariffTariffOption }
  ]);

  await User.insert({ data: { id: 1, name: 'Charlie Brown' }});
  await User.insert({ data: { id: 2, name: 'Peppermint Patty' }});
  await Post.insert({ data: { id: 1, otherId: 9, userId: 1, title: 'Example post 1', content: 'Foo' }});
  await Post.insert({ data: { id: 2, otherId: 10, userId: 1, title: 'Example post 2', content: 'Bar' }});
  await Video.insert({ data: { id: 1, otherId: 11, userId: 1, title: 'Example video', content: 'Video' }});
  await Comment.insert({ data: { id: 1, userId: 1, subjectId: 1, subjectType: 'videos', content: 'Example comment 1' }});
  await Comment.insert({ data: { id: 2, userId: 2, subjectId: 1, subjectType: 'posts', content: 'Example comment 2' }});
  await Comment.insert({ data: { id: 3, userId: 2, subjectId: 2, subjectType: 'posts', content: 'Example comment 3' }});

  return [store, vuexOrmGraphQL];
}


export const introspectionResult = {
  "data": {
    "__schema": {
      "__typename": "__Schema",
      "types": [
        {
          "__typename": "__Type",
          "name": "Boolean",
          "description": "Represents `true` or `false` values.",
          "fields": null,
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "String",
          "description": "Represents textual data as UTF-8 character sequences. This type is most often used by GraphQL to represent free-form human-readable text.",
          "fields": null,
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__Type",
          "description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "enumValues",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "LIST"
              }
            },
            {
              "__typename": "__Field",
              "name": "fields",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "LIST"
              }
            },
            {
              "__typename": "__Field",
              "name": "inputFields",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "LIST"
              }
            },
            {
              "__typename": "__Field",
              "name": "interfaces",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "LIST"
              }
            },
            {
              "__typename": "__Field",
              "name": "kind",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "description": null,
              "name": "ofType",
              "type": {
                "__typename": "__Type",
                "name": "__Type",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "possibleTypes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "LIST"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__TypeKind",
          "description": "An enum describing what kind of type a given `__Type` is.",
          "fields": null,
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__Field",
          "description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "args",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "deprecationReason",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "isDeprecated",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "type",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__InputValue",
          "description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "defaultValue",
              "description": "A GraphQL-formatted string representing the default value for this input value.",
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "type",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__EnumValue",
          "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "deprecationReason",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "isDeprecated",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "Query",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "User",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "users",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "UserTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "video",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Video",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "videos",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "VideoTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "post",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Post",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "example",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Post",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "posts",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "PostTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "unpublishedPosts",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "PostTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "comment",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Comment",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "comments",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "CommentTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariff",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Tariff",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariffs",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "TariffTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariffTariff",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "TariffTariff",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariffTariffs",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "TariffTariffTypeConnection",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariffTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "TariffTariffOption",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "tariffTariffOptions",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "TariffTariffOptionTypeConnection",
                "kind": "OBJECT"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "User",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Fields",
              "name": "posts",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "PostFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "PostTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "comments",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "CommentFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "Video",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "title",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "otherId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "comments",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "CommentFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "Post",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "title",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "published",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Boolean",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "otherId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "comments",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "CommentFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "Comment",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "subjectId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "subjectType",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "Tariff",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "displayName",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffType",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "slug",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffOptions",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "TariffOptionFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOptionTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "TariffOption",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffs",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                  },
                  "defaultValue": "null"
                },
                {
                  "__typename": "__InputValue",
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "TariffFilter",
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTypeConnection",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "TariffTariffOption",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "tariffId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffOptionId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "ID",
          "description": "Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"VXNlci0xMA==\"`) or integer (such as `4`) input value will be accepted as an ID.",
          "fields": null,
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "Int",
          "description": "Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
          "fields": null,
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "PageInfo",
          "description": "Information about pagination in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "endCursor",
              "description": "When paginating forwards, the cursor to continue.",
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "hasNextPage",
              "description": "When paginating forwards, are there more items?",
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "hasPreviousPage",
              "description": "When paginating backwards, are there more items?",
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "startCursor",
              "description": "When paginating backwards, the cursor to continue.",
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "UserTypeConnection",
          "description": "The connection type for User.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "UserEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "UserFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "VideoTypeConnection",
          "description": "The connection type for Video.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "VideoEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "VideoFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "PostTypeConnection",
          "description": "The connection type for Post.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "PostEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "PostFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "CommentTypeConnection",
          "description": "The connection type for Comment.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "CommentEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "CommentFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "TariffTariffOptionTypeConnection",
          "description": "The connection type for TariffTariffOption.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "TariffTariffOptionEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffTariffOptionFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "TariffTypeConnection",
          "description": "The connection type for Tariff.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "TariffEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "TariffOptionTypeConnection",
          "description": "The connection type for TariffOption.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "name": "TariffOptionEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
              },
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
              },
            }
          ],
          "inputFields": null,
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffOptionFilter",
          "description": null,
          "fields": null,
          "inputFields": [],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "name": "Mutation",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "createUser",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateUser",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
              },
            },
            {
              "__typename": "__Field",
              "name": "createPost",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
              },
            },
            {
              "__typename": "__Field",
              "name": "deletePost",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
              },
            },
            {
              "__typename": "__Field",
              "name": "updatePost",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
              },
            },
            {
              "__typename": "__Field",
              "name": "upvotePost",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
              },
            },
            {
              "__typename": "__Field",
              "name": "createVideo",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
              },
            },
            {
              "__typename": "__Field",
              "name": "deleteVideo",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateVideo",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
              },
            },
            {
              "__typename": "__Field",
              "name": "createComment",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
              },
            },
            {
              "__typename": "__Field",
              "name": "deleteComment",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateComment",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
              },
            },
            {
              "__typename": "__Field",
              "name": "createTariff",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
              },
            },
            {
              "__typename": "__Field",
              "name": "deleteTariff",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateTariff",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
              },
            },
            {
              "__typename": "__Field",
              "name": "createTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
              },
            },
            {
              "__typename": "__Field",
              "name": "deleteTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
              },
            },
            {
              "__typename": "__Field",
              "name": "createTariffTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
              },
            },
            {
              "__typename": "__Field",
              "name": "deleteTariffTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
              },
            },
            {
              "__typename": "__Field",
              "name": "updateTariffTariffOption",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
              },
            },
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "UserInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "ID",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              },
            },
          ],
        },
        {
          "__typename": "__Type",
          "name": "VideoInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "ID",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "title",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "userId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Int",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "otherId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Int",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "UserInput",
                "kind": "INPUT_OBJECT"
              },
            },
          ],
        },
        {
          "__typename": "__Type",
          "name": "PostInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "ID",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "title",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "userId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Int",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "published",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Boolean",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "otherId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "Int",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "user",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "UserInput",
                "kind": "SCALAR"
              },
            },
          ],
        },
        {
          "__typename": "__Type",
          "name": "CommentInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "ID",
                "kind": "SCALAR"
              },
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
            },
            {
              "__typename": "__InputValue",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
            },
            {
              "__typename": "__InputValue",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
              },
            },
          ],
        },
        {
          "__typename": "__Type",
          "name": "TariffTariffOptionInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "tariffId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
              },
            },
            {
              "__typename": "__InputValue",
              "name": "tariffOptionId",
              "description": null,
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
              },
            },
          ],
        },
        {
          "__typename": "__Type",
          "name": "__Schema",
          "description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "directives",
              "description": "A list of all directives supported by this server.",
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "mutationType",
              "description": "If this server supports mutation, the type that mutation operations will be rooted at.",
              "type": {
                "__typename": "__Type",
                "name": "__Type",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "queryType",
              "description": "The type that query operations will be rooted at.",
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "subscriptionType",
              "description": "If this server support subscription, the type that subscription operations will be rooted at.",
              "type": {
                "__typename": "__Type",
                "name": "__Type",
                "kind": "OBJECT"
              }
            },
            {
              "__typename": "__Field",
              "name": "types",
              "description": "A list of all types supported by this server.",
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__Directive",
          "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "args",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": "String",
                "kind": "SCALAR"
              }
            },
            {
              "__typename": "__Field",
              "name": "locations",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "onField",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "onFragment",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            },
            {
              "__typename": "__Field",
              "name": "onOperation",
              "description": null,
              "type": {
                "__typename": "__Type",
                "name": null,
                "kind": "NON_NULL"
              }
            }
          ],
          "inputFields": null
        },
        {
          "__typename": "__Type",
          "name": "__DirectiveLocation",
          "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
          "fields": null,
          "inputFields": null
        }
      ]
    }
  }
};
