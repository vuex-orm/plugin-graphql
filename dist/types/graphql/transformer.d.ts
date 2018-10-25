import { Data } from "../support/interfaces";
import Model from "../orm/model";
/**
 * This class provides methods to transform incoming data from GraphQL in to a format Vuex-ORM understands and
 * vice versa.
 */
export default class Transformer {
    /**
     * Transforms outgoing data. Use for variables param.
     *
     * Omits relations and some other fields.
     *
     * @param model
     * @param {Data} data
     * @param {Array<String>} whitelist of fields
     * @returns {Data}
     */
    static transformOutgoingData(model: Model, data: Data, whitelist?: Array<String>): Data;
    /**
     * Transforms a set of incoming data to the format vuex-orm requires.
     *
     * @param {Data | Array<Data>} data
     * @param model
     * @param mutation required to transform something like `disableUserAddress` to the actual model name.
     * @param {boolean} recursiveCall
     * @returns {Data}
     */
    static transformIncomingData(data: Data | Array<Data>, model: Model, mutation?: boolean, recursiveCall?: boolean): Data;
}
