import { Model as ORMModel, Attribute } from "@vuex-orm/core";
import { createStore } from "./helpers";
import { setupTestUtils } from "../../src/test-utils";
import VuexORMGraphQLPlugin from "../../src";
import Adapter from "../../src/adapters/adapter";
import TestAdapter from "./test-adapter";

export interface Fields {
  [key: string]: Attribute;
}

export class User extends ORMModel {
  static entity = "users";

  static fields(): Fields {
    return {
      id: this.increment(),
      name: this.string(""),
      posts: this.hasMany(Post, "authorId"),
      comments: this.hasMany(Comment, "authorId"),

      // In the schema we don't have the profileId field to test if the plugin can handle this by
      // reading the id directly from the associated record.
      profileId: this.number(0),
      profile: this.belongsTo(Profile, "profileId")
    };
  }
}

export class Profile extends ORMModel {
  static entity = "profiles";

  static fields(): Fields {
    return {
      id: this.increment(),
      email: this.string(""),
      age: this.number(0),
      sex: this.boolean(true),
      user: this.hasOne(User, "profileId")
    };
  }
}

export class Video extends ORMModel {
  static entity = "videos";
  static eagerLoad = ["comments", "tags"];

  static fields(): Fields {
    return {
      id: this.increment(),
      content: this.string(""),
      title: this.string(""),
      authorId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      ignoreMe: this.string(""),
      author: this.belongsTo(User, "authorId"),
      comments: this.morphMany(Comment, "subjectId", "subjectType"),
      tags: this.morphToMany(Tag, Taggable, "tagId", "subjectId", "subjectType")
    };
  }
}

export class Post extends ORMModel {
  static entity = "posts";
  static eagerLoad = ["comments", "tags"];

  static fields(): Fields {
    return {
      id: this.increment(),
      content: this.string(""),
      title: this.string(""),
      authorId: this.number(0),
      otherId: this.number(0), // This is a field which ends with `Id` but doesn't belong to any relation
      published: this.boolean(true),
      author: this.belongsTo(User, "authorId"),
      comments: this.morphMany(Comment, "subjectId", "subjectType"),
      tags: this.morphToMany(Tag, Taggable, "tagId", "subjectId", "subjectType")
    };
  }
}

export class Comment extends ORMModel {
  static entity = "comments";

  static fields(): Fields {
    return {
      id: this.increment(),
      content: this.string(""),
      authorId: this.number(0),
      author: this.belongsTo(User, "authorId"),

      subjectId: this.number(0),
      subjectType: this.string("")
    };
  }
}

export class TariffTariffOption extends ORMModel {
  static entity = "tariffTariffOptions";

  static primaryKey = ["tariffId", "tariffOptionId"];

  static fields(): Fields {
    return {
      tariffId: this.number(0),
      tariffOptionId: this.number(0)
    };
  }
}

export class Tariff extends ORMModel {
  static entity = "tariffs";
  static eagerLoad = ["tariffOptions"];

  static fields(): Fields {
    return {
      id: this.increment(),
      name: this.string(""),
      displayName: this.string(""),
      tariffType: this.string(""),
      slug: this.string(""),

      tariffOptions: this.belongsToMany(
        TariffOption,
        TariffTariffOption,
        "tariffId",
        "tariffOptionId"
      )
    };
  }
}

export class TariffOption extends ORMModel {
  static entity = "tariffOptions";
  static eagerLoad = ["tariffs"];

  static fields(): Fields {
    return {
      id: this.increment(),
      name: this.string(""),
      description: this.string(""),

      tariffs: this.belongsToMany(Tariff, TariffTariffOption, "tariffOptionId", "tariffId")
    };
  }
}

export class Category extends ORMModel {
  static entity = "categories";

  static fields(): Fields {
    return {
      id: this.increment(),
      name: this.string(""),

      parentId: this.number(0),
      parent: this.belongsTo(Category, "parentId")
    };
  }
}

export class Taggable extends ORMModel {
  static entity = "taggables";

  static fields(): Fields {
    return {
      id: this.increment(),
      tagId: this.number(0),
      subjectId: this.number(0),
      subjectType: this.string("")
    };
  }
}

export class Tag extends ORMModel {
  static entity = "tags";

  static fields(): Fields {
    return {
      id: this.increment(),
      name: this.string("")
    };
  }
}

export async function setupMockData(headers?: any, adapter?: Adapter) {
  let store;
  let vuexOrmGraphQL;

  if (!adapter) adapter = new TestAdapter();

  [store, vuexOrmGraphQL] = createStore(
    [
      { model: User },
      { model: Profile },
      { model: Post },
      { model: Video },
      { model: Comment },
      { model: TariffOption },
      { model: Tariff },
      { model: TariffTariffOption },
      { model: Category },
      { model: Taggable },
      { model: Tag }
    ],
    headers,
    adapter
  );

  setupTestUtils(VuexORMGraphQLPlugin);

  return [store, vuexOrmGraphQL];
}
