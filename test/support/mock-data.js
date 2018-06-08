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

export class ContractContractOption extends ORMModel {
  static entity = 'contractContractOptions';

  static primaryKey = ['contractId', 'contractOptionId'];

  static fields () {
    return {
      contractId: this.attr(null),
      contractOptionId: this.attr(null),
    }
  }
}

export class Contract extends ORMModel {
  static entity = 'contracts';

  static fields () {
    return {
      id: this.increment(),
      name: this.attr(''),
      displayName: this.attr(''),
      contractType: this.string(''),
      slug: this.attr(''),

      contractOptions: this.belongsToMany(ContractOption, ContractContractOption, 'contractId',
        'contractOptionId'),
    }
  }
}


export class ContractOption extends ORMModel {
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


export async function setupMockData() {
  let store, vuexOrmApollo;

  [store, vuexOrmApollo] = createStore([
    { model: User },
    { model: Post },
    { model: Video },
    { model: Comment },
    { model: ContractOption },
    { model: Contract },
    { model: ContractContractOption }
  ]);

  await User.insert({ data: { id: 1, name: 'Charlie Brown' }});
  await User.insert({ data: { id: 2, name: 'Peppermint Patty' }});
  await Post.insert({ data: { id: 1, otherId: 9, userId: 1, title: 'Example post 1', content: 'Foo' }});
  await Post.insert({ data: { id: 2, otherId: 10, userId: 1, title: 'Example post 2', content: 'Bar' }});
  await Video.insert({ data: { id: 1, otherId: 11, userId: 1, title: 'Example video', content: 'Video' }});
  await Comment.insert({ data: { id: 1, userId: 1, subjectId: 1, subjectType: 'videos', content: 'Example comment 1' }});
  await Comment.insert({ data: { id: 2, userId: 2, subjectId: 1, subjectType: 'posts', content: 'Example comment 2' }});
  await Comment.insert({ data: { id: 3, userId: 2, subjectId: 2, subjectType: 'posts', content: 'Example comment 3' }});

  return [store, vuexOrmApollo];
}
