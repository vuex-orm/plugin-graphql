import QueryBuilder from "../graphql/query-builder";
import Context from "../common/context";
import {Store} from "../orm/store";
import Transformer from "../graphql/transformer";
import {ActionParams} from "../support/interfaces";
import Model from "../orm/model";
import Action from "./action";

export default class Fetch extends Action {
  /**
   * Will be called, when dispatch('entities/something/fetch') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {ActionParams} params
   * @returns {Promise<void>}
   */
  public static async call ({ state, dispatch }: ActionParams, params?: ActionParams): Promise<void> {
    const context = Context.getInstance();
    const model: Model = context.getModel(state.$name);

    // Filter
    const filter = params && params.filter ? Transformer.transformOutgoingData(model, params.filter) : {};
    const bypassCache = params && params.bypassCache;

    // When the filter contains an id, we query in singular mode
    const multiple: boolean = !filter['id'];
    const name: string = `${multiple ? model.pluralName : model.singularName}`;
    const query = QueryBuilder.buildQuery('query', model, name, filter, multiple);

    // Send the request to the GraphQL API
    const data = await context.apollo.request(model, query, filter, false, bypassCache as boolean);

    // Insert incoming data into the store
    await Store.insertData(data, dispatch);
  }
}
