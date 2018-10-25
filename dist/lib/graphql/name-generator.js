"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../support/utils");
/**
 * Generic name generator for mutations and queries. In the future these methods may be influenced by the configuration.
 */
var NameGenerator = /** @class */ (function () {
    function NameGenerator() {
    }
    NameGenerator.getNameForPersist = function (model) {
        return this.getCRUDName("create", model);
    };
    NameGenerator.getNameForPush = function (model) {
        return this.getCRUDName("update", model);
    };
    NameGenerator.getNameForDestroy = function (model) {
        return this.getCRUDName("delete", model);
    };
    NameGenerator.getNameForFetch = function (model, plural) {
        if (plural === void 0) { plural = false; }
        return plural ? model.pluralName : model.singularName;
    };
    /**
     * Internal helper to keep the code DRY. Just generates a name by leveraging the models singular name.
     * @param {string} action Name of the action like 'create'
     * @param {Model} model
     * @returns {string} For example 'createBlogPost'
     */
    NameGenerator.getCRUDName = function (action, model) {
        return "" + action + utils_1.upcaseFirstLetter(model.singularName);
    };
    return NameGenerator;
}());
exports.default = NameGenerator;
//# sourceMappingURL=name-generator.js.map