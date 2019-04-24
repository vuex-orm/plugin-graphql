import DefaultAdapter from "../../../../src/adapters/builtin/default-adapter";
import { setupMockData } from "../../../support/mock-data";
import Context from "../../../../src/common/context";
import Model from "../../../../src/orm/model";
import { ConnectionMode } from "../../../../src/adapters/adapter";

let model: Model;
let store;
let vuexOrmGraphQL;
let context;

describe("DefaultAdapter", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData(null, new DefaultAdapter());
    context = Context.getInstance();
    await context.loadSchema();
    model = context.getModel("post");
  });

  describe(".getNameForPersist", () => {
    test("returns a correct create mutation name", () => {
      expect(Context.getInstance().adapter.getNameForPersist(model)).toEqual("createPost");
    });
  });

  describe(".getNameForPush", () => {
    test("returns a correct update mutation name", () => {
      expect(Context.getInstance().adapter.getNameForPush(model)).toEqual("updatePost");
    });
  });

  describe(".getNameForDestroy", () => {
    test("returns a correct delete mutation name", () => {
      expect(Context.getInstance().adapter.getNameForDestroy(model)).toEqual("deletePost");
    });
  });

  describe(".getNameForFetch", () => {
    test("returns a correct fetch query name", () => {
      expect(Context.getInstance().adapter.getNameForFetch(model, true)).toEqual("posts");
      expect(Context.getInstance().adapter.getNameForFetch(model, false)).toEqual("post");
    });
  });

  describe(".getFilterTypeName", () => {
    test("returns a correct filter type name", () => {
      expect(Context.getInstance().adapter.getFilterTypeName(model)).toEqual("PostFilterType");
    });
  });

  describe(".getConnectionMode", () => {
    test("returns a correct connection mode", () => {
      expect(Context.getInstance().adapter.getConnectionMode()).toEqual(ConnectionMode.NODES);
    });
  });
});
