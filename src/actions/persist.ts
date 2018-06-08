import Context from "../common/context";
import Transformer from "../graphql/transformer";
import {ActionParams} from "../support/interfaces";
import Action from "./action";
import {upcaseFirstLetter} from "../support/utils";

export default class Persist extends Action {
  /**
   * Will be called, when dispatch('entities/something/persist') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to persist
   * @returns {Promise<void>}
   */
  public static async call ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<any> {
    if (id) {
      const context = Context.getInstance();
      const model = context.getModel(state.$name);
      const data = model.getRecordWithId(id);

      args = args || {};
      args[model.singularName] = Transformer.transformOutgoingData(model, data);

      const mutationName = `create${upcaseFirstLetter(model.singularName)}`;
      const newRecord = await Action.mutation(mutationName, args, dispatch, model, false);

      const oldRecord = model.getRecordWithId(id);

      if (oldRecord && !oldRecord.$isPersisted) {
        // The server generated another ID, this is very likely to happen.
        // in this case Action.mutation has inserted a new record instead of updating the existing one.
        // We can see that because $isPersisted is still false then.
        context.logger.log('Dropping deprecated record with ID', oldRecord.id);
        await model.baseModel.delete({ where: oldRecord.id });
      }

      return newRecord;
    }
  }
}
