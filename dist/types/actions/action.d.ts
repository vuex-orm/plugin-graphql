import { Arguments, Data, DispatchFunction } from "../support/interfaces";
import Model from "../orm/model";
import RootState from "@vuex-orm/core/lib/modules/contracts/RootState";
/**
 * Base class for all Vuex actions. Contains some utility and convenience methods.
 */
export default class Action {
    /**
     * Sends a mutation.
     *
     * @param {string} name Name of the mutation like 'createUser'
     * @param {Data | undefined} variables Variables to send with the mutation
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @param {Model} model The model this mutation affects.
     * @param {boolean} multiple Tells if we're requesting a single record or multiple.
     * @returns {Promise<any>}
     */
    protected static mutation(name: string, variables: Data | undefined, dispatch: DispatchFunction, model: Model): Promise<any>;
    /**
     * Convenience method to get the model from the state.
     * @param {RootState} state Vuex state
     * @returns {Model}
     */
    static getModelFromState(state: RootState): Model;
    /**
     * Makes sure args is a hash.
     *
     * @param {Arguments|undefined} args
     * @param {any} id When not undefined, it's added to the args
     * @returns {Arguments}
     */
    static prepareArgs(args?: Arguments, id?: any): Arguments;
    /**
     * Adds the record itself to the args and sends it through transformOutgoingData. Key is named by the singular name
     * of the model.
     *
     * @param {Arguments} args
     * @param {Model} model
     * @param {Data} data
     * @returns {Arguments}
     */
    static addRecordToArgs(args: Arguments, model: Model, data: Data): Arguments;
    /**
     * Transforms each field of the args which contains a model.
     * @param {Arguments} args
     * @returns {Arguments}
     */
    protected static transformArgs(args: Arguments): Arguments;
}
