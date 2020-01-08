import { Model as ORMModel, Relation } from "@vuex-orm/core";
import { Field, PatchedModel } from "../support/interfaces";
import Context from "../common/context";
import { Mock, MockOptions } from "../test-utils";
import { pluralize, singularize, pick, isEqual } from "../support/utils";

/**
 * Wrapper around a Vuex-ORM model with some useful methods.
 *
 * Also provides a mock system, to define mocking responses for actions.
 */
export default class Model {
  /**
   * The singular name of a model like `blogPost`
   * @type {string}
   */
  public readonly singularName: string;

  /**
   * The plural name of a model like `blogPosts`
   * @type {string}
   */
  public readonly pluralName: string;

  /**
   * The original Vuex-ORM model
   */
  public readonly baseModel: typeof PatchedModel;

  /**
   * The fields of the model
   * @type {Map<string, Field>}
   */
  public readonly fields: Map<string, Field> = new Map<string, Field>();

  /**
   * Container for the mocks.
   * @type {Object}
   */
  private mocks: { [key: string]: Array<Mock> } = {};

  /**
   * @constructor
   * @param {Model} baseModel The original Vuex-ORM model
   */
  public constructor(baseModel: typeof ORMModel) {
    this.baseModel = baseModel as typeof PatchedModel;

    // Generate name variants
    this.singularName = singularize(this.baseModel.entity);
    this.pluralName = pluralize(this.baseModel.entity);

    // Cache the fields of the model in this.fields
    const fields = this.baseModel.fields();
    Object.keys(fields).forEach((name: string) => {
      this.fields.set(name, fields[name] as Field);
    });
  }

  /**
   * Tells if a field is a numeric field.
   *
   * @param {Field | undefined} field
   * @returns {boolean}
   */
  public static isFieldNumber(field: Field | undefined): boolean {
    if (!field) return false;

    const context = Context.getInstance();
    return field instanceof context.components.Number;
  }

  /**
   * Tells if a field is a attribute (and thus not a relation)
   * @param {Field} field
   * @returns {boolean}
   */
  public static isFieldAttribute(field: Field): boolean {
    const context = Context.getInstance();

    return (
      field instanceof context.components.Attr ||
      field instanceof context.components.String ||
      field instanceof context.components.Number ||
      field instanceof context.components.Boolean
    );
  }

  /**
   * Tells if a field which represents a relation is a connection (multiple).
   * @param {Field} field
   * @returns {boolean}
   */
  public static isConnection(field: Field): boolean {
    const context = Context.getInstance();

    return !(
      field instanceof context.components.BelongsTo ||
      field instanceof context.components.HasOne ||
      field instanceof context.components.MorphTo ||
      field instanceof context.components.MorphOne
    );
  }

  /**
   * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
   * @todo is this a good way to add fields?
   * @param {Model} model
   */
  public static augment(model: Model) {
    const originalFieldGenerator = model.baseModel.fields.bind(model.baseModel);

    model.baseModel.fields = () => {
      const originalFields = originalFieldGenerator();

      originalFields["$isPersisted"] = model.baseModel.boolean(false);

      return originalFields;
    };
  }

  /**
   * Returns the related model for a relation.
   * @param {Field|undefined} relation Relation field.
   * @returns {Model|null}
   */
  public static getRelatedModel(relation?: Relation) {
    if (relation === undefined) return null;

    const context: Context = Context.getInstance();

    if (
      relation instanceof context.components.BelongsToMany ||
      relation instanceof context.components.HasMany ||
      relation instanceof context.components.HasManyThrough ||
      relation instanceof context.components.MorphedByMany ||
      relation instanceof context.components.MorphMany ||
      relation instanceof context.components.MorphOne ||
      relation instanceof context.components.MorphToMany ||
      relation instanceof context.components.HasOne
    ) {
      return context.getModel(relation.related.entity, true);
    } else if (
      relation instanceof context.components.BelongsTo ||
      relation instanceof context.components.HasManyBy
    ) {
      return context.getModel(relation.parent.entity, true);
    } else if (relation instanceof context.components.MorphTo) {
      return context.getModel(relation.type, true);
    } else {
      console.warn("Failed relation", typeof relation, relation);
      throw new Error(`Can't find related model for relation of type ${typeof relation}!`);
    }
  }

  /**
   * Returns all fields which should be included in a graphql query: All attributes which are not included in the
   * skipFields array or start with $.
   * @returns {Array<string>} field names which should be queried
   */
  public getQueryFields(): Array<string> {
    const fields: Array<string> = [];

    this.fields.forEach((field: Field, name: string) => {
      if (Model.isFieldAttribute(field) && !this.skipField(name)) {
        fields.push(name);
      }
    });

    return fields;
  }

  /**
   * Tells if a field should be ignored. This is true for fields that start with a `$` or is it is within the skipField
   * property or is the foreignKey of a belongsTo/hasOne relation.
   *
   * @param {string} field
   * @returns {boolean}
   */
  public skipField(field: string) {
    if (field.startsWith("$")) return true;
    if (this.baseModel.skipFields && this.baseModel.skipFields.indexOf(field) >= 0) return true;

    const context = Context.getInstance();

    let shouldSkipField: boolean = false;

    this.getRelations().forEach((relation: Relation) => {
      if (
        (relation instanceof context.components.BelongsTo ||
          relation instanceof context.components.HasOne) &&
        relation.foreignKey === field
      ) {
        shouldSkipField = true;
        return false;
      }
      return true;
    });

    return shouldSkipField;
  }

