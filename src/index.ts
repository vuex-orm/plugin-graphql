import Model from './model';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Data, ActionParams, Field, Arguments, ORMModel } from './interfaces';
import Logger from './logger';
import { FetchResult } from 'apollo-link';
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
   * The install method will be called when the plugin should be installed. We create a new instance of the Plugin class
   * here.
   *
   * @param components
   * @param options
   * @returns {VuexORMApollo}
   */
  public static install (components: any, options: any): VuexORMApollo {
    return new VuexORMApollo(components, options);
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
    // Ignore empty filters
    if (filter && Object.keys(filter).length === 0) filter = undefined;

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
  private async persist ({ state, dispatch }: ActionParams, { id }: ActionParams): Promise<FetchResult> {
    const model = this.getModel(state.$name);
    const name = `create${capitalizeFirstLetter(model.singularName)}`;

    const data = model.baseModel.getters('find', { id })();

    // Send the request to the GraphQL API
    const signature = this.queryBuilder.buildArguments({ contract: { __type: 'Contract' } }, true);

    const query = `
      mutation ${name}${signature} {
        ${this.queryBuilder.buildField(model, false, { contract: { __type: 'Contract' } }, true, undefined, name)}
      }
    `;

    this.logger.logQuery(query);

    delete data.id;

    // Send GraphQL Mutation
    const newData = await this.apolloClient.mutate({
      'mutation': gql(query),
      'variables': {
        [model.singularName]: this.queryBuilder.transformOutgoingData(data)
      }
    });

    // Insert incoming data into the store
    this.storeData(newData, dispatch);

    return newData;
  }

  private async push ({ state, dispatch }: ActionParams, { id }: ActionParams) {
    // TODO
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
      dispatch('create', { data: data[key] });
    });
  }
}
