import Logger from "./logger";
import Model from "../orm/model";
import { Model as ORMModel } from "@vuex-orm/core";
import { PluginComponents } from "@vuex-orm/core/lib/plugins/use";
import { downcaseFirstLetter, isEqual, pick, singularize } from "../support/utils";
import Apollo from "../graphql/apollo";
import Database from "@vuex-orm/core/lib/database/Database";
import { Data, Field, GraphQLType, Options } from "../support/interfaces";
import Schema from "../graphql/schema";
import { Mock, MockOptions } from "../test-utils";
import Adapter, { ConnectionMode } from "../adapters/adapter";
import DefaultAdapter from "../adapters/builtin/default-adapter";
import introspectionQuery from "../graphql/introspection-query";

/**
 * Internal context of the plugin. This class contains all information, the models, database, logger and so on.
 *
 * It's a singleton class, so just call Context.getInstance() anywhere you need the context.
 */
export default class Context {
  /**
   * Contains the instance for the singleton pattern.
   * @type {Context}
   */
  public static instance: Context;

  /**
   * Components collection of Vuex-ORM
   * @type {PluginComponents}
   */
  public readonly components: PluginComponents;

  /**
   * The options which have been passed to VuexOrm.install
   * @type {Options}
   */
  public readonly options: Options;

  /**
   * GraphQL Adapter.
   * @type {Adapter}
   */
  public readonly adapter: Adapter;

  /**
   * The Vuex-ORM database
   * @type {Database}
   */
  public readonly database: Database;

  /**
   * Collection of all Vuex-ORM models wrapped in a Model instance.
   * @type {Map<any, any>}
   */
  public readonly models: Map<string, Model> = new Map();

  /**
   * When true, the logging is enabled.
   * @type {boolean}
   */
  public readonly debugMode: boolean = false;

  /**
   * Our nice Vuex-ORM-GraphQL logger
   * @type {Logger}
   */
  public readonly logger: Logger;

  /**
   * Instance of Apollo which cares about the communication with the graphql endpoint.
   * @type {Apollo}
   */
  public apollo!: Apollo;

  /**
   * The graphql schema. Is null until the first request.
   * @type {Schema}
   */
  public schema: Schema | undefined;

  /**
   * Tells if the schema is already loaded or the loading is currently processed.
   * @type {boolean}
   */
  private schemaWillBeLoaded: Promise<Schema> | undefined;

  /**
   * Defines how to query connections. 'auto' | 'nodes' | 'edges' | 'plain'
   */
  public connectionMode: ConnectionMode = ConnectionMode.AUTO;

  /**
   * Container for the global mocks.
   * @type {Object}
   */
  private globalMocks: { [key: string]: Array<Mock> } = {};

