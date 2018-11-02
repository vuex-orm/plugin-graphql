import { Data, DispatchFunction } from '../support/interfaces';
import Context from '../common/context';

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
  public static async insertData (data: Data, dispatch: DispatchFunction): Promise<Data> {
    let insertedData: Data = {};

    await Promise.all(Object.keys(data).map(async (key) => {
      const value = data[key];
      Context.getInstance().logger.log('Inserting records', value);
      const newData = await dispatch('insertOrUpdate', { data: value });

      Object.keys(newData).forEach((dataKey) => {
        if (!insertedData[dataKey]) insertedData[dataKey] = [];
        insertedData[dataKey] = insertedData[dataKey].concat(newData[dataKey]);
      });
    }));

    return insertedData;
  }

  /**
   * Inserts incoming pageInfo data into the store.
   *
   * @param {Data} data
   * @param {DispatchFunction} dispatch
   * @returns {Promise<Data>}
   */
  public static async insertPaginationData (data: Data, dispatch: DispatchFunction): Promise<Data> {
    Context.getInstance().logger.log('inserting pagination data');

    return dispatch('insertPaginationData', data);
  }

  /**
   * Inserts sent Queryparams into the store.
   *
   * @param {Data} data
   * @param {DispatchFunction} dispatch
   * @returns {Promise<Data>}
   */
  public static async insertPreviousQuery (data: Data, dispatch: DispatchFunction): Promise<Data> {
    Context.getInstance().logger.log('inserting previousQuery data');

    return dispatch('insertPreviousQuery', data);
  }
}
