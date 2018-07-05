import {Model as ORMModel} from "@vuex-orm/core";
import {createStore} from "./helpers";
import mockServer from "./mock-schema"
import { buildClientSchema } from 'graphql';

export class User extends ORMModel {
  static entity = 'users';

  static fields () {
    return {
      id: this.increment(0),
      name: this.string(''),
      profileId: this.number(0),
      posts: this.hasMany(Post, 'userId'),
      comments: this.hasMany(Comment, 'userId'),
      profile: this.belongsTo(Profile, 'profileId')
    };
  }
}

export class Profile extends ORMModel {
  static entity = 'profiles';

  static fields () {
    return {
      id: this.increment(0),
      email: this.string(''),
      age: this.number(0),
      sex: this.boolean(true),
      user: this.hasOne(User, 'profileId')
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
      title: this.string(''),
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
      tariffId: this.number(0),
      tariffOptionId: this.number(0),
    }
  }
}

export class Tariff extends ORMModel {
  static entity = 'tariffs';
  static eagerLoad = ['tariffOptions'];

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      displayName: this.string(''),
      tariffType: this.string(''),
      slug: this.string(''),

      tariffOptions: this.belongsToMany(TariffOption, TariffTariffOption, 'tariffId',
        'tariffOptionId'),
    }
  }
}


export class TariffOption extends ORMModel {
  static entity = 'tariffOptions';
  static eagerLoad = ['tariffs'];

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      description: this.string(''),

      tariffs: this.belongsToMany(Tariff, TariffTariffOption, 'tariffOptionId', 'tariffId')
    }
  }
}


export async function setupMockData() {
  let store, vuexOrmGraphQL;

  [store, vuexOrmGraphQL] = createStore([
    { model: User },
    { model: Profile },
    { model: Post },
    { model: Video },
    { model: Comment },
    { model: TariffOption },
    { model: Tariff },
    { model: TariffTariffOption }
  ]);

  /*await Profile.insert({ data: { id: 1, age: 8, sex: true, email: 'charly@peanuts.com' }});
  await Profile.insert({ data: { id: 2, age: 9, sex: false, email: 'pepper@peanuts.com' }});

  await User.insert({ data: { id: 1, name: 'Charlie Brown', profileId: 1 }});
  await User.insert({ data: { id: 2, name: 'Peppermint Patty', profileId: 2 }});

  await Post.insert({ data: { id: 1, otherId: 9, userId: 1, title: 'Example post 1', content: 'Foo' }});
  await Post.insert({ data: { id: 2, otherId: 10, userId: 1, title: 'Example post 2', content: 'Bar' }});
  await Video.insert({ data: { id: 1, otherId: 11, userId: 1, title: 'Example video', content: 'Video' }});
  await Comment.insert({ data: { id: 1, userId: 1, subjectId: 1, subjectType: 'videos', content: 'Example comment 1' }});
  await Comment.insert({ data: { id: 2, userId: 2, subjectId: 1, subjectType: 'posts', content: 'Example comment 2' }});
  await Comment.insert({ data: { id: 3, userId: 2, subjectId: 2, subjectType: 'posts', content: 'Example comment 3' }});*/

  return [store, vuexOrmGraphQL];
}
