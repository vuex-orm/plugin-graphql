import { ActionParams, Arguments, Data } from '../support/interfaces';
import Action from './action';

/**
 * Mutate action for sending a custom mutation. Will be used for Model.mutate() and record.$mutate().
 */
export default class Mutate extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} name Name of the query
   * @param {boolean} multiple Fetch one or multiple?
   * @param {Arguments} args Arguments for the mutation. Must contain a 'mutation' field.
   * @returns {Promise<Data>} The new record if any
   */
  public static async call ({ state, dispatch }: ActionParams, { args, multiple, name }: ActionParams): Promise<Data> {
    if (name) {
      const model = this.getModelFromState(state);
      args = this.prepareArgs(args);

      // There could be anything in the args, but we have to be sure that all records are gone through
      // transformOutgoingData()
      this.transformArgs(args);

      if (multiple === undefined) multiple = !args['id'];

      // Send the mutation
      return Action.mutation(name, args, dispatch, model, multiple);
    } else {
      throw new Error("The mutate action requires the mutation name ('mutation') to be set");
    }
  }
}
