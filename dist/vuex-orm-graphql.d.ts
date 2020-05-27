import { Options } from "./support/interfaces";
import Context from "./common/context";
import { PluginComponents } from "@vuex-orm/core/lib/plugins/use";
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMGraphQL {
    /**
     * @constructor
     * @param {PluginComponents} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: PluginComponents, options: Options);
    /**
     * Allow everything to read the context.
     */
    getContext(): Context;
    /**
     * This method will setup:
     *   - Vuex actions: fetch, persist, push, destroy, mutate
     *   - Model methods: fetch(), mutate(), customQuery()
     *   - Record method: $mutate(), $persist(), $push(), $destroy(), $deleteAndDestroy(), $customQuery()
     */
    private static setupActions;
}
