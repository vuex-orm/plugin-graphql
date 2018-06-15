import QueryBuilder from '../graphql/query-builder';
import Context from '../common/context';
import { Store } from '../orm/store';
import Transformer from '../graphql/transformer';
import { ActionParams, Data } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';
import Schema from '../graphql/schema';

/**
 * Query action for sending a custom query. Will be used for Model.customQuery() and record.$customQuery.
 */
export default class Query extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} name Name of the query
   * @param {boolean} multiple Fetch one or multiple?
   * @param {object} filter Filter object (arguments)
   * @param {boolean} bypassCache Whether to bypass the cache
   * @returns {Promise<Data>} The fetched records as hash
   */
  public static async call ({ state, dispatch }: ActionParams,
                            { name, filter, bypassCache }: ActionParams): Promise<Data> {
    if (name) {
      const context: Context = Context.getInstance();
      const schema: Schema = await context.loadSchema();
      const model = this.getModelFromState(state);

      // Filter
      filter = filter ? Transformer.transformOutgoingData(model, filter) : {};

      // Multiple?
      const multiple: boolean = schema.returnsConnection(schema.getQuery(name));

      // Build query
      const query = QueryBuilder.buildQuery('query', model, name, filter, multiple, false);

      // Send the request to the GraphQL API
      const data = await context.apollo.request(model, query, filter, false, bypassCache as boolean);

      // Insert incoming data into the store
      return Store.insertData(data, dispatch);
    } else {
      throw new Error("The customQuery action requires the query name ('name') to be set");
    }
  }
}
