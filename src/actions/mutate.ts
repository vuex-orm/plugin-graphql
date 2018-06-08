import { ActionParams, Arguments, Data } from '../support/interfaces';
import Action from './action';

/**
 * Mutate action for sending a custom mutation. Will be used for Model.mutate() and record.$mutate().
 */
export default class Mutate extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} args Arguments for the mutation. Must contain a 'mutation' field.
   * @returns {Promise<Data>} The new record if any
   */
  public static async call ({ state, dispatch }: ActionParams, args: Arguments): Promise<Data> {
    const model = this.getModelFromState(state);
    const mutationName: string = args['mutation'];
    delete args['mutation'];

    // There could be anything in the args, but we have to be sure that all records are gone through
    // transformOutgoingData()
    this.transformArgs(args);

    // Send the mutation
    return Action.mutation(mutationName, args, dispatch, model);
  }
}
