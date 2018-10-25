import { ActionParams, Data } from "../support/interfaces";
import Action from "./action";
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
    static call({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<Data>;
    /**
     * It's very likely that the server generated different ID for this record.
     * In this case Action.mutation has inserted a new record instead of updating the existing one.
     *
     * @param {Model} model
     * @param {Data} record
     * @returns {Promise<void>}
     */
    private static deleteObsoleteRecord;
}
