import { Data, Field } from '../support/interfaces';
import Model from '../orm/model';
import { Model as ORMModel } from '@vuex-orm/core';
import Context from '../common/context';
import { downcaseFirstLetter } from '../support/utils';
import * as _ from 'lodash-es';
const inflection = require('inflection');

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
  public static transformOutgoingData (model: Model, data: Data, whitelist?: Array<String>): Data {
    const context = Context.getInstance();
    const relations: Map<string, Field> = model.getRelations();
    const returnValue: Data = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Always add fields on the whitelist. Ignore hasMany/One connections, empty fields and internal fields ($)
      if (
        (whitelist && whitelist.includes(key)) ||
        (
          (!relations.has(key) || relations.get(key) instanceof context.components.BelongsTo) &&
          !key.startsWith('$') && value !== null
        )
      ) {

        let relatedModel = relations.get(key) && relations.get(key)!.parent
          ? context.getModel(inflection.singularize(relations.get(key)!.parent!.entity), true)
          : null;

        if (value instanceof Array) {
          // Iterate over all fields and transform them if value is an array
          const arrayModel = context.getModel(inflection.singularize(key));
          returnValue[key] = value.map((v) => this.transformOutgoingData(arrayModel || model, v));
        } else if (typeof value === 'object' && value.$id !== undefined) {
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
  public static transformIncomingData (data: Data | Array<Data>, model: Model, mutation: boolean = false,
                                       recursiveCall: boolean = false): Data {
    let result: Data = {};
    const context = Context.getInstance();

    if (!recursiveCall) {
      context.logger.group('Transforming incoming data');
      context.logger.log('Raw data:', data);
    }

    if (_.isArray(data)) {
      result = (data).map(d => this.transformIncomingData(d, model, mutation, true));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          if (_.isPlainObject(data[key])) {
            const localModel: Model = context.getModel(key, true) || model;

            if (data[key].nodes && context.connectionQueryMode === 'nodes') {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes,
                localModel, mutation, true);
            } else if (data[key].edges && context.connectionQueryMode === 'edges') {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].edges,
                localModel, mutation, true);
            } else if (data.node && context.connectionQueryMode === 'edges') {
              result = this.transformIncomingData(data.node, localModel, mutation, true);
            } else if (data[key].edges && context.connectionQueryMode === 'relay') {
              let insertData = data[key].edges;
              insertData.cursor = data[key].edges.cursor || '';
              result[inflection.pluralize(key)] = this.transformIncomingData(insertData,
                localModel, mutation, true);
            } else if (data.node && context.connectionQueryMode === 'relay') {
              let insertData = data.node;
              insertData.cursor = data.cursor || '';
              result = this.transformIncomingData(insertData, localModel, mutation, true);
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
          } else if (key.endsWith('Type') && model.isTypeFieldOfPolymorphicRelation(key)) {
            result[key] = inflection.pluralize(downcaseFirstLetter(data[key]));
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    if (!recursiveCall) {
      context.logger.log('Transformed data:', result);
      context.logger.groupEnd();
    } else {
      result['$isPersisted'] = true;
    }

    // Make sure this is really a plain JS object. We had some issues in testing here.
    return _.clone(result);
  }
}
