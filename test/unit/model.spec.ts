import Model from "../../src/orm/model";
import { setupMockData, User, Post } from "../support/mock-data";
import Context from "../../src/common/context";
import { Relation } from "@vuex-orm/core";

let model: Model;
let store;
let vuexOrmGraphQL;
let context: Context;

describe("Model", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
    await context.loadSchema();
    model = context.getModel("user");
  });

  describe(".singularName", () => {
    test("returns the singular name of the entity", () => {
      expect(model.singularName).toEqual("user");
    });
  });

  describe(".pluralName", () => {
    test("returns the plural name of the entity", () => {
      expect(model.pluralName).toEqual("users");
    });
  });

  describe(".baseModel", () => {
    test("returns the Vuex-ORM Model class", () => {
      expect(model.baseModel).toEqual(User);
    });
  });

  describe(".getQueryFields", () => {
    test("returns a list of the models fields", () => {
      expect(model.getQueryFields()).toEqual(["id", "name"]);
    });
  });

  describe(".getRelations", () => {
    test("returns a list of the models relations", () => {
      const relations = model.getRelations();

      expect(relations.has("posts")).toEqual(true);
      expect(relations.has("comments")).toEqual(true);
      expect(relations.get("posts")).toEqual({
        foreignKey: "authorId",
        localKey: "id",
        model: User,
        related: Post
      });
    });
  });

  describe(".isFiedNumber", () => {
    test("returns true when the field is numeric", () => {
      model = context.getModel("post");
      expect(Model.isFieldNumber(model.fields.get("otherId"))).toEqual(true);
      //expect(Model.isFieldNumber(model.fields.get("id"))).toEqual(true);
    });

    test("returns false when the field is not numeric", () => {
      model = context.getModel("post");
      expect(Model.isFieldNumber(model.fields.get("title"))).toEqual(false);
      expect(Model.isFieldNumber(model.fields.get("author"))).toEqual(false);
    });
  });

  describe(".isFieldAttribute", () => {
    test("returns true when the field is a attribute", () => {
      model = context.getModel("post");
      expect(Model.isFieldAttribute(model.fields.get("title")!)).toEqual(true);
      expect(Model.isFieldAttribute(model.fields.get("id")!)).toEqual(true);
      expect(Model.isFieldAttribute(model.fields.get("authorId")!)).toEqual(true);
    });

    test("returns false when the field is a relation", () => {
      model = context.getModel("post");
      expect(Model.isFieldAttribute(model.fields.get("author")!)).toEqual(false);
    });
  });

  describe(".augment", () => {
    test("adds $isPersited to the fields", () => {
      // FIXME how to test that?
    });
  });

  describe(".skipField", () => {
    test("returns true for a field which starts with a $", () => {
      const model = context.getModel("post");
      expect(model.skipField("$isPersisted")).toEqual(true);
    });

    test("returns true for a field which is listed within skipFields", () => {
      const model = context.getModel("video");
      expect(model.skipField("ignoreMe")).toEqual(true);
    });

    test("returns true for a field which is the foreignKey of a belongsTo or hasOne relation", () => {
      const model = context.getModel("post");
      expect(model.skipField("authorId")).toEqual(true);
    });

    test("returns false for normal fields", () => {
      const model = context.getModel("post");
      expect(model.skipField("id")).toEqual(false);
      expect(model.skipField("title")).toEqual(false);
    });
  });

  describe(".isTypeFieldOfPolymorphicRelation", () => {
    test("returns true for the type field of a polymorphic relation", () => {
      const model = context.getModel("comment");
      expect(model.isTypeFieldOfPolymorphicRelation("subjectType")).toEqual(true);
    });

    test("returns false for a normal attribute which just ends with `Type`", () => {
      const model = context.getModel("tariff");
      expect(model.isTypeFieldOfPolymorphicRelation("tariffType")).toEqual(false);
    });
  });

  describe(".getRecordWithId", () => {
    test("returns the record with the id of the model type", () => {
      const model = context.getModel("post");
      const expectedRecord = model.baseModel
        .query()
        .withAllRecursive()
        .where("id", 2)
        .first();
      expect(model.getRecordWithId("2")).toEqual(expectedRecord);
    });
  });

  describe(".shouldEagerLoadRelation", () => {
    test("returns the correct value", () => {
      const user = context.getModel("user");
      const profile = context.getModel("profile");
      const post = context.getModel("post");
      const tariff = context.getModel("tariff");

      expect(
        post.shouldEagerLoadRelation("author", post.fields.get("author")! as Relation, post)
      ).toEqual(true);
      expect(
        post.shouldEagerLoadRelation("comments", post.fields.get("comments")! as Relation, post)
      ).toEqual(true);
      expect(
        post.shouldEagerLoadRelation("tags", post.fields.get("tags")! as Relation, post)
      ).toEqual(true);
      expect(
        profile.shouldEagerLoadRelation("user", profile.fields.get("user")! as Relation, profile)
      ).toEqual(true);
      expect(
        user.shouldEagerLoadRelation("posts", user.fields.get("posts")! as Relation, user)
      ).toEqual(false);
      expect(
        tariff.shouldEagerLoadRelation(
          "tariffOptions",
          tariff.fields.get("tariffOptions")! as Relation,
          tariff
        )
      ).toEqual(true);
    });
  });

  describe(".shouldEagerSaveRelation", () => {
    test("returns the correct value", () => {
      const user = context.getModel("user");
      const profile = context.getModel("profile");
      const post = context.getModel("post");
      const tariff = context.getModel("tariff");

      expect(
        post.shouldEagerSaveRelation("author", post.fields.get("author")! as Relation, post)
      ).toEqual(true);
      expect(
        post.shouldEagerSaveRelation("comments", post.fields.get("comments")! as Relation, post)
      ).toEqual(false);
      expect(
        post.shouldEagerSaveRelation("tags", post.fields.get("tags")! as Relation, post)
      ).toEqual(true);
      expect(
        profile.shouldEagerSaveRelation("user", profile.fields.get("user")! as Relation, profile)
      ).toEqual(true);
      expect(
        user.shouldEagerSaveRelation("posts", user.fields.get("posts")! as Relation, user)
      ).toEqual(false);
      expect(
        tariff.shouldEagerSaveRelation(
          "tariffOptions",
          tariff.fields.get("tariffOptions")! as Relation,
          tariff
        )
      ).toEqual(false);
    });
  });

  describe(".getRelatedModel", () => {
    test("returns the correct related model", () => {
      const user = context.getModel("user");
      const profile = context.getModel("profile");
      const post = context.getModel("post");
      const tariff = context.getModel("tariff");
      const option = context.getModel("tariffOption");
      const category = context.getModel("category");

      expect(Model.getRelatedModel(user.fields.get("profile") as Relation)!.singularName).toEqual(
        "profile"
      );
      expect(Model.getRelatedModel(profile.fields.get("user") as Relation)!.singularName).toEqual(
        "user"
      );
      expect(Model.getRelatedModel(post.fields.get("author") as Relation)!.singularName).toEqual(
        "user"
      );
      expect(Model.getRelatedModel(post.fields.get("comments") as Relation)!.singularName).toEqual(
        "comment"
      );
      expect(Model.getRelatedModel(post.fields.get("tags") as Relation)!.singularName).toEqual(
        "tag"
      );
      expect(
        Model.getRelatedModel(tariff.fields.get("tariffOptions") as Relation)!.singularName
      ).toEqual("tariffOption");
      expect(Model.getRelatedModel(option.fields.get("tariffs") as Relation)!.singularName).toEqual(
        "tariff"
      );
      expect(
        Model.getRelatedModel(category.fields.get("parent") as Relation)!.singularName
      ).toEqual("category");
      expect(
        Model.getRelatedModel(category.fields.get("parent") as Relation)!.singularName
      ).toEqual("category");
    });
  });
});
