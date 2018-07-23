import Model from 'app/orm/model';
import { setupMockData, User, Video, Post, Comment, TariffTariffOption, Tariff, TariffOption } from 'test/support/mock-data';
import Context from "app/common/context";
import Schema from "app/graphql/schema";
import {introspectionResult} from "../support/mock-data";

let model;
let store;
let vuexOrmGraphQL;
let context;

describe('Model', () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
    context = Context.getInstance();
    await context.loadSchema();
    model = context.getModel('user');
  });

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
        foreignKey: "authorId", localKey: "id", model: User, "related": Post
      });
    });
  });

  describe('.isFiedNumber', () => {
    it('returns true when the field is numeric', () => {
      model = context.getModel('post');
      expect(Model.isFieldNumber(model.fields.get('otherId'))).toEqual(true);
      expect(Model.isFieldNumber(model.fields.get('id'))).toEqual(true);
    });

    it('returns false when the field is not numeric', () => {
      model = context.getModel('post');
      expect(Model.isFieldNumber(model.fields.get('title'))).toEqual(false);
      expect(Model.isFieldNumber(model.fields.get('author'))).toEqual(false);
    });
  });

  describe('.isFieldAttribute', () => {
    it('returns true when the field is a attribute', () => {
      model = context.getModel('post');
      expect(Model.isFieldAttribute(model.fields.get('title'))).toEqual(true);
      expect(Model.isFieldAttribute(model.fields.get('id'))).toEqual(true);
      expect(Model.isFieldAttribute(model.fields.get('authorId'))).toEqual(true);
    });

    it('returns false when the field is a relation', () => {
      model = context.getModel('post');
      expect(Model.isFieldAttribute(model.fields.get('author'))).toEqual(false);
    });
  });

  describe('.augment', () => {
    it('adds $isPersited to the fields', () => {
      // FIXME how to test that?
    });
  });

  describe('.skipField', () => {
    it('returns true for a field which starts with a $', () => {
      const model = context.getModel('post');
      expect(model.skipField('$isPersisted')).toEqual(true);
    });

    it('returns true for a field which is listed within skipFields', () => {
      const model = context.getModel('video');
      expect(model.skipField('ignoreMe')).toEqual(true);
    });

    it('returns true for a field which is the foreignKey of a belongsTo or hasOne relation', () => {
      const model = context.getModel('post');
      expect(model.skipField('authorId')).toEqual(true);
    });

    it('returns false for normal fields', () => {
      const model = context.getModel('post');
      expect(model.skipField('id')).toEqual(false);
      expect(model.skipField('title')).toEqual(false);
    });
  });

  describe('.isTypeFieldOfPolymorphicRelation', () => {
    it('returns true for the type field of a polymorphic relation', () => {
      const model = context.getModel('comment');
      expect(model.isTypeFieldOfPolymorphicRelation('subjectType')).toEqual(true);
    });

    it('returns false for a normal attribute which just ends with `Type`', () => {
      const model = context.getModel('tariff');
      expect(model.isTypeFieldOfPolymorphicRelation('tariffType')).toEqual(false);
    });
  });

  describe('.getRecordWithId', () => {
    it('returns the record with the id of the model type', () => {
      const model = context.getModel('post');
      const expectedRecord = model.baseModel.query().withAllRecursive().where('id', 2).first();
      expect(model.getRecordWithId(2)).toEqual(expectedRecord);
    });
  });

  describe('.shouldEagerLoadRelation', () => {
    it('returns true if field is a belongsTo or hasOne relation', () => {
      const model = context.getModel('post');
      expect(model.shouldEagerLoadRelation('author', model.fields.get('author'), context.getModel('user'))).toEqual(true);

      // TODO test hasOne
    });

    it('returns true if field is in the eagerLoad array', () => {
      const model = context.getModel('post');
      expect(model.shouldEagerLoadRelation('post', model.fields.get('comments'), context.getModel('comment'))).toEqual(true);
    });

    it('returns false if field neither belongsTo/hasOne nor in the eagerLoad array', () => {
      const model = context.getModel('user');
      expect(model.shouldEagerLoadRelation('user', model.fields.get('comments'), context.getModel('comment'))).toEqual(false);
    });
  });
});
