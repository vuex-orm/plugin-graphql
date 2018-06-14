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
  static skipFields = ['ignoreMe'];

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
      "queryType": {
        "name": "Query",
        "__typename": "__Type"
      },
      "mutationType": {
        "name": "Mutation",
        "__typename": "__Type"
      },
      "subscriptionType": null,
      "types": [
        {
          "kind": "SCALAR",
          "name": "Boolean",
          "description": "Represents `true` or `false` values.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null,
          "__typename": "__Type",
        },
        {
          "kind": "SCALAR",
          "name": "String",
          "description": "Represents textual data as UTF-8 character sequences. This type is most often used by GraphQL to represent free-form human-readable text.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null,
          "__typename": "__Type",
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__Type",
          "description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "enumValues",
              "description": null,
              "args": [
                {
                  "__typename": "__Field",
                  "name": "includeDeprecated",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  },
                  "defaultValue": "false"
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "OBJECT",
                    "name": "__EnumValue",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "fields",
              "description": null,
              "args": [
                {
                  "__typename": "__Field",
                  "name": "includeDeprecated",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  },
                  "defaultValue": "false"
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "OBJECT",
                    "name": "__Field",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "inputFields",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "OBJECT",
                    "name": "__InputValue",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "interfaces",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "OBJECT",
                    "name": "__Type",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "kind",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "ENUM",
                  "name": "__TypeKind",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "ofType",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "possibleTypes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "OBJECT",
                    "name": "__Type",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "ENUM",
          "name": "__TypeKind",
          "description": "An enum describing what kind of type a given `__Type` is.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": [
            {
              "__typename": "__EnumValue",
              "name": "SCALAR",
              "description": "Indicates this type is a scalar.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "OBJECT",
              "description": "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INTERFACE",
              "description": "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "UNION",
              "description": "Indicates this type is a union. `possibleTypes` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "ENUM",
              "description": "Indicates this type is an enum. `enumValues` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INPUT_OBJECT",
              "description": "Indicates this type is an input object. `inputFields` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "LIST",
              "description": "Indicates this type is a list. `ofType` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "NON_NULL",
              "description": "Indicates this type is a non-null. `ofType` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__Field",
          "description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "args",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "OBJECT",
                      "name": "__InputValue",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deprecationReason",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "isDeprecated",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "type",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__InputValue",
          "description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "defaultValue",
              "description": "A GraphQL-formatted string representing the default value for this input value.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "type",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__EnumValue",
          "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "deprecationReason",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "isDeprecated",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "Query",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "users",
              "description": null,
              "args": [
                {
                  "name": "first",
                  "description": "Returns the first _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {                  "__typename": "__InputValue",
                  "name": "after",
                  "description": "Returns the elements in the list that come after the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {
                  "name": "last",
                  "description": "Returns the last _n_ elements from the list.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {
                  "name": "before",
                  "description": "Returns the elements in the list that come before the specified global ID.",
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {
                  "name": "orderBy",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": "null"
                },
                {
                  "name": "page",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  },
                  "defaultValue": "null"
                },
                {
                  "name": "perPage",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  },
                  "defaultValue": "null"
                },
                {
                  "name": "filter",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "INPUT_OBJECT",
                    "name": "UserFilter",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "UserTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "video",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "videos",
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "name": "VideoFilter",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "VideoTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "post",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "PostTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "comment",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariff",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOptionTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffTariffOptions",
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "name": "TariffTariffOptionFilter",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOptionTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },

            // FIXME hier fehlen noch die tariff sachen!!
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "User",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "PostTypeConnection",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "Video",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "title",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "otherId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "Post",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "title",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "published",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "otherId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "CommentTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "Comment",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "subjectId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "subjectType",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "Tariff",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "displayName",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffType",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "slug",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOptionTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "TariffOption",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
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
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTypeConnection",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "TariffTariffOption",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "tariffId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "tariffOptionId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "SCALAR",
          "name": "ID",
          "description": "Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"VXNlci0xMA==\"`) or integer (such as `4`) input value will be accepted as an ID.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "SCALAR",
          "name": "Int",
          "description": "Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "PageInfo",
          "description": "Information about pagination in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "endCursor",
              "description": "When paginating forwards, the cursor to continue.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "hasNextPage",
              "description": "When paginating forwards, are there more items?",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "hasPreviousPage",
              "description": "When paginating backwards, are there more items?",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "startCursor",
              "description": "When paginating backwards, the cursor to continue.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "UserTypeConnection",
          "description": "The connection type for User.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "UserEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "UserEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "VideoTypeConnection",
          "description": "The connection type for Video.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "VideoEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "Video",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "VideoEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "PostTypeConnection",
          "description": "The connection type for Post.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PostEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "Post",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "PostEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "CommentTypeConnection",
          "description": "The connection type for Comment.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "CommentEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "Comment",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "CommentEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "TariffTariffOptionTypeConnection",
          "description": "The connection type for TariffTariffOption.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "TariffTariffOptionEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "TariffTariffOption",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "TariffTariffOptionEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "TariffTypeConnection",
          "description": "The connection type for Tariff.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "TariffEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "Tariff",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "TariffEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "TariffOptionTypeConnection",
          "description": "The connection type for TariffOption.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "count",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "edges",
              "description": "A list of edges.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "TariffOptionEdge",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "nodes",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "TariffOption",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "pageInfo",
              "description": "Information to aid in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "PageInfo",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "totalCount",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "TariffOptionEdge",
          "description": "An edge in a connection.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "cursor",
              "description": "A cursor for use in pagination.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "node",
              "description": "The item at the end of the edge.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
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
          "kind": "OBJECT",
          "name": "Mutation",
          "description": null,
          "fields": [
            {
              "__typename": "__Field",
              "name": "createUser",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "user",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "UserInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateUser",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "user",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "UserInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createPost",
              "description": null,
              "args": [
                {
                  "name": "post",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "PostInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deletePost",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updatePost",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "post",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "PostInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Post",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createVideo",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "video",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "VideoInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deleteVideo",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateVideo",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "video",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "VideoInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Video",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createComment",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "comment",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "CommentInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deleteComment",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateComment",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "comment",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "CommentInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Comment",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createTariff",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "tariff",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deleteTariff",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateTariff",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "tariff",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "Tariff",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "tariffOption",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffOptionInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deleteTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "tariffOption",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffOptionInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "createTariffTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "tariffTariffOption",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffTariffOptionInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "deleteTariffTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "updateTariffTariffOption",
              "description": null,
              "args": [
                {
                  "__typename": "__InputValue",
                  "name": "id",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "SCALAR",
                      "name": "ID",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "__typename": "__InputValue",
                  "name": "tariffTariffOption",
                  "description": null,
                  "type": {
                "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "INPUT_OBJECT",
                      "name": "TariffTariffOptionInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "TariffTariffOption",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "UserInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "VideoInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "title",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "otherId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "INPUT_OBJECT",
                "name": "UserInput",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "PostInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "title",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "published",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "otherId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "INPUT_OBJECT",
                "name": "UserInput",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "CommentInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "content",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "userId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "subjectId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "subjectType",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "INPUT_OBJECT",
                "name": "UserInput",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "__typename": "__InputValue",
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "displayName",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "tariffType",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__InputValue",
              "name": "slug",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffOptionInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {              "__typename": "__InputValue",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "INPUT_OBJECT",
          "name": "TariffTariffOptionInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "name": "tariffId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {              "__typename": "__InputValue",
              "name": "tariffOptionId",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__Schema",
          "description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "directives",
              "description": "A list of all directives supported by this server.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "OBJECT",
                      "name": "__Directive",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "mutationType",
              "description": "If this server supports mutation, the type that mutation operations will be rooted at.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "queryType",
              "description": "The type that query operations will be rooted at.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "subscriptionType",
              "description": "If this server support subscription, the type that subscription operations will be rooted at.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "types",
              "description": "A list of all types supported by this server.",
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "OBJECT",
                      "name": "__Type",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "OBJECT",
          "name": "__Directive",
          "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
          "fields": [
            {
              "__typename": "__Field",
              "name": "args",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "OBJECT",
                      "name": "__InputValue",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "locations",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "__typename": "__Type",
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "__typename": "__Type",
                      "kind": "ENUM",
                      "name": "__DirectiveLocation",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__Field",
              "name": "onField",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": true,
              "deprecationReason": "Use `locations`."
            },
            {
              "__typename": "__Field",
              "name": "onFragment",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": true,
              "deprecationReason": "Use `locations`."
            },
            {
              "__typename": "__Field",
              "name": "onOperation",
              "description": null,
              "args": [],
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": true,
              "deprecationReason": "Use `locations`."
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "__typename": "__Type",
          "kind": "ENUM",
          "name": "__DirectiveLocation",
          "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": [
            {
              "__typename": "__EnumValue",
              "name": "QUERY",
              "description": "Location adjacent to a query operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "MUTATION",
              "description": "Location adjacent to a mutation operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "SUBSCRIPTION",
              "description": "Location adjacent to a subscription operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "FIELD",
              "description": "Location adjacent to a field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "FRAGMENT_DEFINITION",
              "description": "Location adjacent to a fragment definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "FRAGMENT_SPREAD",
              "description": "Location adjacent to a fragment spread.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INLINE_FRAGMENT",
              "description": "Location adjacent to an inline fragment.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "SCHEMA",
              "description": "Location adjacent to a schema definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "SCALAR",
              "description": "Location adjacent to a scalar definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "OBJECT",
              "description": "Location adjacent to an object type definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "FIELD_DEFINITION",
              "description": "Location adjacent to a field definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "ARGUMENT_DEFINITION",
              "description": "Location adjacent to an argument definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INTERFACE",
              "description": "Location adjacent to an interface definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "UNION",
              "description": "Location adjacent to a union definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "ENUM",
              "description": "Location adjacent to an enum definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "ENUM_VALUE",
              "description": "Location adjacent to an enum value definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INPUT_OBJECT",
              "description": "Location adjacent to an input object type definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "__typename": "__EnumValue",
              "name": "INPUT_FIELD_DEFINITION",
              "description": "Location adjacent to an input object field definition.",
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "possibleTypes": null
        }
      ],
      "directives": [
        {
          "__typename": "__Directive",
          "name": "include",
          "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
          "locations": [
            "FIELD",
            "FRAGMENT_SPREAD",
            "INLINE_FRAGMENT"
          ],
          "args": [
            {
              "__typename": "__InputValue",
              "name": "if",
              "description": "Included when true.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "defaultValue": null
            }
          ]
        },
        {
          "__typename": "__Directive",
          "name": "skip",
          "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
          "locations": [
            "FIELD",
            "FRAGMENT_SPREAD",
            "INLINE_FRAGMENT"
          ],
          "args": [
            {
              "__typename": "__InputValue",
              "name": "if",
              "description": "Skipped when true.",
              "type": {
                "__typename": "__Type",
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "__typename": "__Type",
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "defaultValue": null
            }
          ]
        },
        {
          "__typename": "__Directive",
          "name": "deprecated",
          "description": "Marks an element of a GraphQL schema as no longer supported.",
          "locations": [
            "FIELD_DEFINITION",
            "ENUM_VALUE"
          ],
          "args": [
            {
              "__typename": "__InputValue",
              "name": "reason",
              "description": "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/).",
              "type": {
                "__typename": "__Type",
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "defaultValue": "\"No longer supported\""
            }
          ]
        }
      ]
    }
  }
};
