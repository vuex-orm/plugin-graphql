import Logger from "./logger";
import Model from "../orm/model";
import { PluginComponents } from "@vuex-orm/core/lib/plugins/use";
import Apollo from "../graphql/apollo";
import Database from "@vuex-orm/core/lib/database/Database";
import { Options } from "../support/interfaces";
import Schema from "../graphql/schema";
import { Mock, MockOptions } from "../test-utils";
import Adapter, { ConnectionMode } from "../adapters/adapter";
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
    static instance: Context;
    /**
     * Components collection of Vuex-ORM
     * @type {PluginComponents}
     */
    readonly components: PluginComponents;
    /**
     * The options which have been passed to VuexOrm.install
     * @type {Options}
     */
    readonly options: Options;
    /**
     * GraphQL Adapter.
     * @type {Adapter}
     */
    readonly adapter: Adapter;
    /**
     * The Vuex-ORM database
     * @type {Database}
     */
    readonly database: Database;
    /**
     * Collection of all Vuex-ORM models wrapped in a Model instance.
     * @type {Map<any, any>}
     */
    readonly models: Map<string, Model>;
    /**
     * When true, the logging is enabled.
     * @type {boolean}
     */
    readonly debugMode: boolean;
    /**
     * Our nice Vuex-ORM-GraphQL logger
     * @type {Logger}
     */
    readonly logger: Logger;
    /**
     * Instance of Apollo which cares about the communication with the graphql endpoint.
     * @type {Apollo}
     */
    apollo: Apollo;
    /**
     * The graphql schema. Is null until the first request.
     * @type {Schema}
     */
    schema: Schema | undefined;
    /**
     * Tells if the schema is already loaded or the loading is currently processed.
     * @type {boolean}
     */
    private schemaWillBeLoaded;
    /**
     * Defines how to query connections. 'auto' | 'nodes' | 'edges' | 'plain' | 'items'
     */
    connectionMode: ConnectionMode;
    /**
     * Container for the global mocks.
     * @type {Object}
     */
    private globalMocks;
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {PluginComponents} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    private constructor();
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    static getInstance(): Context;
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {PluginComponents} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {Context}
     */
    static setup(components: PluginComponents, options: Options): Context;
    loadSchema(): Promise<Schema>;
    processSchema(): void;
    /**
     * Returns a model from the model collection by it's name
     *
     * @param {Model|string} model A Model instance, a singular or plural name of the model
     * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
     *                            found. Default is false
     * @returns {Model}
     */
    getModel(model: Model | string, allowNull?: boolean): Model;
    /**
     * Will add a mock for simple mutations or queries. These are model unrelated and have to be
     * handled  globally.
     *
     * @param {Mock} mock - Mock config.
     */
    addGlobalMock(mock: Mock): boolean;
    /**
     * Finds a global mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions like { name: 'example' }.
     * @returns {Mock | null} null when no mock was found.
     */
    findGlobalMock(action: string, options: MockOptions | undefined): Mock | null;
    /**
     * Hook to be called by simpleMutation and simpleQuery actions in order to get the global mock
     * returnValue.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    globalMockHook(action: string, options: MockOptions): any;
    /**
     * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
     */
    private collectModels;
}