  /**
   * Private constructor, called by the setup method
   *
   * @constructor
   * @param {PluginComponents} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  private constructor(components: PluginComponents, options: Options) {
    this.components = components;
    this.options = options;

    this.database = options.database;
    this.debugMode = Boolean(options.debug);
    this.logger = new Logger(this.debugMode);
    this.adapter = options.adapter || new DefaultAdapter();

    /* istanbul ignore next */
    if (!options.database) {
      throw new Error("database param is required to initialize vuex-orm-graphql!");
    }
  }

  /**
   * Get the singleton instance of the context.
   * @returns {Context}
   */
  public static getInstance(): Context {
    return this.instance;
  }

  /**
   * This is called only once and creates a new instance of the Context.
   * @param {PluginComponents} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {Context}
   */
  public static setup(components: PluginComponents, options: Options): Context {
    this.instance = new Context(components, options);

    this.instance.apollo = new Apollo();
    this.instance.collectModels();

    this.instance.logger.group("Context setup");
    this.instance.logger.log("components", this.instance.components);
    this.instance.logger.log("options", this.instance.options);
    this.instance.logger.log("database", this.instance.database);
    this.instance.logger.log("models", this.instance.models);
    this.instance.logger.groupEnd();

    return this.instance;
  }

  public async loadSchema(): Promise<Schema> {
    if (!this.schemaWillBeLoaded) {
      this.schemaWillBeLoaded = new Promise(async (resolve, reject) => {
        this.logger.log("Fetching GraphQL Schema initially ...");

        this.connectionMode = this.adapter.getConnectionMode();

        // We send a custom header along with the request. This is required for our test suite to mock the schema request.
        const context = {
          headers: { "X-GraphQL-Introspection-Query": "true" }
        };

        const result = await this.apollo.simpleQuery(
          introspectionQuery,
          {},
          true,
          (context as unknown) as Data
        );

        this.schema = new Schema(result.data.__schema);

        this.logger.log("GraphQL Schema successful fetched", result);

        this.logger.log("Starting to process the schema ...");
        this.processSchema();
        this.logger.log("Schema procession done!");

        resolve(this.schema);
      });
    }

    return this.schemaWillBeLoaded;
  }

  public processSchema() {
    this.models.forEach((model: Model) => {
      let type: GraphQLType;

      try {
        type = this.schema!.getType(model.singularName)!;
      } catch (error) {
        this.logger.warn(`Ignoring entity ${model.singularName} because it's not in the schema.`);
        return;
      }

      model.fields.forEach((field: Field, fieldName: string) => {
        if (!type.fields!.find(f => f.name === fieldName)) {
          this.logger.warn(
            `Ignoring field ${model.singularName}.${fieldName} because it's not in the schema.`
          );

          // TODO: Move skipFields to the model
          model.baseModel.skipFields = model.baseModel.skipFields ? model.baseModel.skipFields : [];
          if (!model.baseModel.skipFields.includes(fieldName)) {
            model.baseModel.skipFields.push(fieldName);
          }
        }
      });
    });

    if (this.connectionMode === ConnectionMode.AUTO) {
      this.connectionMode = this.schema!.determineQueryMode();
      this.logger.log(`Connection Query Mode is ${this.connectionMode} by automatic detection`);
    } else {
      this.logger.log(`Connection Query Mode is ${this.connectionMode} by config`);
    }
  }

  /**
   * Returns a model from the model collection by it's name
   *
   * @param {Model|string} model A Model instance, a singular or plural name of the model
   * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
   *                            found. Default is false
   * @returns {Model}
   */
  public getModel(model: Model | string, allowNull: boolean = false): Model {
    if (typeof model === "string") {
      const name: string = singularize(downcaseFirstLetter(model));
      model = this.models.get(name) as Model;
      if (!allowNull && !model) throw new Error(`No such model ${name}!`);
    }

    return model;
  }

  /**
   * Will add a mock for simple mutations or queries. These are model unrelated and have to be
   * handled  globally.
   *
   * @param {Mock} mock - Mock config.
   */
  public addGlobalMock(mock: Mock): boolean {
    if (this.findGlobalMock(mock.action, mock.options)) return false;
    if (!this.globalMocks[mock.action]) this.globalMocks[mock.action] = [];

    this.globalMocks[mock.action].push(mock);
    return true;
  }

  /**
   * Finds a global mock for the given action and options.
   *
   * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
   * @param {MockOptions} options - MockOptions like { name: 'example' }.
   * @returns {Mock | null} null when no mock was found.
   */
  public findGlobalMock(action: string, options: MockOptions | undefined): Mock | null {
    if (this.globalMocks[action]) {
      return (
        this.globalMocks[action].find(m => {
          if (!m.options || !options) return true;

          const relevantOptions = pick(options, Object.keys(m.options));
          return isEqual(relevantOptions, m.options || {});
        }) || null
      );
    }

    return null;
  }

  /**
   * Hook to be called by simpleMutation and simpleQuery actions in order to get the global mock
   * returnValue.
   *
   * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
   * @param {MockOptions} options - MockOptions.
   * @returns {any} null when no mock was found.
   */
  public globalMockHook(action: string, options: MockOptions): any {
    let returnValue: null | { [key: string]: any } = null;
    const mock = this.findGlobalMock(action, options);

    if (mock) {
      if (mock.returnValue instanceof Function) {
        returnValue = mock.returnValue();
      } else {
        returnValue = mock.returnValue || null;
      }
    }

    return returnValue;
  }

  /**
   * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
   */
  private collectModels() {
    this.database.entities.forEach((entity: any) => {
      const model: Model = new Model(entity.model as typeof ORMModel);
      this.models.set(model.singularName, model);
      Model.augment(model);
    });
  }
}
