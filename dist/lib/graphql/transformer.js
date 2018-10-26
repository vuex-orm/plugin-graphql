"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("../orm/model"));
var context_1 = __importDefault(require("../common/context"));
var utils_1 = require("../support/utils");
var inflection = require("inflection");
/**
 * This class provides methods to transform incoming data from GraphQL in to a format Vuex-ORM understands and
 * vice versa.
 */
var Transformer = /** @class */ (function () {
    function Transformer() {
    }
    /**
     * Transforms outgoing data. Use for variables param.
     *
     * Omits relations and some other fields.
     *
     * @param model
     * @param {Data} data
     * @param {Array<String>} whitelist of fields
     * @returns {Data}
     */
    Transformer.transformOutgoingData = function (model, data, whitelist) {
        var _this = this;
        var context = context_1.default.getInstance();
        var relations = model.getRelations();
        var returnValue = {};
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (key === "comments") {
                console.log("model", model, model.baseModel.$entitiy, model.constructor.name);
                console.log("data", data);
                console.log("whitelist", whitelist);
            }
            // Always add fields on the whitelist. Ignore hasMany/One connections, empty fields and internal fields ($)
            if ((whitelist && whitelist.includes(key)) ||
                ((!relations.has(key) || relations.get(key) instanceof context.components.BelongsTo) &&
                    !key.startsWith("$") &&
                    value !== null &&
                    value !== undefined)) {
                var relatedModel = relations.get(key) && relations.get(key).parent
                    ? context.getModel(inflection.singularize(relations.get(key).parent.entity), true)
                    : null;
                if (value instanceof Array) {
                    // Iterate over all fields and transform them if value is an array
                    var arrayModel_1 = context.getModel(inflection.singularize(key));
                    returnValue[key] = value.map(function (v) { return _this.transformOutgoingData(arrayModel_1 || model, v); });
                }
                else if (typeof value === "object" && value.$id !== undefined) {
                    if (!relatedModel) {
                        relatedModel = context.getModel(value.$self().entity);
                    }
                    // Value is a record, transform that too
                    returnValue[key] = _this.transformOutgoingData(relatedModel, value);
                }
                else {
                    // In any other case just let the value be what ever it is
                    returnValue[key] = value;
                }
            }
        });
        return returnValue;
    };
    /**
     * Transforms a set of incoming data to the format vuex-orm requires.
     *
     * @param {Data | Array<Data>} data
     * @param model
     * @param mutation required to transform something like `disableUserAddress` to the actual model name.
     * @param {boolean} recursiveCall
     * @returns {Data}
     */
    Transformer.transformIncomingData = function (data, model, mutation, recursiveCall) {
        var _this = this;
        if (mutation === void 0) { mutation = false; }
        if (recursiveCall === void 0) { recursiveCall = false; }
        var result = {};
        var context = context_1.default.getInstance();
        if (!recursiveCall) {
            context.logger.group("Transforming incoming data");
            context.logger.log("Raw data:", data);
        }
        if (Array.isArray(data)) {
            result = data.map(function (d) { return _this.transformIncomingData(d, model, mutation, true); });
        }
        else {
            Object.keys(data).forEach(function (key) {
                if (data[key] !== undefined && data[key] !== null) {
                    if (utils_1.isPlainObject(data[key])) {
                        var localModel = context.getModel(key, true) || model;
                        if (data[key].nodes && context.connectionQueryMode === "nodes") {
                            result[inflection.pluralize(key)] = _this.transformIncomingData(data[key].nodes, localModel, mutation, true);
                        }
                        else if (data[key].edges && context.connectionQueryMode === "edges") {
                            result[inflection.pluralize(key)] = _this.transformIncomingData(data[key].edges, localModel, mutation, true);
                        }
                        else if (data["node"] && context.connectionQueryMode === "edges") {
                            result = _this.transformIncomingData(data["node"], localModel, mutation, true);
                        }
                        else {
                            var newKey = key;
                            if (mutation && !recursiveCall) {
                                newKey = data[key].nodes ? localModel.pluralName : localModel.singularName;
                                newKey = utils_1.downcaseFirstLetter(newKey);
                            }
                            result[newKey] = _this.transformIncomingData(data[key], localModel, mutation, true);
                        }
                    }
                    else if (model_1.default.isFieldNumber(model.fields.get(key))) {
                        result[key] = parseFloat(data[key]);
                    }
                    else if (key.endsWith("Type") && model.isTypeFieldOfPolymorphicRelation(key)) {
                        result[key] = inflection.pluralize(utils_1.downcaseFirstLetter(data[key]));
                    }
                    else {
                        result[key] = data[key];
                    }
                }
            });
        }
        if (!recursiveCall) {
            context.logger.log("Transformed data:", result);
            context.logger.groupEnd();
        }
        else {
            result["$isPersisted"] = true;
        }
        // Make sure this is really a plain JS object. We had some issues in testing here.
        return utils_1.clone(result);
    };
    return Transformer;
}());
exports.default = Transformer;
//# sourceMappingURL=transformer.js.map