import { ActionParams, Data, PatchedModel } from "../support/interfaces";
import Action from "./action";
import { Store } from "../orm/store";
import Context from "../common/context";
import { toNumber } from "../support/utils";

/**
 * Destroy action for sending a delete mutation. Will be used for record.$destroy().
 */
export default class Destroy extends Action {
  /**
   * Registers the record.$destroy() and record.$deleteAndDestroy() methods and
   * the destroy Vuex Action.
   */
  public static setup() {
    const context = Context.getInstance();
    const record: PatchedModel = context.components.Model.prototype as PatchedModel;

    context.components.Actions.destroy = Destroy.call.bind(Destroy);

    record.$destroy = async function() {
      return this.$dispatch("destroy", { id: toNumber(this.$id) });
    };

    record.$deleteAndDestroy = async function() {
      await this.$delete();
      return this.$destroy();
    };
  }

  /**
   * @param {State} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {number} id ID of the record to delete
   * @returns {Promise<any>} true
   */
  public static async call(
    { state, dispatch }: ActionParams,
    { id, args }: ActionParams
  ): Promise<boolean> {
    if (id) {
      const model = this.getModelFromState(state!);
      const mutationName = Context.getInstance().adapter.getNameForDestroy(model);

      const mockReturnValue = model.$mockHook("destroy", { id });

      if (mockReturnValue) {
        await Store.insertData(mockReturnValue, dispatch!);
        return true;
      }

      args = this.prepareArgs(args, id);

      await Action.mutation(mutationName, args as Data, dispatch!, model);
      return true;
    } else {
      /* istanbul ignore next */
      throw new Error("The destroy action requires the 'id' to be set");
    }
  }
}
