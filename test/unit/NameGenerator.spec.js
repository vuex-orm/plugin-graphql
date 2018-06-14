import NameGenerator from "app/graphql/name-generator";
import Model from 'app/orm/model';
import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data';
import Context from "app/common/context";

let model;
let store;
let vuexOrmGraphQL;
let context;

beforeEach(async () => {
  [store, vuexOrmGraphQL] = await setupMockData();
  context = Context.getInstance();
  model = context.getModel('post');
});

describe('NameGenerator', () => {
  describe('.getNameForPersist', () => {
    it('returns a correct create mutation name', () => {
      expect(NameGenerator.getNameForPersist(model)).toEqual('createPost');
    });
  });

  describe('.getNameForPush', () => {
    it('returns a correct update mutation name', () => {
      expect(NameGenerator.getNameForPush(model)).toEqual('updatePost');
    });
  });

  describe('.getNameForDestroy', () => {
    it('returns a correct delete mutation name', () => {
      expect(NameGenerator.getNameForDestroy(model)).toEqual('deletePost');
    });
  });

  describe('.getNameForFetch', () => {
    it('returns a correct fetch query name', () => {
      expect(NameGenerator.getNameForFetch(model, true)).toEqual('posts');
      expect(NameGenerator.getNameForFetch(model, false)).toEqual('post');
      expect(NameGenerator.getNameForFetch(model)).toEqual('post');
    });
  });
});
