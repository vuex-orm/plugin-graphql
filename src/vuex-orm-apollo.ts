import Model from './model';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Data, ActionParams, Arguments, ORMModel, DispatchFunction } from './interfaces';
import Logger from './logger';
import QueryBuilder from './queryBuilder';
import { upcaseFirstLetter } from './utils';

const inflection = require('inflection');

/**
 * Plugin class
 */
export default class VuexORMApollo {
  private readonly httpLink: HttpLink;
  private readonly apolloClient: ApolloClient<any>;
  private readonly components: any;
  private readonly options: any;
  private readonly database: any;
  private readonly models: Map<string, Model> = new Map();
  private readonly debugMode: boolean = false;
  private readonly logger: Logger;
  private readonly queryBuilder: QueryBuilder;

  /**
   * Constructor
   *
   * @param components
   * @param options
   */
  public constructor (components: any, options: any) {
    this.components = components;
    this.options = options;

    if (!options.database) {
      throw new Error('database param is required to initialize vuex-orm-apollo!');
    }

    this.database = options.database;
    this.debugMode = options.debug as boolean;
    this.logger = new Logger(this.debugMode);

    this.collectModels();
    this.setupMethods();

    this.httpLink = new HttpLink({
      uri: options.url ? options.url : '/graphql'
    });

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });

    this.queryBuilder = new QueryBuilder(this.logger, this.getModel.bind(this));
  }

  /**
   * Returns a model by name
   *
   * @param {Model|string} model
   * @returns {Model}
   */
  public getModel (model: Model | string): Model {
    if (!(model instanceof Model)) {
      model = this.models.get(inflection.singularize(model)) as Model;
      if (!model) throw new Error(`No such model ${model}!`);
    }

    return model;
  }

  /**
   * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
   */
  private collectModels () {
    this.database.entities.forEach((entity: any) => {
      const model = new Model(entity.model as ORMModel);
      this.models.set(model.singularName, model);
    });
  }

  /**
   * This method will setup following Vuex action: fetch, persist, push, destroy, mutate
   */
  private setupMethods () {
    this.components.subActions.fetch = this.fetch.bind(this);
    this.components.subActions.persist = this.persist.bind(this);
    this.components.subActions.push = this.push.bind(this);
    this.components.subActions.destroy = this.destroy.bind(this);
    this.components.subActions.mutate = this.customMutation.bind(this);

    // this.components.subActions.destroyAll = this.destroyAll.bind(this);
  }

  /**
   * Will be called, when dispatch('entities/something/fetch') is called.
   *
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {ActionParams} filter Filter params for the query
   * @returns {Promise<void>}
   */
  private async fetch ({ state, dispatch }: ActionParams, filter: ActionParams): Promise<void> {
    // When the filter contains an id, we query in singular mode
    const multiple: boolean = !(filter && filter['id']);
    const model: Model = this.getModel(state.$name);
    const name: string = `${multiple ? model.pluralName : model.singularName}`;
    const query = this.queryBuilder.buildQuery('query', model, name, filter);

    // Send the request to the GraphQL API
    const data = await this.apolloRequest(query, filter);

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
  private async persist ({ state, dispatch }: ActionParams, { id }: ActionParams): Promise<any> {
    if (id) {
      const model = this.getModel(state.$name);
      const data = model.baseModel.getters('find')(id);

      const variables: Data = {
        [model.singularName]: this.queryBuilder.transformOutgoingData(data)
      };

      const mutationName = `create${upcaseFirstLetter(model.singularName)}`;
      await this.mutate(mutationName, variables, dispatch, model, false);

      // TODO is this really necessary?
      return model.baseModel.getters('find')(id);
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

    const model = this.getModel(state.$name);

    return this.mutate(name, args, dispatch, model);
  }

  /**
   * Will be called, when dispatch('entities/something/push') is called.
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} data New data to save
   * @returns {Promise<Data | {}>}
   */
  private async push ({ state, dispatch }: ActionParams, { data }: ActionParams) {
    if (data) {
      const model = this.getModel(state.$name);

      const variables: Data = {
        id: data.id,
        [model.singularName]: this.queryBuilder.transformOutgoingData(data)
      };

      const mutationName = `update${upcaseFirstLetter(model.singularName)}`;
      await this.mutate(mutationName, variables, dispatch, model, false);

      // TODO is this really necessary?
      return model.baseModel.getters('find')(data.id);
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
  private async destroy ({ state, dispatch }: ActionParams, { id }: ActionParams): Promise<any> {
    if (id) {
      const model = this.getModel(state.$name);
      const mutationName = `delete${upcaseFirstLetter(model.singularName)}`;
      return this.mutate(mutationName, { id }, dispatch, model, false);
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
      const newData = await this.apolloRequest(query, variables, true);

      if (id) return this.updateData(newData, dispatch, id);
      return null;
    }
  }

  /**
   * Sends a request to the GraphQL API via apollo
   * @param {any} query The query to send (result from gql())
   * @param {Arguments} variables Optional. The variables to send with the query
   * @param {boolean} mutation Optional. If this is a mutation (true) or a query (false, default)
   * @returns {Promise<Data>}
   */
  private async apolloRequest (query: any, variables?: Arguments, mutation: boolean = false): Promise<Data> {
    let response;

    if (mutation) {
      response = await this.apolloClient.mutate({ mutation: query, variables });
    } else {
      response = await this.apolloClient.query({ query, variables });
    }

    // Transform incoming data into something useful
    return this.queryBuilder.transformIncomingData(response.data as Data, mutation);
  }

  /**
   * Inserts incoming data into the store.
   *
   * @param {Data} data New data to insert/update
   * @param {Function} dispatch Vuex Dispatch method for the model
   */
  private async insertData (data: Data, dispatch: DispatchFunction) {
    Object.keys(data).forEach(async (key) => {
      await dispatch('insertOrUpdate', { data: data[key] });
    });
  }

  /**
   * Updates an existing record in the store with new data. This method can only update one single record, so
   * it takes the first record of the first field from the data object!
   * @param {Data} data
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @param {string|number} id ID of the record to update
   */
  private async updateData (data: Data, dispatch: DispatchFunction, id: number | string) {
    // We only take the first field!
    data = data[Object.keys(data)[0]];

    if (data instanceof Array) {
      data = data[0];
    }

    return dispatch('update', { where: id, data });
  }
}
