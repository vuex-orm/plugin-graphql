import VuexORMApollo from './vuex-orm-apollo';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Options } from './support/interfaces';

/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
export default class VuexORMApolloPlugin {
  /**
   * Contains the instance of VuexORMApollo
   */
  public instance!: VuexORMApollo;

  /**
   * This is called, when VuexORM.install(VuexOrmApollo, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexORMApollo}
   */
  public static install (components: Components, options: Options): VuexORMApollo {
    const plugin = new VuexORMApolloPlugin();
    plugin.instance = new VuexORMApollo(components, options);

    return plugin.instance;
  }
}
