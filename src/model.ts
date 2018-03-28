import { Field, ORMModel } from './interfaces';
import { Attr, Increment } from '@vuex-orm/core';
import Context from './context';
const inflection = require('inflection');

/**
 * Own model class with some helpers
 */
export default class Model {
  public readonly singularName: string;
  public readonly pluralName: string;
  public readonly baseModel: ORMModel;
  private readonly context: Context;
  private readonly fields: Map<string, Field> = new Map<string, Field>();

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
      if (this.fieldIsAttribute(field) && !name.endsWith('Id')) {
        fields.push(name);
      }
    });

    return fields;
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
    return field instanceof this.context.components.Attr ||
      field instanceof this.context.components.Increment;
  }
}
