import Model from 'app/model';
import { createStore } from 'test/support/Helpers';
import { Model as ORMModel } from '@vuex-orm/core';

let model;

class User extends ORMModel {
  static entity = 'users';

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
      profile: this.hasOne(Profile, 'user_id')
    };
  }
}

class Profile extends ORMModel {
  static entity = 'profiles';

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null)
    };
  }
}

beforeEach(() => {
  const store = createStore([{ model: User }, { model: Profile }]);
  store.dispatch('entities/profiles/insert', { data: { id: 1, user_id: 1 }});
  store.dispatch('entities/users/insert', { data: { id: 1, name: 'Foo Bar', profile: { id: 1 } }});

  model = new Model(User);
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
        connection: "entities", foreignKey: "user_id", localKey: "id", record: null, related: Profile
      });
    });
  });
});
