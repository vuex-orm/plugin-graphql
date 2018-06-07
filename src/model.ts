import ORMModel from '@vuex-orm/core/lib/model/Model';
import { Field } from './interfaces';
import Context from './context';
const inflection = require('inflection');

/**
 * Own model class with some helpers
 */
export default class Model {
  public readonly singularName: string;
  public readonly pluralName: string;
  public readonly baseModel: ORMModel;
  public readonly fields: Map<string, Field> = new Map<string, Field>();
  private readonly context: Context;

  public constructor (baseModel: ORMModel, context: Context) {
    this.baseModel = baseModel;
    this.context = context;

    this.singularName = inflection.singularize(this.baseModel.entity);
    this.pluralName = inflection.pluralize(this.baseModel.entity);

    const fields = this.baseModel.fields();

    Object.keys(fields).forEach((name: string) => {
      this.fields.set(name, fields[name]);
    });
  }

  /**
   * @returns {Array<string>} field names which should be queried
   */
  public getQueryFields (): Array<string> {
    const fields: Array<string> = [];

    this.fields.forEach((field: Field, name: string) => {
      if (this.fieldIsAttribute(field) && !this.skipField(name)) {
        fields.push(name);
      }
    });

    return fields;
  }

  /**
   * Tells if a field should be ignored. This is true for fields that start with a `$` or is it is within the skipField
   * property.
   *
   * @param {string} field
   * @returns {boolean}
   */
  public skipField (field: string) {
    if (field.startsWith('$')) return true;
    if (this.baseModel.skipFields && this.baseModel.skipFields.indexOf(field) >= 0) return true;

    let shouldSkipField: boolean = false;

    this.getRelations().forEach((relation: Field) => {
      if (
        (relation instanceof this.context.components.BelongsTo || relation instanceof this.context.components.HasOne) &&
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
   * @returns {Map<string, Field>} all relations of the model which should be queried
   */
  public getRelations (): Map<string, Field> {
    const relations = new Map<string, Field>();

    this.fields.forEach((field: Field, name: string) => {
      if (!this.fieldIsAttribute(field)) {
        relations.set(name, field);
      }
    });

    return relations;
  }

  /**
   * This accepts a field like `subjectType` and checks if this just randomly is called `...Type` or it is part
   * of a polymorph relation.
   * @param {string} name
   * @returns {boolean}
   */
  public isTypeFieldOfPolymorphRelation (name: string): boolean {
    let found: boolean = false;

    this.context.models.forEach((model) => {
      if (found) return false;

      model.getRelations().forEach((relation) => {
        if (relation instanceof this.context.components.MorphMany ||
          relation instanceof this.context.components.MorphedByMany ||
          relation instanceof this.context.components.MorphOne ||
          relation instanceof this.context.components.MorphTo ||
          relation instanceof this.context.components.MorphToMany) {

          if (relation.type === name && relation.related && relation.related.entity === this.baseModel.entity) {
            found = true;
            return false;
          }
        }

        return true;
      });

      return true;
    });

    return found;
  }

  public getRecordWithId (id: number) {
    return this.baseModel.query().withAllRecursive().where('id', id).first();
  }

  public fieldIsNumber (field: Field | undefined): boolean {
    if (!field) return false;
    return field instanceof this.context.components.Number ||
      field instanceof this.context.components.Increment;
  }

  private fieldIsAttribute (field: Field): boolean {
    return field instanceof this.context.components.Increment ||
      field instanceof this.context.components.Attr ||
      field instanceof this.context.components.String ||
      field instanceof this.context.components.Number ||
      field instanceof this.context.components.Boolean;
  }
}
