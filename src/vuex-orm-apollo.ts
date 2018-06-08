import { PatchedModel, Options } from './support/interfaces';
import Context from './common/context';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Destroy, Fetch, Mutate, Persist, Push } from './actions';
import Query from './actions/query';

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMApollo {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor (components: Components, options: Options) {
    Context.setup(components, options);
    VuexORMApollo.setupActions();
    VuexORMApollo.setupModelMethods();
  }

  /**
   * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
   */
  private static setupActions () {
    const context = Context.getInstance();

    context.components.subActions.fetch = Fetch.call.bind(Fetch);
    context.components.subActions.persist = Persist.call.bind(Persist);
    context.components.subActions.push = Push.call.bind(Push);
    context.components.subActions.destroy = Destroy.call.bind(Destroy);
    context.components.subActions.mutate = Mutate.call.bind(Mutate);
    context.components.subActions.query = Query.call.bind(Query);
  }

  /**
   * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
   * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
   */
  private static setupModelMethods () {
    const context = Context.getInstance();

    // Register static model convenience methods
    (context.components.Model as (typeof PatchedModel)).fetch = async function (filter: any, bypassCache = false) {
      let filterObj = filter;
      if (typeof filterObj !== 'object') filterObj = { id: filter };
      return this.dispatch('fetch', { filter: filterObj, bypassCache });
    };

    (context.components.Model as (typeof PatchedModel)).mutate = async function (params: any) {
      return this.dispatch('mutate', params);
    };

    (context.components.Model as (typeof PatchedModel)).customQuery = async function (query: string, filter: any,
                                                                                      bypassCache = false) {
      return this.dispatch('query', { query, filter, bypassCache });
    };

    // Register model convenience methods
    const model = context.components.Model.prototype;

    model.$mutate = async function (params: any) {
      if (!params['id']) params['id'] = this.id;
      return this.$dispatch('mutate', params);
    };

    model.$customQuery = async function (query: string, filter: any, bypassCache: boolean = false) {
      if (!filter['id']) filter['id'] = this.id;
      return this.$dispatch('query', { query, filter, bypassCache });
    };

    model.$persist = async function (args: any) {
      return this.$dispatch('persist', { id: this.id, args });
    };

    model.$push = async function (args: any) {
      return this.$dispatch('push', { data: this, args });
    };

    model.$destroy = async function () {
      return this.$dispatch('destroy', { id: this.id });
    };

    model.$deleteAndDestroy = async function () {
      await this.$delete();
      return this.$destroy();
    };
  }
}
