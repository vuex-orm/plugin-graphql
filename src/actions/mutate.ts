import { ActionParams, PatchedModel, Data } from "../support/interfaces";
import Action from "./action";
import Context from "../common/context";
import Schema from "../graphql/schema";
import { Store } from "../orm/store";
import { toNumber } from "../support/utils";

/**
 * Mutate action for sending a custom mutation. Will be used for Model.mutate() and record.$mutate().
 */
export default class Mutate extends Action {
  /**
   * Registers the Model.mutate() and the record.$mutate() methods and the mutate Vuex Action.
   */
  public static setup() {
    const context = Context.getInstance();
    const model: typeof PatchedModel = context.components.Model as typeof PatchedModel;
    const record: PatchedModel = context.components.Model.prototype as PatchedModel;

    context.components.Actions.mutate = Mutate.call.bind(Mutate);

    model.mutate = async function(params: ActionParams) {
      return this.dispatch("mutate", params);
    };

    record.$mutate = async function({ name, args, multiple }: ActionParams) {
      args = args || {};
      if (!args["id"]) args["id"] = toNumber(this.$id);

      return this.$dispatch("mutate", { name, args, multiple });
    };
  }

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
      const action = 'mutate'

      const mockReturnValue = model.$mockHook("mutate", {
        name,
        args: args || {}
      });

      if (mockReturnValue) {
        return Store.insertData(mockReturnValue, dispatch!);
      }

      await context.loadSchema();
      args = this.prepareArgs(args);

      // There could be anything in the args, but we have to be sure that all records are gone through
      // transformOutgoingData()
      this.transformArgs(args, action);

      // Send the mutation
      return Action.mutation(name, args as Data, dispatch!, model, action);
    } else {
      /* istanbul ignore next */
      throw new Error("The mutate action requires the mutation name ('mutation') to be set");
    }
  }
}
