import Model from 'app/orm/model';
import { setupMockData, User, Video, Post, Comment, ContractContractOption, Contract, ContractOption } from 'test/support/mock-data';

let model;
let store;
let vuexOrmApollo;

beforeEach(async () => {
  [store, vuexOrmApollo] = await setupMockData();
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

      expect(relations.has('posts')).toEqual(true);
      expect(relations.has('comments')).toEqual(true);
      expect(relations.get('posts')).toEqual({
        foreignKey: "userId", localKey: "id", model: User, "related": Post
      });
    });
  });
});
