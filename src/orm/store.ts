import { Data, DispatchFunction } from "../support/interfaces";
import Context from "../common/context";

/**
 * Provides some helper methods to interact with the Vuex-ORM store
 */
export class Store {
  /**
   * Inserts incoming data into the store. Existing data will be updated.
   *
   * @param {Data} data New data to insert/update
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @return {Promise<Data>} Inserted data as hash
   */
  public static async insertData(data: Data, dispatch: DispatchFunction): Promise<Data> {
    let insertedData: Data = {} as Data;

    for (const [_, value] of Object.entries(data)) {
      Context.getInstance().logger.log("Inserting records", value);
      const newData: Iterable<any>[] = await dispatch("insertOrUpdate", ({ data: value } as unknown) as Data);
      for (const [dataKey, data] of Object.entries(newData)) {
        insertedData[dataKey] = [...(insertedData[dataKey] ?? []), ...data];
      }
    }

    return insertedData;
  }
}
