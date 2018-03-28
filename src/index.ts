import VuexORMApollo from './vuex-orm-apollo';

export default class VuexORMApolloPlugin {
  public instance?: VuexORMApollo;

  public static install (components: any, options: any): VuexORMApollo {
    const plugin = new VuexORMApolloPlugin();
    return plugin.install(components, options);
  }

  public install (components: any, options: any): VuexORMApollo {
    this.instance = new VuexORMApollo(components, options);
    return this.instance;
  }
}
