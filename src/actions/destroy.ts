import Context from "../common/context";
import {ActionParams} from "../support/interfaces";
import Action from "./action";
import {upcaseFirstLetter} from "../support/utils";

export default class Destroy extends Action {
  /**
   * Will be called, when dispatch('entities/something/destroy') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to delete
   * @returns {Promise<void>}
   */
  public static async call ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<any> {
    if (id) {
      const model = Context.getInstance().getModel(state.$name);
      const mutationName = `delete${upcaseFirstLetter(model.singularName)}`;

      args = args || {};
      args['id'] = id;

      return Action.mutation(mutationName, args, dispatch, model, false);
    }
  }
}
