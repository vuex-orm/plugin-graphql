import { ActionParams } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';
import { Store } from '../orm/store';
import Transformer from '../graphql/transformer';

/**
 * Destroy action for sending a delete mutation. Will be used for record.$destroy().
 */
export default class Destroy extends Action {
  /**
   * @param {State} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to delete
   * @returns {Promise<any>} true
   */
  public static async call ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<boolean> {
    if (id) {
      const model = this.getModelFromState(state);
      const mutationName = NameGenerator.getNameForDestroy(model);

      const mockReturnValue = model.$mockHook('destroy', { id });

      if (mockReturnValue) {
        await Store.insertData(Transformer.transformIncomingData(mockReturnValue, model, true), dispatch);
        return true;
      }

      args = this.prepareArgs(args, id);

      await Action.mutation(mutationName, args, dispatch, model);
      return true;
    } else {
      throw new Error("The destroy action requires the 'id' to be set");
    }
  }
}
