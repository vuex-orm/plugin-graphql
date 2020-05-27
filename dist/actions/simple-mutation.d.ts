import { ActionParams } from "../support/interfaces";
import Action from "./action";
/**
 * SimpleMutation action for sending a model unrelated simple mutation.
 */
export default class SimpleMutation extends Action {
    /**
     * Registers the Model.simpleMutation() Vuex Root Action.
     */
    static setup(): void;
    /**
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} query The query to send
     * @param {Arguments} variables
     * @returns {Promise<any>} The result
     */
    static call({ dispatch }: ActionParams, { query, variables }: ActionParams): Promise<any>;
}
