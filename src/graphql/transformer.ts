import { Data, Field } from "../support/interfaces";
import Model from "../orm/model";
import { Model as ORMModel, Relation } from "@vuex-orm/core";
import Context from "../common/context";
import {
  clone,
  downcaseFirstLetter,
  isPlainObject,
  pluralize,
  singularize
} from "../support/utils";
import { ConnectionMode } from "../adapters/adapter";

/**
 * This class provides methods to transform incoming data from GraphQL in to a format Vuex-ORM understands and
 * vice versa.
 */
export default class Transformer {
  /**
   * Transforms outgoing data. Use for variables param.
   *
   * Omits relations and some other fields.
   *
   * @param model
   * @param {Data} data
   * @param {Array<String>} whitelist of fields
   * @returns {Data}
   */
  public static transformOutgoingData(model: Model, data: Data, whitelist?: Array<String>): Data {
    const context = Context.getInstance();
    const relations: Map<string, Relation> = model.getRelations();
    const returnValue: Data = {} as Data;

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (this.shouldIncludeOutgoingField(key, value, model, whitelist)) {
        let relatedModel = Model.getRelatedModel(relations.get(key)!);

        if (value instanceof Array) {
          // Either this is a hasMany field or a .attr() field which contains an array.
          const arrayModel = context.getModel(singularize(key), true);

          if (arrayModel) {
            returnValue[key] = value.map(v => this.transformOutgoingData(arrayModel || model, v));
          } else {
            returnValue[key] = value;
          }
        } else if (typeof value === "object" && value.$id !== undefined) {
          if (!relatedModel) {
            relatedModel = context.getModel((value as ORMModel).$self().entity);
          }

          // Value is a record, transform that too
          returnValue[key] = this.transformOutgoingData(relatedModel, value);
        } else {
          // In any other case just let the value be what ever it is
          returnValue[key] = value;
        }
      }
    });

    return returnValue;
  }

  /**
   * Transforms a set of incoming data to the format vuex-orm requires.
   *
   * @param {Data | Array<Data>} data
   * @param model
   * @param mutation required to transform something like `disableUserAddress` to the actual model name.
   * @param {boolean} recursiveCall
   * @returns {Data}
   */
  public static transformIncomingData(
    data: Data | Array<Data>,
    model: Model,
    mutation: boolean = false,
    recursiveCall: boolean = false
  ): Data {
    let result: Data | Array<Data> = {} as Data;
    const context = Context.getInstance();

    if (!recursiveCall) {
      context.logger.group("Transforming incoming data");
      context.logger.log("Raw data:", data);
    }

    if (Array.isArray(data)) {
      result = data.map((d: any) => this.transformIncomingData(d, model, mutation, true));
    } else {
      Object.keys(data).forEach(key => {
        if (key in data) {
          if (isPlainObject(data[key])) {
            const localModel: Model = context.getModel(key, true) || model;

            if (data[key].nodes && context.connectionMode === ConnectionMode.NODES) {
              result[pluralize(key)] = this.transformIncomingData(
                data[key].nodes,
                localModel,
                mutation,
                true
              );
            } else if (data[key].edges && context.connectionMode === ConnectionMode.EDGES) {
              result[pluralize(key)] = this.transformIncomingData(
                data[key].edges,
                localModel,
                mutation,
                true
              );
            } else if (data["node"] && context.connectionMode === ConnectionMode.EDGES) {
              result = this.transformIncomingData(data["node"], localModel, mutation, true);
            } else {
              let newKey = key;

              if (mutation && !recursiveCall) {
                newKey = data[key].nodes ? localModel.pluralName : localModel.singularName;
                newKey = downcaseFirstLetter(newKey);
              }

              result[newKey] = this.transformIncomingData(data[key], localModel, mutation, true);
            }
          } else if (Model.isFieldNumber(model.fields.get(key))) {
            result[key] = parseFloat(data[key]);
          } else if (key.endsWith("Type") && model.isTypeFieldOfPolymorphicRelation(key)) {
            result[key] = pluralize(downcaseFirstLetter(data[key]));
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    if (!recursiveCall) {
      context.logger.log("Transformed data:", result);
      context.logger.groupEnd();
    } else {
      result["$isPersisted"] = true;
    }

    // Make sure this is really a plain JS object. We had some issues in testing here.
    return clone(result);
  }

  /**
   * Tells if a field should be included in the outgoing data.
   * @param {string} fieldName Name of the field to check.
   * @param {any} value Value of the field.
   * @param {Model} model Model class which contains the field.
   * @param {Array<String>|undefined} whitelist Contains a list of fields which should always be included.
   * @returns {boolean}
   */
  private static shouldIncludeOutgoingField(
    fieldName: string,
    value: any,
    model: Model,
    whitelist?: Array<String>
  ): boolean {
    // Always add fields on the whitelist.
    if (whitelist && whitelist.includes(fieldName)) return true;

    // Ignore internal fields
    if (fieldName.startsWith("$")) return false;

    // Ignore empty fields
    if (value === null || value === undefined) return false;

    // Include all eager save connections
    if (model.getRelations().has(fieldName)) {
      const relation: Relation = model.getRelations().get(fieldName)!;
      const related: Model | null = Model.getRelatedModel(relation);
      if (related && model.shouldEagerSaveRelation(fieldName, relation, related)) return true;

      // All other relations are skipped
      return false;
    }

    // Everything else is ok
    return true;
  }
}
