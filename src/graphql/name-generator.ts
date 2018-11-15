import Model from "../orm/model";
import { upcaseFirstLetter } from "../support/utils";

/**
 * Generic name generator for mutations and queries. In the future these methods may be influenced by the configuration.
 */
export default class NameGenerator {
  public static getNameForPersist(model: Model) {
    return this.getCRUDName("create", model);
  }

  public static getNameForPush(model: Model) {
    return this.getCRUDName("update", model);
  }

  public static getNameForDestroy(model: Model) {
    return this.getCRUDName("delete", model);
  }

  public static getNameForFetch(model: Model, plural: boolean = false) {
    return plural ? model.pluralName : model.singularName;
  }

  /**
   * Internal helper to keep the code DRY. Just generates a name by leveraging the models singular name.
   * @param {string} action Name of the action like 'create'
   * @param {Model} model
   * @returns {string} For example 'createBlogPost'
   */
  private static getCRUDName(action: string, model: Model) {
    return `${action}${upcaseFirstLetter(model.singularName)}`;
  }
}
