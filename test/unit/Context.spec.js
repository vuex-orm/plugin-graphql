import Model from 'app/orm/model';
import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data';
import Context from "app/common/context";

let store;
let vuexOrmGraphQL;
let context;

beforeEach(async () => {
  [store, vuexOrmGraphQL] = await setupMockData();
  context = Context.getInstance();
});

describe('Context', () => {
  describe('.debugMode', () => {
    it('to be false', () => {
      expect(context.debugMode).toEqual(false)
    });
  });

  describe('.getModel', () => {
    it('returns a model', () => {
      expect(context.getModel('post')).toEqual(context.models.get('post'))
    });
  });
});
