"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_orm_graphql_1 = __importDefault(require("./vuex-orm-graphql"));
/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
var VuexORMGraphQLPlugin = /** @class */ (function () {
    function VuexORMGraphQLPlugin() {
    }
    /**
     * This is called, when VuexORM.install(VuexOrmGraphQL, options) is called.
     *
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {VuexORMGraphQL}
     */
    VuexORMGraphQLPlugin.install = function (components, options) {
        VuexORMGraphQLPlugin.instance = new vuex_orm_graphql_1.default(components, options);
        return VuexORMGraphQLPlugin.instance;
    };
    return VuexORMGraphQLPlugin;
}());
exports.default = VuexORMGraphQLPlugin;
//# sourceMappingURL=plugin.js.map