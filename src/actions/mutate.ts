import { ActionParams, Arguments, Data } from "../support/interfaces";
import Action from "./action";
import Context from "../common/context";
import Schema from "../graphql/schema";
import { Store } from "../orm/store";

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
  public static async call(
    { state, dispatch }: ActionParams,
    { args, name }: ActionParams
  ): Promise<Data> {
    if (name) {
      const context: Context = Context.getInstance();
      const model = this.getModelFromState(state!);

      const mockReturnValue = model.$mockHook("mutate", {
        name,
        args: args || {}
      });

      if (mockReturnValue) {
        return Store.insertData(mockReturnValue, dispatch!);
      }

      const schema: Schema = await context.loadSchema();
      args = this.prepareArgs(args);

      // There could be anything in the args, but we have to be sure that all records are gone through
      // transformOutgoingData()
      this.transformArgs(args);

      // Send the mutation
      return Action.mutation(name, args, dispatch!, model);
    } else {
      throw new Error("The mutate action requires the mutation name ('mutation') to be set");
    }
  }
}
