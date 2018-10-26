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
var query_builder_1 = __importDefault(require("../graphql/query-builder"));
var context_1 = __importDefault(require("../common/context"));
var store_1 = require("../orm/store");
var transformer_1 = __importDefault(require("../graphql/transformer"));
var name_generator_1 = __importDefault(require("../graphql/name-generator"));
var schema_1 = __importDefault(require("../graphql/schema"));
var inflection = require("inflection");
/**
 * Base class for all Vuex actions. Contains some utility and convenience methods.
 */
var Action = /** @class */ (function () {
    function Action() {
    }
    /**
     * Sends a mutation.
     *
     * @param {string} name Name of the mutation like 'createUser'
     * @param {Data | undefined} variables Variables to send with the mutation
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @param {Model} model The model this mutation affects.
     * @param {boolean} multiple Tells if we're requesting a single record or multiple.
     * @returns {Promise<any>}
     */
    Action.mutation = function (name, variables, dispatch, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, schema, multiple, query, newData, insertedData, records, newRecord;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!variables) return [3 /*break*/, 5];
                        context = context_1.default.getInstance();
                        return [4 /*yield*/, context.loadSchema()];
                    case 1:
                        schema = _b.sent();
                        multiple = schema_1.default.returnsConnection(schema.getMutation(name));
                        query = query_builder_1.default.buildQuery("mutation", model, name, variables, multiple);
                        return [4 /*yield*/, context_1.default.getInstance().apollo.request(model, query, variables, true)];
                    case 2:
                        newData = _b.sent();
                        if (!(name !== name_generator_1.default.getNameForDestroy(model))) return [3 /*break*/, 4];
                        newData = newData[Object.keys(newData)[0]];
                        // IDs as String cause terrible issues, so we convert them to integers.
                        newData.id = parseInt(newData.id, 10);
                        return [4 /*yield*/, store_1.Store.insertData((_a = {}, _a[model.pluralName] = newData, _a), dispatch)];
                    case 3:
                        insertedData = _b.sent();
                        records = insertedData[model.pluralName];
                        newRecord = records[records.length - 1];
                        if (newRecord) {
                            return [2 /*return*/, newRecord];
                        }
                        else {
                            context_1.default.getInstance().logger.log("Couldn't find the record of type '", model.pluralName, "' within", insertedData, ". Falling back to find()");
                            return [2 /*return*/, model.baseModel.query().last()];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/, true];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Convenience method to get the model from the state.
     * @param {RootState} state Vuex state
     * @returns {Model}
     */
    Action.getModelFromState = function (state) {
        return context_1.default.getInstance().getModel(state.$name);
    };
    /**
     * Makes sure args is a hash.
     *
     * @param {Arguments|undefined} args
     * @param {any} id When not undefined, it's added to the args
     * @returns {Arguments}
     */
    Action.prepareArgs = function (args, id) {
        args = args || {};
        if (id)
            args["id"] = id;
        return args;
    };
    /**
     * Adds the record itself to the args and sends it through transformOutgoingData. Key is named by the singular name
     * of the model.
     *
     * @param {Arguments} args
     * @param {Model} model
     * @param {Data} data
     * @returns {Arguments}
     */
    Action.addRecordToArgs = function (args, model, data) {
        args[model.singularName] = transformer_1.default.transformOutgoingData(model, data);
        return args;
    };
    /**
     * Transforms each field of the args which contains a model.
     * @param {Arguments} args
     * @returns {Arguments}
     */
    Action.transformArgs = function (args) {
        var context = context_1.default.getInstance();
        Object.keys(args).forEach(function (key) {
            var value = args[key];
            if (value instanceof context.components.Model) {
                var model = context.getModel(inflection.singularize(value.$self().entity));
                var transformedValue = transformer_1.default.transformOutgoingData(model, value);
                context.logger.log("A", key, "model was found within the variables and will be transformed from", value, "to", transformedValue);
                args[key] = transformedValue;
            }
        });
        return args;
    };
    return Action;
}());
exports.default = Action;
//# sourceMappingURL=action.js.map