import { ActionParams } from "../support/interfaces";
import Action from "./action";
/**
 * SimpleQuery action for sending a model unrelated simple query.
 */
export default class SimpleQuery extends Action {
    /**
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} query The query to send
     * @param {Arguments} variables
     * @param {boolean} bypassCache Whether to bypass the cache
     * @returns {Promise<any>} The result
     */
    static call({ dispatch }: ActionParams, { query, bypassCache, variables }: ActionParams): Promise<any>;
}
