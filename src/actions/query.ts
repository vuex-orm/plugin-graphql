import QueryBuilder from "../graphql/query-builder";
import Context from "../common/context";
import { Store } from "../orm/store";
import Transformer from "../graphql/transformer";
import { ActionParams, Data, PatchedModel } from "../support/interfaces";
import Action from "./action";
import Schema from "../graphql/schema";
import { toNumber } from "../support/utils";

/**
 * Query action for sending a custom query. Will be used for Model.customQuery() and record.$customQuery.
 */
export default class Query extends Action {
  /**
   * Registers the Model.customQuery and the record.$customQuery() methods and the
   * query Vuex Action.
   */
  public static setup() {
    const context = Context.getInstance();
    const model: typeof PatchedModel = context.components.Model as typeof PatchedModel;
    const record: PatchedModel = context.components.Model.prototype as PatchedModel;

    context.components.Actions.query = Query.call.bind(Query);

    model.customQuery = async function({ name, filter, multiple, bypassCache }: ActionParams) {
      return this.dispatch("query", { name, filter, multiple, bypassCache });
    };

    record.$customQuery = async function({ name, filter, multiple, bypassCache }: ActionParams) {
      filter = filter || {};
      if (!filter["id"]) filter["id"] = toNumber(this.$id);

      return this.$dispatch("query", { name, filter, multiple, bypassCache });
    };
  }

  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} name Name of the query
   * @param {boolean} multiple Fetch one or multiple?
   * @param {object} filter Filter object (arguments)
   * @param {boolean} bypassCache Whether to bypass the cache
   * @returns {Promise<Data>} The fetched records as hash
   */
  public static async call(
    { state, dispatch }: ActionParams,
    { name, filter, bypassCache }: ActionParams
  ): Promise<Data> {
    if (name) {
      const context: Context = Context.getInstance();
      const model = this.getModelFromState(state!);
      const action = 'query'

      const mockReturnValue = model.$mockHook("query", {
        name,
        filter: filter || {}
      });

      if (mockReturnValue) {
        return Store.insertData(mockReturnValue, dispatch!);
      }

      const schema: Schema = await context.loadSchema();

      // Filter
      filter = filter ? Transformer.transformOutgoingData(model, filter as Data, true, action) : {};

      // Multiple?
      const multiple: boolean = Schema.returnsConnection(schema.getQuery(name)!);

      // Build query
      const query = QueryBuilder.buildQuery("query", model, action, name, filter, multiple, false);

      // Send the request to the GraphQL API
      const data = await context.apollo.request(
        model,
        query,
        filter,
        false,
        bypassCache as boolean
      );

      // Insert incoming data into the store
      return Store.insertData(data, dispatch!);
    } else {
      /* istanbul ignore next */
      throw new Error("The customQuery action requires the query name ('name') to be set");
    }
  }
}
