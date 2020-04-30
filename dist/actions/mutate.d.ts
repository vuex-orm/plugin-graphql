import { ActionParams, Data } from "../support/interfaces";
import Action from "./action";
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
    static call({ state, dispatch }: ActionParams, { args, name }: ActionParams): Promise<Data>;
}
