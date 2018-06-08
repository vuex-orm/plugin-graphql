import { PatchedModel, Options } from './support/interfaces';
import Context from './common/context';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import Fetch from "./actions/fetch";
import Push from "./actions/push";
import Persist from "./actions/persist";
import Destroy from "./actions/destroy";
import Mutate from "./actions/Mutate";

/**
 * Plugin class
 */
export default class VuexORMApollo {
  // Public for testing purposes
  public context!: Context;

  /**
   * Constructor
   *
   * @param components
   * @param options
   */
  public constructor (components: Components, options: Options) {
    this.setupContext(components, options);
    this.setupActions();
    this.setupModelMethods();
  }

  private setupContext(components: Components, options: Options) {
    this.context = Context.setup(components, options);
  }

  /**
   * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
   */
  private setupActions() {

    this.context.components.subActions.fetch = Fetch.call.bind(Fetch);
    this.context.components.subActions.persist = Persist.call.bind(Persist);
    this.context.components.subActions.push = Push.call.bind(Push);
    this.context.components.subActions.destroy = Destroy.call.bind(Destroy);
    this.context.components.subActions.mutate = Mutate.call.bind(Mutate);
  }

  /**
   * This method will setup following model methods: Model.fetch, Model.mutate, record.$mutate, record.$persist,
   * record.$push, record.$destroy and record.$deleteAndDestroy
   */
  private setupModelMethods () {
    // Register static model convenience methods
    (this.context.components.Model as (typeof PatchedModel)).fetch = async function (filter: any, bypassCache = false) {
      let filterObj = filter;
      if (typeof filterObj !== 'object') filterObj = { id: filter };
      return this.dispatch('fetch', { filter: filterObj, bypassCache });
    };

    (this.context.components.Model as (typeof PatchedModel)).mutate = async function (params: any) {
      return this.dispatch('mutate', params);
    };


    // Register model convenience methods
    this.context.components.Model.prototype.$mutate = async function (params: any) {
      if (!params['id']) params['id'] = this.id;
      return this.$dispatch('mutate', params);
    };

    this.context.components.Model.prototype.$persist = async function (args: any) {
      return this.$dispatch('persist', { id: this.id, args });
    };

    this.context.components.Model.prototype.$push = async function (args: any) {
      return this.$dispatch('push', { data: this, args });
    };

    this.context.components.Model.prototype.$destroy = async function () {
      return this.$dispatch('destroy', { id: this.id });
    };

    this.context.components.Model.prototype.$deleteAndDestroy = async function () {
      await this.$delete();
      return this.$destroy();
    };
  }
}
