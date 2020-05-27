import { ActionParams, Data } from "../support/interfaces";
import Action from "./action";
/**
 * Push action for sending a update mutation. Will be used for record.$push().
 */
export default class Push extends Action {
    /**
     * Registers the record.$push() method and the push Vuex Action.
     */
    static setup(): void;
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {Arguments} data New data to save
     * @param {Arguments} args Additional arguments
     * @returns {Promise<Data>} The updated record
     */
    static call({ state, dispatch }: ActionParams, { data, args }: ActionParams): Promise<Data>;
}
