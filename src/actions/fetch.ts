import QueryBuilder from '../graphql/query-builder';
import Context from '../common/context';
import { Store } from '../orm/store';
import Transformer from '../graphql/transformer';
import { ActionParams, Data } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';

/**
 * Fetch action for sending a query. Will be used for Model.fetch().
 */
export default class Fetch extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {ActionParams} params Optional params to send with the query
   * @returns {Promise<Data>} The fetched records as hash
   */
  public static async call ({ state, dispatch }: ActionParams, params?: ActionParams): Promise<Data> {
    const context = Context.getInstance();
    const model = this.getModelFromState(state);

    const mockReturnValue = model.$mockHook('fetch', {
      filter: params ? params.filter || {} : {}
    });

    if (mockReturnValue) {
      return Store.insertData(Transformer.transformIncomingData(mockReturnValue, model, false), dispatch);
    }

    await context.loadSchema();

    // Filter
    const filter = params && params.filter ?
      Transformer.transformOutgoingData(model, params.filter, Object.keys(params.filter)) : {};

    const extraArgs = params && params.extraArgs ?
      Transformer.transformOutgoingData(model, params.extraArgs, Object.keys(params.extraArgs)) : {};

    const bypassCache = params && params.bypassCache;

    // When the filter contains an id, we query in singular mode
    const multiple: boolean = !filter['id'];
    const name: string = NameGenerator.getNameForFetch(model, multiple);
    const query = QueryBuilder.buildQuery('query', model, name, filter, extraArgs, multiple, multiple);

    // Send the request to the GraphQL API
    const data = await context.apollo.request(model, query, { ...filter, ...extraArgs }, false, bypassCache as boolean);

    if (context.connectionQueryMode === 'relay') {
      await Store.insertPaginationData(data, dispatch);
      await Store.insertPreviousQuery({ filter, extraArgs }, dispatch);
    }

    // Insert incoming data into the store
    return Store.insertData(Transformer.transformIncomingData(data as Data, model, false), dispatch);
  }
}
