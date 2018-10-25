import Model from "../orm/model";
/**
 * Generic name generator for mutations and queries. In the future these methods may be influenced by the configuration.
 */
export default class NameGenerator {
    static getNameForPersist(model: Model): string;
    static getNameForPush(model: Model): string;
    static getNameForDestroy(model: Model): string;
    static getNameForFetch(model: Model, plural?: boolean): string;
    /**
     * Internal helper to keep the code DRY. Just generates a name by leveraging the models singular name.
     * @param {string} action Name of the action like 'create'
     * @param {Model} model
     * @returns {string} For example 'createBlogPost'
     */
    private static getCRUDName;
}
