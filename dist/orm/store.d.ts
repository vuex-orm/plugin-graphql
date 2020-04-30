import { Data, DispatchFunction } from "../support/interfaces";
/**
 * Provides some helper methods to interact with the Vuex-ORM store
 */
export declare class Store {
    /**
     * Inserts incoming data into the store. Existing data will be updated.
     *
     * @param {Data} data New data to insert/update
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @return {Promise<Data>} Inserted data as hash
     */
    static insertData(data: Data, dispatch: DispatchFunction): Promise<Data>;
}
