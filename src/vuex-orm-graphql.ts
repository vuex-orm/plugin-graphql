import { PatchedModel, Options, ActionParams } from './support/interfaces';
import Context from './common/context';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Destroy, Fetch, Mutate, Persist, Push } from './actions';
import Query from './actions/query';
import SimpleQuery from './actions/simple-query';
import SimpleMutation from './actions/simple-mutation';
import * as _ from 'lodash-es';
import InsertPaginationData from './actions/insertPaginationData';
import CommitPagination from './mutations/commitPagination';

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMGraphQL {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor (components: Components, options: Options) {
    Context.setup(components, options);
    VuexORMGraphQL.setupActions();
    VuexORMGraphQL.setupModelMethods();
    VuexORMGraphQL.setupPagination();
  }

  /**
   * Allow everything to read the context.
   */
  public getContext (): Context {
    return Context.getInstance();
  }

  /**
   * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
   */
  private static setupActions () {
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
  private static setupModelMethods () {
    const context = Context.getInstance();

    // Register static model convenience methods
    (context.components.Model as (typeof PatchedModel)).fetch = async function (filter?: any, extraArgs?: any, bypassCache = false) {
      let filterObj = filter;
      if (!_.isPlainObject(filterObj)) filterObj = { id: filter };
      return this.dispatch('fetch', { filter: filterObj, extraArgs, bypassCache });
    };

    (context.components.Model as (typeof PatchedModel)).mutate = async function (params: ActionParams) {
      return this.dispatch('mutate', params);
    };

    (context.components.Model as (typeof PatchedModel)).customQuery = async function ({ name, filter, multiple, bypassCache }: ActionParams) {
      return this.dispatch('query', { name, filter, multiple, bypassCache });
    };

    // Register model convenience methods
    const model = context.components.Model.prototype;

    model.$mutate = async function ({ name, args, multiple }: ActionParams) {
      args = args || {};
      if (!args['id']) args['id'] = this.id;
      return this.$dispatch('mutate', { name, args, multiple });
    };

    model.$customQuery = async function ({ name, filter, multiple, bypassCache }: ActionParams) {
      filter = filter || {};
      if (!filter['id']) filter['id'] = this.id;
      return this.$dispatch('query', { name, filter, multiple, bypassCache });
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

  /**
   * This method will setup pageInfo for state and getters.
   * Only when relay is used for connectionQueryMode.
   */
  private static setupPagination () {
    const context = Context.getInstance();

    console.log(context.connectionQueryMode);

    _.map(context.database.entities, (entity: any) => {
      if (entity.module.state) {
        // Adding pagination to state.
        entity.module.state.pagination = {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: ''
        };
      }

      if (entity.module.getters) {
        // Adding pagination to getters.
        entity.module.getters.pagination = (state: any) => {
          return state.pagination;
        };
      }
    });

    // Adding commitPagination to rootMutations.
    context.components.RootMutations.commitPagination = CommitPagination.call.bind(CommitPagination);

    // Adding insertPaginationData to actions.
    context.components.Actions.insertPaginationData = InsertPaginationData.call.bind(InsertPaginationData);
  }
}
