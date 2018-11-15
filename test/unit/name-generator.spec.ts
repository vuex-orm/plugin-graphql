import NameGenerator from "../../src/graphql/name-generator";
import {
  setupMockData,
  User,
  Video,
  Post,
  Comment,
  TariffTariffOption,
  Tariff,
  TariffOption
} from "../support/mock-data";
import Context from "../../src/common/context";
import Model from "../../src/orm/model";

let model: Model;
let store;
let vuexOrmGraphQL;
let context;

describe("NameGenerator", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
    await context.loadSchema();
    model = context.getModel("post");
  });

  describe(".getNameForPersist", () => {
    test("returns a correct create mutation name", () => {
      expect(NameGenerator.getNameForPersist(model)).toEqual("createPost");
    });
  });

  describe(".getNameForPush", () => {
    test("returns a correct update mutation name", () => {
      expect(NameGenerator.getNameForPush(model)).toEqual("updatePost");
    });
  });

  describe(".getNameForDestroy", () => {
    test("returns a correct delete mutation name", () => {
      expect(NameGenerator.getNameForDestroy(model)).toEqual("deletePost");
    });
  });

  describe(".getNameForFetch", () => {
    test("returns a correct fetch query name", () => {
      expect(NameGenerator.getNameForFetch(model, true)).toEqual("posts");
      expect(NameGenerator.getNameForFetch(model, false)).toEqual("post");
      expect(NameGenerator.getNameForFetch(model)).toEqual("post");
    });
  });
});
