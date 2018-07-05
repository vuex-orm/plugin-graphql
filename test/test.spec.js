import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data'
import Context from "app/common/context";

let store;
let vuexOrmGraphQL;

describe('VuexORMGraphQL', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  it('fetches the schema on the first action', async () => {
    await Post.fetch(42);

    const context = Context.getInstance();
    expect(!!context.schema).not.toEqual(false);
    expect(context.schema.getType('Post').name).toEqual('Post');
    expect(context.schema.getQuery('post').name).toEqual('post');
    //expect(context.schema.getMutation('createPost').name).toEqual('createPost');
  });
});
