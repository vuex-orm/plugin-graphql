import Model from './model';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Data, ActionParams, Arguments, ORMModel } from './interfaces';
import Logger from './logger';
import QueryBuilder from './queryBuilder';
import { capitalizeFirstLetter } from './utils';

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
      uri: '/graphql'
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
   * This method will setup following Vuex action: fetch, persist, push, destroy
   */
  private setupMethods () {
    this.components.subActions.fetch = this.fetch.bind(this);

    this.components.subActions.persist = this.persist.bind(this);
    this.components.subActions.push = this.push.bind(this);
    // this.components.subActions.destroy = this.destroy.bind(this);
    // this.components.subActions.destroyAll = this.destroyAll.bind(this);
  }

  /**
   * Will be called, when dispatch('entities/something/fetch') is called.
   *
   * @param {Arguments} args
   * @param {any} state
   * @param {any} dispatch
   * @returns {Promise<void>}
   */
  private async fetch ({ state, dispatch, filter }: ActionParams) {
    // Send the request to the GraphQL API
    const query = this.queryBuilder.buildQuery(state.$name, filter);
    const data = await this.apolloRequest(query);

    // Insert incoming data into the store
    this.storeData(data, dispatch);
  }

  /**
   * Will be called, when dispatch('entities/something/persist') is called.
   *
   * @param {any} state
   * @param {any} dispatch
   * @param {any} id
   * @returns {Promise<void>}
   */
  private async persist ({ state, dispatch }: ActionParams, { data }: ActionParams) {
    return this.mutate('create', data, dispatch, this.getModel(state.$name));
  }

  /**
   * Will be called, when dispatch('entities/something/push') is called.
   * @param {any} state
   * @param {any} dispatch
   * @param {Data} data
   * @returns {Promise<Data | {}>}
   */
  private async push ({ state, dispatch }: ActionParams, { data }: ActionParams) {
    return this.mutate('update', data, dispatch, this.getModel(state.$name));
  }

  /**
   * Contains the logic to save (persist or push) data.
   *
   * @param {string} action
   * @param {Data | undefined} data
   * @param {Function} dispatch
   * @param {Model} model
   * @returns {Promise<any>}
   */
  private async mutate (action: string, data: Data | undefined, dispatch: Function, model: Model) {
    if (data) {
      const query = this.queryBuilder.buildMutation(model, action);

      // Send GraphQL Mutation
      const response = await this.apolloClient.mutate({
        'mutation': query,
        'variables': {
          [model.singularName]: this.queryBuilder.transformOutgoingData(data)
        }
      });

      // Remove the original data
      // FIXME how? https://github.com/vuex-orm/vuex-orm/issues/78
      // model.baseModel.dispatch('delete', { id });

      // Insert incoming data into the store
      const newData = this.queryBuilder.transformIncomingData(response.data as Data);
      this.storeData(newData, dispatch);

      return newData;
    }

    return {};
  }

  /**
   * Sends a query to the GraphQL API via apollo
   * @param query
   * @returns {Promise<Data>}
   */
  private async apolloRequest (query: any): Promise<Data> {
    const response = await (this.apolloClient).query({ query });

    // Transform incoming data into something useful
    return this.queryBuilder.transformIncomingData(response.data);
  }

  /**
   * Saves incoming data into the store.
   *
   * @param {Data} data
   * @param {Function} dispatch
   */
  private storeData (data: Data, dispatch: Function) {
    Object.keys(data).forEach((key) => {
      dispatch('insert', { data: data[key] });
    });
  }
}
