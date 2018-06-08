import QueryBuilder from "../graphql/query-builder";
import Context from "../common/context";
import {Store} from "../orm/store";
import {Data, DispatchFunction} from "../support/interfaces";
import {upcaseFirstLetter} from "../support/utils";
import Model from "../orm/model";

export default class Action {
  /**
   * Sends a mutation.
   *
   * @param {string} name Name of the mutation like 'createUser'
   * @param {Data | undefined} variables Variables to send with the mutation
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @param {Model} model The model this mutation affects.
   * @param {boolean} multiple See QueryBuilder.buildQuery()
   * @returns {Promise<any>}
   */
  protected static async mutation (name: string, variables: Data | undefined, dispatch: DispatchFunction, model: Model,
                                   multiple?: boolean): Promise<any> {
    if (variables) {
      const query = QueryBuilder.buildQuery('mutation', model, name, variables, multiple);

      // Send GraphQL Mutation
      const newData = await Context.getInstance().apollo.request(model, query, variables, true);

      if (name !== `delete${upcaseFirstLetter(model.singularName)}`) {
        const insertedData: Data = await Store.insertData(newData, dispatch);

        if (insertedData[model.pluralName] && insertedData[model.pluralName][0]) {
          return insertedData[model.pluralName][0];
        } else {
          Context.getInstance().logger.log("Couldn't find the record of type", model.pluralName, 'in', insertedData,
            '. Fallback to find()');
          return model.baseModel.query().last();
        }
      }

      return true;
    }
  }
}
