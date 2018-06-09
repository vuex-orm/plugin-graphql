import { ActionParams, Data } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';

/**
 * Push action for sending a update mutation. Will be used for record.$push().
 */
export default class Push extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} data New data to save
   * @param {Arguments} args Additional arguments
   * @returns {Promise<Data>} The updated record
   */
  public static async call ({ state, dispatch }: ActionParams, { data, args }: ActionParams): Promise<Data> {
    if (data) {
      const model = this.getModelFromState(state);
      const mutationName = NameGenerator.getNameForPush(model);

      // Arguments
      args = this.prepareArgs(args, data.id);
      this.addRecordToArgs(args, model, data);

      // Send the mutation
      return Action.mutation(mutationName, args, dispatch, model);
    } else {
      throw new Error("The persist action requires the 'data' to be set");
    }
  }
}
