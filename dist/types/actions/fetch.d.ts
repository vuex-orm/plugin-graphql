import { ActionParams, Data } from "../support/interfaces";
import Action from "./action";
/**
 * Fetch action for sending a query. Will be used for Model.fetch().
 */
export default class Fetch extends Action {
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {ActionParams} params Optional params to send with the query
     * @returns {Promise<Data>} The fetched records as hash
     */
    static call({ state, dispatch }: ActionParams, params?: ActionParams): Promise<Data>;
}
