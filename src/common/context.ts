import Logger from './logger';
import Model from '../orm/model';
import ORMModel from '@vuex-orm/core/lib/model/Model';
import { Components, Options } from '@vuex-orm/core/lib/plugins/use';
import { downcaseFirstLetter } from '../support/utils';
import Apollo from "../graphql/apollo";
const inflection = require('inflection');

export default class Context {
  public static instance: Context;

  public readonly components: Components;
  public readonly options: any;
  public readonly database: any;
  public readonly models: Map<string, Model> = new Map();
  public readonly debugMode: boolean = false;
  public readonly logger: Logger;
  public apollo!: Apollo;

  /**
   * Private constructor, called by the setup method
   * @param {Components} components
   * @param {Options} options
   */
  private constructor (components: Components, options: Options) {
    this.components = components;
    this.options = options;

    this.database = options.database;
    this.debugMode = options.debug as boolean;
    this.logger = new Logger(this.debugMode);

    if (!options.database) {
      throw new Error('database param is required to initialize vuex-orm-apollo!');
    }
  }

  public static getInstance () {
    return this.instance;
  }

  public static setup (components: Components, options: Options) {
    this.instance = new Context(components, options);

    this.instance.apollo = new Apollo();;
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
   * Returns a model by name
   *
   * @param {Model|string} model
   * @param allowNull
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
      const model: Model = new Model(entity.model as ORMModel, this);
      this.models.set(model.singularName, model);
      Model.augment(model);
    });
  }
}
