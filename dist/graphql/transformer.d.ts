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
     * @param {Model} model Base model of the mutation/query
     * @param {Data} data Data to transform
     * @param {boolean} read Tells if this is a write or a read action. read is fetch, write is push and persist.
     * @param {string} action Name of the current action like 'persist' or 'push'
     * @param {Array<String>} whitelist of fields
     * @param {Map<string, Array<string>>} outgoingRecords List of record IDs that are already added to the
     *                                                     outgoing data in order to detect recursion.
     * @param {boolean} recursiveCall Tells if it's a recursive call.
     * @returns {Data}
     */
    static transformOutgoingData(model: Model, data: Data, read: boolean, action: string, whitelist?: Array<String>, outgoingRecords?: Map<string, Array<string>>, recursiveCall?: boolean): Data;
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
    /**
     * Tells if a field should be included in the outgoing data.
     * @param {boolean} forFilter Tells whether a filter is constructed or not.
     * @param {string} fieldName Name of the field to check.
     * @param {any} value Value of the field.
     * @param {Model} model Model class which contains the field.
     * @param {string} action Name of the current action like 'persist' or 'push'
     * @param {Array<String>|undefined} whitelist Contains a list of fields which should always be included.
     * @returns {boolean}
     */
    static shouldIncludeOutgoingField(forFilter: boolean, fieldName: string, value: any, model: Model, action: string, whitelist?: Array<String>): boolean;
    /**
     * Tells whether a field is in the input type.
     * @param {Model} model
     * @param {string} fieldName
     * @param {string} action Name of the current action like 'persist' or 'push'
     */
    private static inputTypeContainsField;
    /**
     * Registers a record for recursion detection.
     * @param {Map<string, Array<string>>} records Map of IDs.
     * @param {ORMModel} record The record to register.
     */
    private static addRecordForRecursionDetection;
    /**
     * Detects recursions.
     * @param {Map<string, Array<string>>} records Map of IDs.
     * @param {ORMModel} record The record to check.
     * @return {boolean} true when the record is already included in the records.
     */
    private static isRecursion;
}
