import Context from "../common/context";
import {ActionParams} from "../support/interfaces";
import Action from "./action";
import {upcaseFirstLetter} from "../support/utils";
import Transformer from "../graphql/transformer";

export default class Push extends Action {
  /**
   * Will be called, when dispatch('entities/something/push') is called.
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} data New data to save
   * @returns {Promise<Data | {}>}
   */
  public static async call ({ state, dispatch }: ActionParams, { data, args }: ActionParams) {
    if (data) {
      const model = Context.getInstance().getModel(state.$name);

      args = args || {};
      args['id'] = data.id;
      args[model.singularName] = Transformer.transformOutgoingData(model, data);

      const mutationName = `update${upcaseFirstLetter(model.singularName)}`;
      return Action.mutation(mutationName, args, dispatch, model, false);
    }
  }
}
