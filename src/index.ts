import VuexORMApollo from './vuex-orm-apollo';

export default class VuexORMApolloPlugin {
  public static install (components: any, options: any): VuexORMApollo {
    return new VuexORMApollo(components, options);
  }
}
