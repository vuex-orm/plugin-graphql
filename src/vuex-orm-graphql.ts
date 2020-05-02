import { Options } from "./support/interfaces";
import Context from "./common/context";
import { PluginComponents } from "@vuex-orm/core/lib/plugins/use";
import {
  Destroy,
  Fetch,
  Mutate,
  Persist,
  Push,
  Query,
  SimpleQuery,
  SimpleMutation
} from "./actions";

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
  }

  /**
   * Allow everything to read the context.
   */
  public getContext(): Context {
    return Context.getInstance();
  }

  /**
   * This method will setup:
   *   - Vuex actions: fetch, persist, push, destroy, mutate
   *   - Model methods: fetch(), mutate(), customQuery()
   *   - Record method: $mutate(), $persist(), $push(), $destroy(), $deleteAndDestroy(), $customQuery()
   */
  private static setupActions() {
    Fetch.setup();
    Persist.setup();
    Push.setup();
    Destroy.setup();
    Mutate.setup();
    Query.setup();
    SimpleQuery.setup();
    SimpleMutation.setup();
  }
}