  /**
   * @returns {Map<string, Relation>} all relations of the model.
   */
  public getRelations(): Map<string, Relation> {
    const relations = new Map<string, Relation>();

    this.fields.forEach((field: Field, name: string) => {
      if (!Model.isFieldAttribute(field)) {
        relations.set(name, field as Relation);
      }
    });

    return relations;
  }

  /**
   * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
   * of a polymorphic relation.
   * @param {string} name
   * @returns {boolean}
   */
  public isTypeFieldOfPolymorphicRelation(name: string): boolean {
    const context = Context.getInstance();
    let found: boolean = false;

    context.models.forEach(model => {
      if (found) return false;

      model.getRelations().forEach(relation => {
        if (
          relation instanceof context.components.MorphMany ||
          relation instanceof context.components.MorphedByMany ||
          relation instanceof context.components.MorphOne ||
          relation instanceof context.components.MorphTo ||
          relation instanceof context.components.MorphToMany
        ) {
          const related = (relation as Field).related;

          if (relation.type === name && related && related.entity === this.baseModel.entity) {
            found = true;
            return false; // break
          }
        }

        return true;
      });

      return true;
    });

    return found;
  }

  /**
   * Returns a record of this model with the given ID.
   * @param {number} id
   * @returns {any}
   */
  public getRecordWithId(id: number) {
    return this.baseModel
      .query()
      .withAllRecursive()
      .where("id", id)
      .first();
  }

  /**
   * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo,
   * hasOne and morphOne related entities are always eager loaded. Others can be added to the `eagerLoad` array
   * or `eagerSync` of the model.
   *
   * @param {string} fieldName Name of the field
   * @param {Relation} relation Relation field
   * @param {Model} relatedModel Related model
   * @returns {boolean}
   */
  public shouldEagerLoadRelation(
    fieldName: string,
    relation: Relation,
    relatedModel: Model
  ): boolean {
    const context = Context.getInstance();

    // HasOne, BelongsTo and MorphOne are always eager loaded
    if (
      relation instanceof context.components.HasOne ||
      relation instanceof context.components.BelongsTo ||
      relation instanceof context.components.MorphOne
    ) {
      return true;
    }

    // Create a list of all relations that have to be eager loaded
    const eagerLoadList: Array<String> = this.baseModel.eagerLoad || [];
    Array.prototype.push.apply(eagerLoadList, this.baseModel.eagerSync || []);

    // Check if the name of the related model or the fieldName is included in the eagerLoadList.
    return (
      eagerLoadList.find(n => {
        return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
      }) !== undefined
    );
  }

  /**
   * Determines if we should eager save (means: add as a field in the graphql mutation) a related entity. belongsTo
   * related entities are always eager saved. Others can be added to the `eagerSave` or `eagerSync` array of the model.
   *
   * @param {string} fieldName Name of the field
   * @param {Relation} relation Relation field
   * @param {Model} relatedModel Related model
   * @returns {boolean}
   */
  public shouldEagerSaveRelation(
    fieldName: string,
    relation: Relation,
    relatedModel: Model
  ): boolean {
    const context = Context.getInstance();

    // BelongsTo is always eager saved
    if (relation instanceof context.components.BelongsTo) {
      return true;
    }

    // Create a list of all relations that have to be eager saved
    const eagerSaveList: Array<String> = this.baseModel.eagerSave || [];
    Array.prototype.push.apply(eagerSaveList, this.baseModel.eagerSync || []);

    // Check if the name of the related model or the fieldName is included in the eagerSaveList.
    return (
      eagerSaveList.find(n => {
        return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
      }) !== undefined
    );
  }

  /**
   * Adds a mock.
   *
   * @param {Mock} mock - Mock config.
   * @returns {boolean}
   */
  public $addMock(mock: Mock): boolean {
    if (this.$findMock(mock.action, mock.options)) return false;
    if (!this.mocks[mock.action]) this.mocks[mock.action] = [];

    this.mocks[mock.action].push(mock);
    return true;
  }

  /**
   * Finds a mock for the given action and options.
   *
   * @param {string} action - Name of the action like 'fetch'.
   * @param {MockOptions} options - MockOptions like { variables: { id: 42 } }.
   * @returns {Mock | null} null when no mock was found.
   */
  public $findMock(action: string, options: MockOptions | undefined): Mock | null {
    if (this.mocks[action]) {
      return (
        this.mocks[action].find(m => {
          if (!m.options || !options) return true;

          const relevantOptions = pick(options, Object.keys(m.options));
          return isEqual(relevantOptions, m.options || {});
        }) || null
      );
    }

    return null;
  }

  /**
   * Hook to be called by all actions in order to get the mock returnValue.
   *
   * @param {string} action - Name of the action like 'fetch'.
   * @param {MockOptions} options - MockOptions.
   * @returns {any} null when no mock was found.
   */
  public $mockHook(action: string, options: MockOptions): any {
    let returnValue: null | { [key: string]: any } = null;
    const mock = this.$findMock(action, options);

    if (mock) {
      if (mock.returnValue instanceof Function) {
        returnValue = mock.returnValue();
      } else {
        returnValue = mock.returnValue || null;
      }
    }

    if (returnValue) {
      if (returnValue instanceof Array) {
        returnValue.forEach(r => (r.$isPersisted = true));
      } else {
        returnValue.$isPersisted = true;
      }

      return { [this.pluralName]: returnValue };
    }

    return null;
  }
}
