import Logger from './logger';
import Model from './model';
import { ORMModel } from './interfaces';
import { Components, Options } from '@vuex-orm/core/lib/plugins/use';
import { downcaseFirstLetter } from './utils';
const inflection = require('inflection');

export default class Context {
  public readonly components: Components;
  public readonly options: any;
  public readonly database: any;
  public readonly models: Map<string, Model> = new Map();
  public readonly debugMode: boolean = false;
  public readonly logger: Logger;

  public constructor (components: Components, options: Options) {
    this.components = components;
    this.options = options;

    this.database = options.database;
    this.debugMode = options.debug as boolean;
    this.logger = new Logger(this.debugMode);

    if (!options.database) {
      throw new Error('database param is required to initialize vuex-orm-apollo!');
    }

    this.collectModels();

    this.logger.group('Context setup');
    this.logger.log('components', this.components);
    this.logger.log('options', this.options);
    this.logger.log('database', this.database);
    this.logger.log('models', this.models);
    this.logger.groupEnd();
  }

  /**
   * Returns a model by name
   *
   * @param {Model|string} model
   * @returns {Model}
   */
  public getModel (model: Model | string): Model {
    if (typeof model === 'string') {
      const name: string = inflection.singularize(downcaseFirstLetter(model));
      model = this.models.get(name) as Model;
      if (!model) throw new Error(`No such model ${name}!`);
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

      this.addFields(model);
    });
  }


  private addFields(model: Model) {
    // FIXME model.baseModel.fields.push('$isDirty');
    // FIXME model.baseModel.fields.push('$isPersisted');
  }
}
