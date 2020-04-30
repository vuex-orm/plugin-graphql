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
     * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
     */
    private static setupActions;
    /**
     * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
     * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
     */
    private static setupModelMethods;
}
