import Model from './model';
import { ApolloClient, FetchPolicy } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Data, ActionParams, Arguments, DispatchFunction } from './interfaces';
import QueryBuilder from './queryBuilder';
import { upcaseFirstLetter } from './utils';
import Context from './context';
import { Components } from '@vuex-orm/core/lib/plugins/use';

const inflection = require('inflection');

/**
 * Plugin class
 */
export default class VuexORMApollo {
  // Public for testing purposes
  public readonly queryBuilder: QueryBuilder;
  public readonly context: Context;
  private readonly httpLink: HttpLink;
  private readonly apolloClient: ApolloClient<any>;

  /**
   * Constructor
   *
   * @param components
   * @param options
   */
  public constructor (components: Components, options: any) {
    this.context = new Context(components, options);

    this.setupMethods();

    this.httpLink = new HttpLink({
      uri: options.url ? options.url : '/graphql',
      credentials: 'same-origin'
    });

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: this.context.debugMode
    });

    this.queryBuilder = new QueryBuilder(this.context);
  }

  /**
   * Updates an existing record in the store with new data. This method can only update one single record, so
   * it takes the first record of the first field from the data object!
   * @param {Data} data
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @param {string|number} id ID of the record to update
   */
  private static async updateData (data: Data, dispatch: DispatchFunction, id: number | string) {
    // We only take the first field!
    data = data[Object.keys(data)[0]];

    if (data instanceof Array) {
      data = data[0];
    }

    return dispatch('update', { where: id, data });
  }

  /**
   * This method will setup following Vuex action: fetch, persist, push, destroy, mutate
   */
  private setupMethods () {
    this.context.components.subActions.fetch = this.fetch.bind(this);
    this.context.components.subActions.persist = this.persist.bind(this);
    this.context.components.subActions.push = this.push.bind(this);
    this.context.components.subActions.destroy = this.destroy.bind(this);
    this.context.components.subActions.mutate = this.customMutation.bind(this);

    // this.components.subActions.destroyAll = this.destroyAll.bind(this);
  }

  /**
   * Will be called, when dispatch('entities/something/fetch') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {ActionParams} params
   * @returns {Promise<void>}
   */
  private async fetch ({ state, dispatch }: ActionParams, params?: ActionParams): Promise<void> {
    const filter = params ? params.filter || {} : {};
    const bypassCache = params && params.bypassCache;

    // When the filter contains an id, we query in singular mode
    const multiple: boolean = !filter['id'];
    const model: Model = this.context.getModel(state.$name);
    const name: string = `${multiple ? model.pluralName : model.singularName}`;
    const query = this.queryBuilder.buildQuery('query', model, name, filter);

    // Send the request to the GraphQL API
    const data = await this.apolloRequest(model, query, filter, false, bypassCache as boolean);

    // Insert incoming data into the store
    await this.insertData(data, dispatch);
  }

  /**
   * Will be called, when dispatch('entities/something/persist') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to persist
   * @returns {Promise<void>}
   */
  private async persist ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<any> {
    if (id) {
      const model = this.context.getModel(state.$name);
      const data = model.baseModel.getters('find')(id);

      args = args || {};
      args[model.singularName] = this.queryBuilder.transformOutgoingData(model, data);

      const mutationName = `create${upcaseFirstLetter(model.singularName)}`;
      const newRecord = await this.mutate(mutationName, args, dispatch, model, false);

      const oldRecord = model.baseModel.getters('find')(id);

      if (oldRecord && !oldRecord.$isPersisted) {
        // The server generated another ID, this is very likely to happen.
        // in this case this.mutate has inserted a new record instead of updating the existing one.
        // We can see that because $isPersisted is still false then.
        this.context.logger.log('Dropping deprecated record with ID', oldRecord.id);
        await model.baseModel.dispatch('delete', { where: oldRecord.id });
      }

      return newRecord;
    }
  }

  /**
   * Will be called, when dispatch('entities/something/mutate') is called.
   * For custom mutations.
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} args Arguments for the mutation. Must contain a 'mutation' field.
   * @returns {Promise<any>}
   */
  private async customMutation ({ state, dispatch }: ActionParams, args: Arguments): Promise<any> {
    const name: string = args['mutation'];
    delete args['mutation'];

    // There could be anything in the args, but we have to be sure that all records are gone through
    // transformOutgoingData()
    Object.keys(args).forEach((key: string) => {
      const value: any = args[key];

      if (value instanceof this.context.components.Model) {
        const model = this.context.getModel(inflection.singularize(value.$self().entity));
        const transformedValue = this.queryBuilder.transformOutgoingData(model, value);
        this.context.logger.log('A', key, 'model was found within the variables and will be transformed from', value, 'to', transformedValue);
        args[key] = transformedValue;
      }
    });

    const model = this.context.getModel(state.$name);

    return this.mutate(name, args, dispatch, model, false);
  }

  /**
   * Will be called, when dispatch('entities/something/push') is called.
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} data New data to save
   * @returns {Promise<Data | {}>}
   */
  private async push ({ state, dispatch }: ActionParams, { data, args }: ActionParams) {
    if (data) {
      const model = this.context.getModel(state.$name);

      args = args || {};
      args['id'] = data.id;
      args[model.singularName] = this.queryBuilder.transformOutgoingData(model, data);

      const mutationName = `update${upcaseFirstLetter(model.singularName)}`;
      return this.mutate(mutationName, args, dispatch, model, false);
    }
  }

  /**
   * Will be called, when dispatch('entities/something/destroy') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to delete
   * @returns {Promise<void>}
   */
  private async destroy ({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<any> {
    if (id) {
      const model = this.context.getModel(state.$name);
      const mutationName = `delete${upcaseFirstLetter(model.singularName)}`;

      args = args || {};
      args['id'] = id;

      return this.mutate(mutationName, args, dispatch, model, false);
    }
  }

  /**
   * Sends a mutation.
   *
   * @param {string} name Name of the mutation like 'createUser'
   * @param {Data | undefined} variables Variables to send with the mutation
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @param {Model} model The model this mutation affects.
   * @param {boolean} multiple See QueryBuilder.buildQuery()
   * @returns {Promise<any>}
   */
  private async mutate (name: string, variables: Data | undefined, dispatch: DispatchFunction, model: Model, multiple?: boolean): Promise<any> {
    if (variables) {
      const id = variables.id ? variables.id : undefined;
      const query = this.queryBuilder.buildQuery('mutation', model, name, variables, multiple);

      // Send GraphQL Mutation
      const newData = await this.apolloRequest(model, query, variables, true);

      if (name !== `delete${upcaseFirstLetter(model.singularName)}`) {
        const insertedData: Data = await this.insertData(newData, dispatch);

        if (insertedData[model.pluralName] && insertedData[model.pluralName][0]) {
          return insertedData[model.pluralName][0];
        } else {
          this.context.logger.log("Couldn't find the record of type", model.pluralName, 'in', insertedData,
            '. Fallback to find()');
          return model.baseModel.getters('query')().last();
        }
      }

      return true;
    }
  }

  /**
   * Sends a request to the GraphQL API via apollo
   * @param model
   * @param {any} query The query to send (result from gql())
   * @param {Arguments} variables Optional. The variables to send with the query
   * @param {boolean} mutation Optional. If this is a mutation (true) or a query (false, default)
   * @param {boolean} bypassCache If true the query will be send to the server without using the cache. For queries only
   * @returns {Promise<Data>}
   */
  private async apolloRequest (model: Model, query: any, variables?: Arguments, mutation: boolean = false,
                               bypassCache: boolean = false): Promise<Data> {
    let response;
    const fetchPolicy: FetchPolicy = bypassCache ? 'network-only' : 'cache-first';

    this.context.logger.logQuery(query, variables, fetchPolicy);

    if (mutation) {
      response = await this.apolloClient.mutate({ mutation: query, variables });
    } else {
      response = await this.apolloClient.query({ query, variables, fetchPolicy });
    }

    // Transform incoming data into something useful
    return this.queryBuilder.transformIncomingData(response.data as Data, model, mutation);
  }

  /**
   * Inserts incoming data into the store.
   *
   * @param {Data} data New data to insert/update
   * @param {Function} dispatch Vuex Dispatch method for the model
   */
  private async insertData (data: Data, dispatch: DispatchFunction): Promise<Data> {
    let insertedData: Data = {};

    Object.keys(data).forEach(async (key) => {
      const value = data[key];
      this.context.logger.log('Inserting records', value);
      const newData = await dispatch('insertOrUpdate', { data:  value });

      Object.keys(newData).forEach((dataKey) => {
        if (!insertedData[dataKey]) insertedData[dataKey] = [];
        insertedData[dataKey] = insertedData[dataKey].concat(newData[dataKey]);
      });
    });

    return insertedData;
  }
}
