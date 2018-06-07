import Model from 'app/model';
import { createStore } from 'test/support/Helpers';
import { Model as ORMModel } from '@vuex-orm/core';

let model;
let store;
let vuexOrmApollo;

class User extends ORMModel {
  static entity = 'users';

  static fields () {
    return {
      id: this.increment(null),
      name: this.string(null),
      profile: this.hasOne(Profile, 'userId')
    };
  }
}

class Profile extends ORMModel {
  static entity = 'profiles';

  static fields () {
    return {
      id: this.increment(null),
      userId: this.number(null)
    };
  }
}

beforeEach(async () => {
  [store, vuexOrmApollo] = createStore([{ model: User }, { model: Profile }]);
  await Profile.insert({ data: { id: 1, userId: 1 }});
  await User.insert({ data: { id: 1, name: 'Foo Bar', profile: { id: 1 } }});

  model = vuexOrmApollo.context.getModel('user');
});

describe('Model', () => {
  describe('.singularName', () => {
    it('returns the singular name of the entity', () => {
      expect(model.singularName).toEqual('user');
    });
  });

  describe('.pluralName', () => {
    it('returns the plural name of the entity', () => {
      expect(model.pluralName).toEqual('users');
    });
  });

  describe('.baseModel', () => {
    it('returns the Vuex-ORM Model class', () => {
      expect(model.baseModel).toEqual(User);
    });
  });

  describe('.getQueryFields', () => {
    it('returns a list of the models fields', () => {
      expect(model.getQueryFields()).toEqual(['id', 'name']);
    });
  });

  describe('.getRelations', () => {
    it('returns a list of the models relations', () => {
      const relations = model.getRelations();

      expect(relations.has('profile')).toEqual(true);
      expect(relations.get('profile')).toEqual({
        foreignKey: "userId", localKey: "id", model: User, "related": Profile
      });
    });
  });
});
