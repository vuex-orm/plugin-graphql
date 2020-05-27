import { ActionParams, Data } from "../support/interfaces";
import Action from "./action";
/**
 * Query action for sending a custom query. Will be used for Model.customQuery() and record.$customQuery.
 */
export default class Query extends Action {
    /**
     * Registers the Model.customQuery and the record.$customQuery() methods and the
     * query Vuex Action.
     */
    static setup(): void;
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} name Name of the query
     * @param {boolean} multiple Fetch one or multiple?
     * @param {object} filter Filter object (arguments)
     * @param {boolean} bypassCache Whether to bypass the cache
     * @returns {Promise<Data>} The fetched records as hash
     */
    static call({ state, dispatch }: ActionParams, { name, filter, bypassCache }: ActionParams): Promise<Data>;
}
