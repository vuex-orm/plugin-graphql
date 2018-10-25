"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
var model_1 = __importDefault(require("../orm/model"));
var utils_1 = require("../support/utils");
var apollo_1 = __importDefault(require("../graphql/apollo"));
var schema_1 = __importDefault(require("../graphql/schema"));
var inflection = require("inflection");
var introspectionQuery = "\nquery Introspection {\n  __schema {\n    types {\n      name\n      description\n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          name\n          description\n          type {\n            name\n            kind\n\n            ofType {\n              kind\n\n              name\n              ofType {\n                kind\n                name\n\n                ofType {\n                  kind\n                  name\n                }\n              }\n            }\n          }\n        }\n\n        type {\n          name\n          kind\n\n          ofType {\n            kind\n\n            name\n            ofType {\n              kind\n              name\n\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n\n      inputFields {\n        name\n        description\n        type {\n          name\n          kind\n\n          ofType {\n            kind\n\n            name\n            ofType {\n              kind\n              name\n\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";
/**
 * Internal context of the plugin. This class contains all information, the models, database, logger and so on.
 *
 * It's a singleton class, so just call Context.getInstance() anywhere you need the context.
 */
var Context = /** @class */ (function () {
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    function Context(components, options) {
        /**
         * Collection of all Vuex-ORM models wrapped in a Model instance.
         * @type {Map<any, any>}
         */
        this.models = new Map();
        /**
         * When true, the logging is enabled.
         * @type {boolean}
         */
        this.debugMode = false;
        /**
         * Defines how to query connections. 'auto' | 'nodes' | 'edges' | 'plain'
         */
        this.connectionQueryMode = "auto";
        /**
         * Container for the global mocks.
         * @type {Object}
         */
        this.globalMocks = {};
        this.components = components;
        this.options = options;
        this.database = options.database;
        this.debugMode = Boolean(options.debug);
        this.logger = new logger_1.default(this.debugMode);
        if (!options.database) {
            throw new Error("database param is required to initialize vuex-orm-graphql!");
        }
    }
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    Context.getInstance = function () {
        return this.instance;
    };
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {Context}
     */
    Context.setup = function (components, options) {
        this.instance = new Context(components, options);
        this.instance.apollo = new apollo_1.default();
        this.instance.collectModels();
        this.instance.logger.group("Context setup");
        this.instance.logger.log("components", this.instance.components);
        this.instance.logger.log("options", this.instance.options);
        this.instance.logger.log("database", this.instance.database);
        this.instance.logger.log("models", this.instance.models);
        this.instance.logger.groupEnd();
        return this.instance;
    };
    Context.prototype.loadSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.schemaWillBeLoaded) {
                    this.schemaWillBeLoaded = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var context, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.logger.log("Fetching GraphQL Schema initially ...");
                                    if (this.options.connectionQueryMode) {
                                        this.connectionQueryMode = this.options.connectionQueryMode;
                                    }
                                    else {
                                        this.connectionQueryMode = "auto";
                                    }
                                    context = {
                                        headers: { "X-GraphQL-Introspection-Query": "true" }
                                    };
                                    return [4 /*yield*/, this.apollo.simpleQuery(introspectionQuery, {}, true, context)];
                                case 1:
                                    result = _a.sent();
                                    this.schema = new schema_1.default(result.data.__schema);
                                    this.logger.log("GraphQL Schema successful fetched", result);
                                    this.logger.log("Starting to process the schema ...");
                                    this.processSchema();
                                    this.logger.log("Schema procession done!");
                                    resolve(this.schema);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, this.schemaWillBeLoaded];
            });
        });
    };
    Context.prototype.processSchema = function () {
        var _this = this;
        this.models.forEach(function (model) {
            var type;
            try {
                type = _this.schema.getType(model.singularName);
            }
            catch (error) {
                _this.logger.warn("Ignoring entity " + model.singularName + " because it's not in the schema.");
                return;
            }
            model.fields.forEach(function (field, fieldName) {
                if (!type.fields.find(function (f) { return f.name === fieldName; })) {
                    _this.logger.warn("Ignoring field " + model.singularName + "." + fieldName + " because it's not in the schema.");
                    // TODO: Move skipFields to the model
                    model.baseModel.skipFields = model.baseModel.skipFields ? model.baseModel.skipFields : [];
                    if (!model.baseModel.skipFields.includes(fieldName)) {
                        model.baseModel.skipFields.push(fieldName);
                    }
                }
            });
        });
        if (this.connectionQueryMode === "auto") {
            this.connectionQueryMode = this.schema.determineQueryMode();
            this.logger.log("Connection Query Mode is " + this.connectionQueryMode + " by automatic detection");
        }
        else {
            this.logger.log("Connection Query Mode is " + this.connectionQueryMode + " by config");
        }
    };
    /**
     * Returns a model from the model collection by it's name
     *
     * @param {Model|string} model A Model instance, a singular or plural name of the model
     * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
     *                            found. Default is false
     * @returns {Model}
     */
    Context.prototype.getModel = function (model, allowNull) {
        if (allowNull === void 0) { allowNull = false; }
        if (typeof model === "string") {
            var name_1 = inflection.singularize(utils_1.downcaseFirstLetter(model));
            model = this.models.get(name_1);
            if (!allowNull && !model)
                throw new Error("No such model " + name_1 + "!");
        }
        return model;
    };
    /**
     * Will add a mock for simple mutations or queries. These are model unrelated and have to be
     * handled  globally.
     *
     * @param {Mock} mock - Mock config.
     */
    Context.prototype.addGlobalMock = function (mock) {
        if (this.findGlobalMock(mock.action, mock.options))
            return false;
        if (!this.globalMocks[mock.action])
            this.globalMocks[mock.action] = [];
        this.globalMocks[mock.action].push(mock);
        return true;
    };
    /**
     * Finds a global mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions like { name: 'example' }.
     * @returns {Mock | null} null when no mock was found.
     */
    Context.prototype.findGlobalMock = function (action, options) {
        if (this.globalMocks[action]) {
            return (this.globalMocks[action].find(function (m) {
                if (!m.options || !options)
                    return true;
                var relevantOptions = utils_1.pick(options, Object.keys(m.options));
                return utils_1.isEqual(relevantOptions, m.options || {});
            }) || null);
        }
        return null;
    };
    /**
     * Hook to be called by simpleMutation and simpleQuery actions in order to get the global mock
     * returnValue.
     *
     * @param {string} action - Name of the action like 'simpleQuery' or 'simpleMutation'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    Context.prototype.globalMockHook = function (action, options) {
        var returnValue = null;
        var mock = this.findGlobalMock(action, options);
        if (mock) {
            if (mock.returnValue instanceof Function) {
                returnValue = mock.returnValue();
            }
            else {
                returnValue = mock.returnValue || null;
            }
        }
        return returnValue;
    };
    /**
     * Wraps all Vuex-ORM entities in a Model object and saves them into this.models
     */
    Context.prototype.collectModels = function () {
        var _this = this;
        this.database.entities.forEach(function (entity) {
            var model = new model_1.default(entity.model);
            _this.models.set(model.singularName, model);
            model_1.default.augment(model);
        });
    };
    return Context;
}());
exports.default = Context;
//# sourceMappingURL=context.js.map