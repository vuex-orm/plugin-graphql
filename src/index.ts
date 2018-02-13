import Model from './model';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Data, ActionParams, Field, Arguments, ORMModel } from './interfaces';
import Logger from './logger';
import { FetchResult } from "apollo-link";

const inflection = require('inflection');

/**
 * Plugin class
 * TODO: Refactor to smaller classes
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
   * This method will setup following Vuex action: fetch, persist, push, destroy
   */
  private setupMethods () {
    this.components.subActions.fetch = this.fetch.bind(this);

    this.components.subActions.persist = this.persist.bind(this);
    this.components.subActions.push = this.push.bind(this);
    //this.components.subActions.destroy = this.destroy.bind(this);
    //this.components.subActions.destroyAll = this.destroyAll.bind(this);
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
    const query = this.buildQuery(state.$name, filter);
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
    const name = `create${VuexORMApollo.capitalizeFirstLetter(model.singularName)}`;


    const data = model.baseModel.getters('find', { id })();

    // Send the request to the GraphQL API
    const signature = VuexORMApollo.buildArguments({contract: {__type: 'Contract'}}, true);

    const query = `
      mutation ${name}${signature} {
        ${this.buildField(model, false, {contract: {__type: 'Contract'}}, true, undefined, name)}
      }
    `;

    this.logger.logQuery(query);

    delete data.id;

    // Send GraphQL Mutation
    const newData = await this.apolloClient.mutate({
      "mutation": gql(query),
      "variables": {
        [model.singularName]: this.transformOutgoingData(data)
      }
    });


    // Insert incoming data into the store
    this.storeData(newData, dispatch);

    return newData;
  }


  private async push({ state, dispatch }: ActionParams, { id }: ActionParams) {

  }


  private transformOutgoingData(data: Data): Data {
    const returnValue: Data = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Ignore IDs and connections
      if (!(value instanceof Array || key === 'id')) {
        returnValue[key] = value;
      }
    });

    return returnValue;
  }


  /**
   * Transforms a set of incoming data to the format vuex-orm requires.
   *
   * @param {Data | Array<Data>} data
   * @param {boolean} recursiveCall
   * @returns {Data}
   */
  private transformIncomingData (data: Data | Array<Data>, recursiveCall: boolean = false): Data {
    let result: Data = {};

    if (!recursiveCall) {
      this.logger.group('Transforming incoming data');
      this.logger.log('Raw data:', data);
    }

    if (data instanceof Array) {
      result = data.map(d => this.transformIncomingData(d, true));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof Object) {
            if (data[key].nodes) {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes, true);
            } else {
              result[inflection.singularize(key)] = this.transformIncomingData(data[key], true);
            }
          } else if (key === 'id') {
            result[key] = parseInt(data[key], 0);
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    if (!recursiveCall) {
      this.logger.log('Transformed data:', result);
      this.logger.groupEnd();
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
        relationQueries.push(this.buildField(name, multiple, undefined, false, rootModel || model));
      }
    });

    return relationQueries;
  }

  /**
   * Builds a field for the GraphQL query and a specific model
   * @param {Model|string} model
   * @param {boolean} multiple
   * @param {Arguments} args
   * @param {boolean} withVars
   * @param {Model} rootModel
   * @param {string} name
   * @returns {string}
   */
  private buildField (model: Model|string, multiple: boolean = true, args?: Arguments, withVars: boolean = false, rootModel?: Model, name?: string): string {
    model = this.getModel(model);

    let params: string = VuexORMApollo.buildArguments(args, false, withVars);

    const fields = `
      ${model.getQueryFields().join(' ')}
      ${this.buildRelationsQuery(model, rootModel)}
    `;

    if (multiple) {
      return `
        ${name ? name : model.pluralName}${params} {
          nodes {
            ${fields}
          }
        }
      `;
    } else {
      return `
        ${name ? name : model.singularName}${params} {
          ${fields}
        }
      `;
    }
  }

  /**
   * Create a GraphQL query for the given model and arguments.
   *
   * @param {string} modelName
   * @param {Arguments} args
   * @returns {any}
   */
  private buildQuery (modelName: string, args?: Arguments): any {
    const multiple = !(args && args.get('id'));
    const query = `{ ${this.buildField(modelName, multiple, args)} }`;
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
      dispatch('create', { data: data[key] });
    });
  }

  /**
   * Returns a model by name
   *
   * @param {Model|string} model
   * @returns {Model}
   */
  private getModel (model: Model|string): Model {
    if (!(model instanceof Model)) {
      model = this.models.get(inflection.singularize(model)) as Model;
      if (!model) throw new Error(`No such model ${model}!`);
    }

    return model;
  }

  /**
   * Capitalizes the first letter of the given string.
   *
   * @param {string} string
   * @returns {string}
   */
  private static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  /**
   * Generates the arguments string for a graphql query based on a given map.
   *
   * There are three types of arguments:
   *
   * 1) Signatures with attributes (signature = true)
   *      mutation createUser($name: String!)
   *
   * 2) Signatures with object (signature = true, args = { user: { __type: 'User' }})
   *      mutation createUser($user: User!)
   *
   * 3) Field with values (signature = false, valuesAsVariables = false)
   *      user(id: 15)
   *
   * 4) Field with variables (signature = false, valuesAsVariables = true)
   *      user(id: $id)
   *
   * 5) Field with object value (signature = false, valuesAsVariables = false, args = { user: { __type: 'User' }})
   *      createUser(user: {...})
   *
   * @param {Arguments | undefined} args
   * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
   * @param {boolean} valuesAsVariables When true and abstract = false, then this method generates filter arguments with
   *                           variables instead of values
   * TODO: Query with variables too?
   * @returns {String}
   */
  private static buildArguments(args: Arguments | undefined, signature: boolean = false,
                                valuesAsVariables: boolean = false): string {
    let returnValue: string = '';
    let any: boolean = false;

    if (args) {
      Object.keys(args).forEach((key: string) => {
        let value: any = args[key];

        // Ignore ids and connections
        if (!(value instanceof Array || key === 'id')) {
          any = true;
          let typeOrValue: any = '';

          if (signature) {
            if (typeof value === 'object' && value.__type) {
              // Case 2 (User!)
              typeOrValue = value.__type + 'Input!';
            } else {
              // Case 1 (String!)
              typeOrValue = typeof value === 'number' ? 'Number!' : 'String!';
            }
          } else if (valuesAsVariables) {
              // Case 6 (user: $user)
              typeOrValue = `$${key}`;
          } else {
            if (typeof value === 'object' && value.__type) {
              // Case 3 ({name: 'Helga Hufflepuff"})
              typeOrValue = value;
            } else {
              // Case 3 ("someValue")
              typeOrValue = typeof value === 'number' ? value : `"${value}"`;
            }
          }

          returnValue = `${returnValue} ${(signature ? '$' : '') + key}: ${typeOrValue}`;
        }
      });

      if (any) returnValue = `(${returnValue})`;
    }

    return returnValue;
  }
}
