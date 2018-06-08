import {Data, DispatchFunction} from "../support/interfaces";
import Context from "../common/context";

export class Store {
  /**
   * Inserts incoming data into the store.
   *
   * @param {Data} data New data to insert/update
   * @param {Function} dispatch Vuex Dispatch method for the model
   */
  public static async insertData (data: Data, dispatch: DispatchFunction): Promise<Data> {
    let insertedData: Data = {};

    Object.keys(data).forEach(async (key) => {
      const value = data[key];
      Context.getInstance().logger.log('Inserting records', value);
      const newData = await dispatch('insertOrUpdate', { data:  value });

      Object.keys(newData).forEach((dataKey) => {
        if (!insertedData[dataKey]) insertedData[dataKey] = [];
        insertedData[dataKey] = insertedData[dataKey].concat(newData[dataKey]);
      });
    });

    return insertedData;
  }
}
