import { Field, ORMModel } from './interfaces';
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
   * Tells if a field should be ignored. This is true for fields that start with a `$` and all foreign keys
   * @param {string} field
   * @returns {boolean}
   */
  public skipField (field: string) {
    if (field.startsWith('$')) return true;

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

  private fieldIsAttribute (field: Field): boolean {
    return field instanceof this.context.components.Increment ||
      field instanceof this.context.components.Attr ||
      field instanceof this.context.components.String ||
      field instanceof this.context.components.Number ||
      field instanceof this.context.components.Boolean;
  }
}
