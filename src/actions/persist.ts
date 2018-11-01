import Context from '../common/context';
import { ActionParams, Data } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';
import Model from '../orm/model';
import { Store } from '../orm/store';
import Transformer from "../graphql/transformer";

/**
 * Persist action for sending a create mutation. Will be used for record.$persist().
 */
export default class Persist extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to persist
   * @returns {Promise<Data>} The saved record
   */
  public static async call ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<Data> {
    if (id) {
      const model = this.getModelFromState(state);
      const mutationName = NameGenerator.getNameForPersist(model);
      const oldRecord = model.getRecordWithId(id);

      const mockReturnValue = model.$mockHook('persist', {
        id,
        args: args || {}
      });

      if (mockReturnValue) {
        const newRecord = Store.insertData(Transformer.transformIncomingData(mockReturnValue, model, true), dispatch);
        await this.deleteObsoleteRecord(model, newRecord, oldRecord);
        return newRecord;
      }

      // Arguments
      args = this.prepareArgs(args);
      this.addRecordToArgs(args, model, oldRecord);

      // Send mutation
      const newRecord = await Action.mutation(mutationName, args, dispatch, model);

      // Delete the old record if necessary
      await this.deleteObsoleteRecord(model, newRecord, oldRecord);

      return newRecord;
    } else {
      throw new Error("The persist action requires the 'id' to be set");
    }
  }

  /**
   * It's very likely that the server generated different ID for this record.
   * In this case Action.mutation has inserted a new record instead of updating the existing one.
   *
   * @param {Model} model
   * @param {Data} record
   * @returns {Promise<void>}
   */
  private static async deleteObsoleteRecord (model: Model, newRecord: Data, oldRecord: Data) {
    if (newRecord && oldRecord && newRecord.id !== oldRecord.id) {
      Context.getInstance().logger.log('Dropping deprecated record', oldRecord);
      return oldRecord.$delete();
    }
  }
}
