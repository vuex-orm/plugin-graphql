import { Field, ORMModel } from './interfaces';
const inflection = require('inflection');

/**
 * Own model class with some helpers
 */
export default class Model {
  public readonly singularName: string;
  public readonly pluralName: string;
  public readonly baseModel: ORMModel;
  private readonly fields: Map<string, Field> = new Map<string, Field>();

  public constructor (baseModel: ORMModel) {
    this.baseModel = baseModel;

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
      // field.constructor.name is one of Increment, Attr, BelongsToMany, BelongsTo, HasMany, HasManyBy, HasOne
      // TODO import the classes from Vuex-ORM and use instanceof instead
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
    return field.constructor.name === 'Attr' || field.constructor.name === 'Increment';
  }
}
