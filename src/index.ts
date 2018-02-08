import Model from './model';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Data, FetchParams, Field, Filter, ORMModel } from './interfaces';

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

  /**
   * Constructor
   *
   * @param components
   * @param options
   */
  public constructor (components: any, options: any) {
    this.components = components;
    this.options = options;
    this.database = options.database;

    this.collectModels();
    this.setupFetch();

    this.httpLink = new HttpLink({
      uri: '/graphql'
    });

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
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
   * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
   */
  private collectModels () {
    this.database.entities.forEach((entity: any) => {
      const model = new Model(entity.model as ORMModel);
      this.models.set(model.singularName, model);
    });
  }

  /**
   * This method will setup the fetch action for all entities.
   */
  private setupFetch () {
    this.components.subActions.fetch = this.fetch.bind(this);
  }

  /**
   * Will be called, when dispatch('entities/something/fetch') is called.
   *
   * @param {Filter} filter
   * @param {any} state
   * @param {any} dispatch
   * @returns {Promise<void>}
   */
  private async fetch ({ filter, state, dispatch }: FetchParams) {
    // Ignore empty filters
    if (filter && Object.keys(filter).length === 0) filter = undefined;

    // Send the request to the GraphQL API
    const query = this.buildQuery(state.$name, filter);
    const data = await this.apolloRequest(query);

    // Insert incoming data into the store
    this.storeData(data, dispatch);
  }

  /**
   * Transforms a set of incoming data to the format vuex-orm requires.
   *
   * @param {Data | Array<Data>} data
   * @returns {Data}
   */
  private transformIncomingData (data: Data | Array<Data>): Data {
    let result: Data = {};

    if (data instanceof Array) {
      result = data.map(d => this.transformIncomingData(d));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof Object) {
            if (data[key].nodes) {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes);
            } else {
              result[inflection.singularize(key)] = this.transformIncomingData(data[key]);
            }
          } else if (key === 'id') {
            result[key] = parseInt(data[key], 0);
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    return result;
  }

  /**
   *
   * @param {Model} model
   * @param {Model} rootModel
   * @returns {Array<String>}
   */
  private buildRelationsQuery (model: Model, rootModel?: Model) {
    const relationQueries: Array<string> = [];

    model.getRelations().forEach((field: Field, name: string) => {
      if (!rootModel || name !== rootModel.singularName && name !== rootModel.pluralName) {
        const multiple: boolean = field.constructor.name !== 'BelongsTo';
        relationQueries.push(this.buildField(name, multiple, undefined, rootModel || model));
      }
    });

    return relationQueries;
  }

  /**
   * Builds a field for the GraphQL query and a specific model
   * @param {Model} rootModel
   * @param {string} modelName
   * @param {boolean} multiple
   * @param {Filter} filter
   * @returns {string}
   */
  private buildField (modelName: string, multiple: boolean = true, filter?: Filter, rootModel?: Model): string {
    const model = this.getModel(modelName);
    let params: string = '';

    if (filter && filter.id) {
      params = `(id: ${filter.id})`;
    }

    if (multiple) {
      return `${model.pluralName}${params} {
                nodes {
                    ${model.getQueryFields().join(', ')}
                    ${this.buildRelationsQuery(model, rootModel)}
                }
            }`;
    } else {
      return `${model.singularName}${params} {
                ${model.getQueryFields().join(', ')}
                ${this.buildRelationsQuery(model, rootModel)}
            }`;
    }
  }

  /**
   * Create a GraphQL query for the given model and filter options.
   *
   * @param {string} modelName
   * @param {Filter} filter
   * @returns {any}
   */
  private buildQuery (modelName: string, filter?: Filter): any {
    const multiple = !(filter && filter.id);
    const query = `{ ${this.buildField(modelName, multiple, filter)} }`;
    return gql(query);
  }

  /**
   * Sends a query to the GraphQL API via apollo
   * @param query
   * @returns {Promise<Data>}
   */
  private async apolloRequest (query: any): Promise<Data> {
    const response = await (this.apolloClient).query({ query });

    // Transform incoming data into something useful
    return this.transformIncomingData(response.data);
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

  /**
   * Returns a model by name
   *
   * @param {string} modelName
   * @returns {Model}
   */
  private getModel (modelName: string): Model {
    const model = this.models.get(inflection.singularize(modelName));
    if (!model) throw new Error(`No such model ${modelName}!`);
    return model;
  }
}
