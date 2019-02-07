import { Data, Field } from "../support/interfaces";
import Model from "../orm/model";
import { Model as ORMModel } from "@vuex-orm/core";
import Context from "../common/context";
import {
  pluralize,
  singularize,
  clone,
  downcaseFirstLetter,
  isPlainObject
} from "../support/utils";

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
    const relations: Map<string, Field> = model.getRelations();
    const returnValue: Data = {};

    Object.keys(data).forEach(key => {
      const value = data[key];

      // Always add fields on the whitelist. Ignore hasMany/One connections, empty fields and internal fields ($)
      if (
        (whitelist && whitelist.includes(key)) ||
        ((!relations.has(key) || relations.get(key) instanceof context.components.BelongsTo) &&
          !key.startsWith("$") &&
          value !== null &&
          value !== undefined)
      ) {
        let relatedModel =
          relations.get(key) && relations.get(key)!.parent
            ? context.getModel(singularize(relations.get(key)!.parent!.entity), true)
            : null;
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
    let result: Data = {};
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

            if (data[key].nodes && context.connectionQueryMode === "nodes") {
              result[pluralize(key)] = this.transformIncomingData(
                data[key].nodes,
                localModel,
                mutation,
                true
              );
            } else if (data[key].edges && context.connectionQueryMode === "edges") {
              result[pluralize(key)] = this.transformIncomingData(
                data[key].edges,
                localModel,
                mutation,
                true
              );
            } else if (data["node"] && context.connectionQueryMode === "edges") {
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
}
