import Context from "../common/context";
import { ActionParams, Data, PatchedModel } from "../support/interfaces";
import Action from "./action";
import Model from "../orm/model";
import { Store } from "../orm/store";
import { toNumber } from "../support/utils";

/**
 * Persist action for sending a create mutation. Will be used for record.$persist().
 */
export default class Persist extends Action {
  /**
   * Registers the record.$persist() method and the persist Vuex Action.
   */
  public static setup() {
    const context = Context.getInstance();
    const record: PatchedModel = context.components.Model.prototype as PatchedModel;

    context.components.Actions.persist = Persist.call.bind(Persist);

    record.$persist = async function(args: any) {
      return this.$dispatch("persist", { id: this.$id, args });
    };
  }

  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {number|string} id ID of the record to persist
   * @returns {Promise<Data>} The saved record
   */
  public static async call(
    { state, dispatch }: ActionParams,
    { id, args }: ActionParams
  ): Promise<Data> {
    if (id) {
      const model = this.getModelFromState(state!);
      const mutationName = Context.getInstance().adapter.getNameForPersist(model);
      const oldRecord = model.getRecordWithId(id)!;

      const mockReturnValue = model.$mockHook("persist", {
        id: toNumber(id),
        args: args || {}
      });

      if (mockReturnValue) {
        const newRecord = await Store.insertData(mockReturnValue, dispatch!);
        await this.deleteObsoleteRecord(model, newRecord, oldRecord);
        return newRecord;
      }

      // Arguments
      await Context.getInstance().loadSchema();
      args = this.prepareArgs(args);
      this.addRecordToArgs(args, model, oldRecord);

      // Send mutation
      const newRecord = await Action.mutation(mutationName, args as Data, dispatch!, model);

      // Delete the old record if necessary
      await this.deleteObsoleteRecord(model, newRecord, oldRecord);

      return newRecord;
    } else {
      /* istanbul ignore next */
      throw new Error("The persist action requires the 'id' to be set");
    }
  }

  /**
   * It's very likely that the server generated different ID for this record.
   * In this case Action.mutation has inserted a new record instead of updating the existing one.
   *
   * @param {Model} model
   * @param newRecord
   * @param oldRecord
   * @returns {Promise<void>}
   */
  private static async deleteObsoleteRecord(model: Model, newRecord: Data, oldRecord: Data) {
    if (newRecord?.id !== oldRecord?.id) {
      Context.getInstance().logger.log("Dropping deprecated record", oldRecord);
      return oldRecord.$delete();
    }

    return null;
  }
}
