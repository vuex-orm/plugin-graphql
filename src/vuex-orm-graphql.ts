import { PatchedModel, Options, ActionParams } from "./support/interfaces";
import Context from "./common/context";
import { PluginComponents } from "@vuex-orm/core/lib/plugins/use";
import { Destroy, Fetch, Mutate, Persist, Push } from "./actions";
import Query from "./actions/query";
import SimpleQuery from "./actions/simple-query";
import SimpleMutation from "./actions/simple-mutation";
import { isPlainObject } from "./support/utils";

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMGraphQL {
  /**
   * @constructor
   * @param {PluginComponents} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor(components: PluginComponents, options: Options) {
    Context.setup(components, options);
    VuexORMGraphQL.setupActions();
    VuexORMGraphQL.setupModelMethods();
  }

  /**
   * Allow everything to read the context.
   */
  public getContext(): Context {
    return Context.getInstance();
  }

  /**
   * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
   */
  private static setupActions() {
    const context = Context.getInstance();

    context.components.RootActions.simpleQuery = SimpleQuery.call.bind(SimpleQuery);
    context.components.RootActions.simpleMutation = SimpleMutation.call.bind(SimpleMutation);

    context.components.Actions.fetch = Fetch.call.bind(Fetch);
    context.components.Actions.persist = Persist.call.bind(Persist);
    context.components.Actions.push = Push.call.bind(Push);
    context.components.Actions.destroy = Destroy.call.bind(Destroy);
    context.components.Actions.mutate = Mutate.call.bind(Mutate);
    context.components.Actions.query = Query.call.bind(Query);
  }

  /**
   * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
   * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
   */
  private static setupModelMethods() {
    const context = Context.getInstance();

    // Register static model convenience methods
    (context.components.Model as typeof PatchedModel).fetch = async function(
      filter: any,
      bypassCache = false
    ) {
      let filterObj = filter;
      if (!isPlainObject(filterObj)) {
        filterObj = { id: filter };
      }
      return this.dispatch("fetch", { filter: filterObj, bypassCache });
    };

    (context.components.Model as typeof PatchedModel).mutate = async function(
      params: ActionParams
    ) {
      return this.dispatch("mutate", params);
    };

    (context.components.Model as typeof PatchedModel).customQuery = async function({
      name,
      filter,
      multiple,
      bypassCache
    }: ActionParams) {
      return this.dispatch("query", { name, filter, multiple, bypassCache });
    };

    // Register model convenience methods
    const model: PatchedModel = context.components.Model.prototype as PatchedModel;

    model.$mutate = async function({ name, args, multiple }: ActionParams) {
      args = args || {};
      if (!args["id"]) args["id"] = this.$id;
      return this.$dispatch("mutate", { name, args, multiple });
    };

    model.$customQuery = async function({ name, filter, multiple, bypassCache }: ActionParams) {
      filter = filter || {};
      if (!filter["id"]) filter["id"] = this.$id;
      return this.$dispatch("query", { name, filter, multiple, bypassCache });
    };

    model.$persist = async function(args: any) {
      return this.$dispatch("persist", { id: this.$id, args });
    };

    model.$push = async function(args: any) {
      return this.$dispatch("push", { data: this, args });
    };

    model.$destroy = async function() {
      return this.$dispatch("destroy", { id: this.$id });
    };

    model.$deleteAndDestroy = async function() {
      await this.$delete();
      return this.$destroy();
    };
  }
}
