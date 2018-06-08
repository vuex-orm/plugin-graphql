import Logger from './logger';
import Model from '../orm/model';
import ORMModel from '@vuex-orm/core/lib/model/Model';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import { downcaseFirstLetter } from '../support/utils';
import Apollo from '../graphql/apollo';
import Database from '@vuex-orm/core/lib/database/Database';
import { Options } from '../support/interfaces';
const inflection = require('inflection');

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
   * @type {Components}
   */
  public readonly components: Components;

  /**
   * The options which have been passed to VuexOrm.install
   * @type {Options}
   */
  public readonly options: Options;

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
   * Our nice Vuex-ORM-Apollo logger
   * @type {Logger}
   */
  public readonly logger: Logger;

  /**
   * Instance of Apollo which cares about the communication with the graphql endpoint.
   */
  public apollo!: Apollo;

  /**
   * Private constructor, called by the setup method
   *
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  private constructor (components: Components, options: Options) {
    this.components = components;
    this.options = options;

    this.database = options.database;
    this.debugMode = Boolean(options.debug);
    this.logger = new Logger(this.debugMode);

    if (!options.database) {
      throw new Error('database param is required to initialize vuex-orm-apollo!');
    }
  }

  /**
   * Get the singleton instance of the context.
   * @returns {Context}
   */
  public static getInstance (): Context {
    return this.instance;
  }

  /**
   * This is called only once and creates a new instance of the Context.
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {Context}
   */
  public static setup (components: Components, options: Options): Context {
    this.instance = new Context(components, options);

    this.instance.apollo = new Apollo();
    this.instance.collectModels();

    this.instance.logger.group('Context setup');
    this.instance.logger.log('components', this.instance.components);
    this.instance.logger.log('options', this.instance.options);
    this.instance.logger.log('database', this.instance.database);
    this.instance.logger.log('models', this.instance.models);
    this.instance.logger.groupEnd();

    return this.instance;
  }

  /**
   * Returns a model from the model collection by it's name
   *
   * @param {Model|string} model A Model instance, a singular or plural name of the model
   * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
   *                            found. Default is false
   * @returns {Model}
   */
  public getModel (model: Model | string, allowNull: boolean = false): Model {
    if (typeof model === 'string') {
      const name: string = inflection.singularize(downcaseFirstLetter(model));
      model = this.models.get(name) as Model;
      if (!allowNull && !model) throw new Error(`No such model ${name}!`);
    }

    return model;
  }

  /**
   * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
   */
  private collectModels () {
    this.database.entities.forEach((entity: any) => {
      const model: Model = new Model(entity.model as ORMModel);
      this.models.set(model.singularName, model);
      Model.augment(model);
    });
  }
}
