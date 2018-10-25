"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = __importDefault(require("../common/context"));
var utils_1 = require("../support/utils");
var inflection = require("inflection");
/**
 * Wrapper around a Vuex-ORM model with some useful methods.
 *
 * Also provides a mock system, to define mocking responses for actions.
 */
var Model = /** @class */ (function () {
    /**
     * @constructor
     * @param {Model} baseModel The original Vuex-ORM model
     */
    function Model(baseModel) {
        var _this = this;
        /**
         * The fields of the model
         * @type {Map<string, Field>}
         */
        this.fields = new Map();
        /**
         * Container for the mocks.
         * @type {Object}
         */
        this.mocks = {};
        this.baseModel = baseModel;
        // Generate name variants
        this.singularName = inflection.singularize(this.baseModel.entity);
        this.pluralName = inflection.pluralize(this.baseModel.entity);
        // Cache the fields of the model in this.fields
        var fields = this.baseModel.fields();
        Object.keys(fields).forEach(function (name) {
            _this.fields.set(name, fields[name]);
        });
    }
    /**
     * Tells if a field is a numeric field.
     *
     * @param {Field | undefined} field
     * @returns {boolean}
     */
    Model.isFieldNumber = function (field) {
        if (!field)
            return false;
        var context = context_1.default.getInstance();
        return (field instanceof context.components.Number || field instanceof context.components.Increment);
    };
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isFieldAttribute = function (field) {
        var context = context_1.default.getInstance();
        return (field instanceof context.components.Increment ||
            field instanceof context.components.Attr ||
            field instanceof context.components.String ||
            field instanceof context.components.Number ||
            field instanceof context.components.Boolean);
    };
    /**
     * Tells if a field which represents a relation is a connection (multiple).
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isConnection = function (field) {
        var context = context_1.default.getInstance();
        return !(field instanceof context.components.BelongsTo ||
            field instanceof context.components.HasOne ||
            field instanceof context.components.MorphTo ||
            field instanceof context.components.MorphOne);
    };
    /**
     * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
     * @todo is this a good way to add fields?
     * @param {Model} model
     */
    Model.augment = function (model) {
        var originalFieldGenerator = model.baseModel.fields.bind(model.baseModel);
        model.baseModel.fields = function () {
            var originalFields = originalFieldGenerator();
            originalFields["$isPersisted"] = model.baseModel.boolean(false);
            return originalFields;
        };
    };
    /**
     * Returns all fields which should be included in a graphql query: All attributes which are not included in the
     * skipFields array or start with $.
     * @returns {Array<string>} field names which should be queried
     */
    Model.prototype.getQueryFields = function () {
        var _this = this;
        var fields = [];
        this.fields.forEach(function (field, name) {
            if (Model.isFieldAttribute(field) && !_this.skipField(name)) {
                fields.push(name);
            }
        });
        return fields;
    };
    /**
     * Tells if a field should be ignored. This is true for fields that start with a `$` or is it is within the skipField
     * property or is the foreignKey of a belongsTo/hasOne relation.
     *
     * @param {string} field
     * @returns {boolean}
     */
    Model.prototype.skipField = function (field) {
        if (field.startsWith("$"))
            return true;
        if (this.baseModel.skipFields && this.baseModel.skipFields.indexOf(field) >= 0)
            return true;
        var context = context_1.default.getInstance();
        var shouldSkipField = false;
        this.getRelations().forEach(function (relation) {
            if ((relation instanceof context.components.BelongsTo ||
                relation instanceof context.components.HasOne) &&
                relation.foreignKey === field) {
                shouldSkipField = true;
                return false;
            }
            return true;
        });
        return shouldSkipField;
    };
    /**
     * @returns {Map<string, Field>} all relations of the model which should be included in a graphql query
     */
    Model.prototype.getRelations = function () {
        var relations = new Map();
        this.fields.forEach(function (field, name) {
            if (!Model.isFieldAttribute(field)) {
                relations.set(name, field);
            }
        });
        return relations;
    };
    /**
     * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
     * of a polymorphic relation.
     * @param {string} name
     * @returns {boolean}
     */
    Model.prototype.isTypeFieldOfPolymorphicRelation = function (name) {
        var _this = this;
        var context = context_1.default.getInstance();
        var found = false;
        context.models.forEach(function (model) {
            if (found)
                return false;
            model.getRelations().forEach(function (relation) {
                if (relation instanceof context.components.MorphMany ||
                    relation instanceof context.components.MorphedByMany ||
                    relation instanceof context.components.MorphOne ||
                    relation instanceof context.components.MorphTo ||
                    relation instanceof context.components.MorphToMany) {
                    if (relation.type === name &&
                        relation.related &&
                        relation.related.entity === _this.baseModel.entity) {
                        found = true;
                        return false;
                    }
                }
                return true;
            });
            return true;
        });
        return found;
    };
    /**
     * Returns a record of this model with the given ID.
     * @param {number} id
     * @returns {any}
     */
    Model.prototype.getRecordWithId = function (id) {
        return this.baseModel
            .query()
            .withAllRecursive()
            .where("id", id)
            .first();
    };
    /**
     * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
     * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Field} field Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    Model.prototype.shouldEagerLoadRelation = function (fieldName, field, relatedModel) {
        var context = context_1.default.getInstance();
        if (field instanceof context.components.HasOne ||
            field instanceof context.components.BelongsTo ||
            field instanceof context.components.MorphOne) {
            return true;
        }
        var eagerLoadList = this.baseModel.eagerLoad || [];
        return (eagerLoadList.find(function (n) {
            return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
        }) !== undefined);
    };
    /**
     * Adds a mock.
     *
     * @param {Mock} mock - Mock config.
     * @returns {boolean}
     */
    Model.prototype.$addMock = function (mock) {
        if (this.$findMock(mock.action, mock.options))
            return false;
        if (!this.mocks[mock.action])
            this.mocks[mock.action] = [];
        this.mocks[mock.action].push(mock);
        return true;
    };
    /**
     * Finds a mock for the given action and options.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions like { variables: { id: 42 } }.
     * @returns {Mock | null} null when no mock was found.
     */
    Model.prototype.$findMock = function (action, options) {
        if (this.mocks[action]) {
            return (this.mocks[action].find(function (m) {
                if (!m.options || !options)
                    return true;
                var relevantOptions = utils_1.pick(options, Object.keys(m.options));
                return utils_1.isEqual(relevantOptions, m.options || {});
            }) || null);
        }
        return null;
    };
    /**
     * Hook to be called by all actions in order to get the mock returnValue.
     *
     * @param {string} action - Name of the action like 'fetch'.
     * @param {MockOptions} options - MockOptions.
     * @returns {any} null when no mock was found.
     */
    Model.prototype.$mockHook = function (action, options) {
        var _a;
        var returnValue = null;
        var mock = this.$findMock(action, options);
        if (mock) {
            if (mock.returnValue instanceof Function) {
                returnValue = mock.returnValue();
            }
            else {
                returnValue = mock.returnValue || null;
            }
        }
        if (returnValue) {
            if (returnValue instanceof Array) {
                returnValue.forEach(function (r) { return (r.$isPersisted = true); });
            }
            else {
                returnValue.$isPersisted = true;
            }
            return _a = {}, _a[this.pluralName] = returnValue, _a;
        }
        return null;
    };
    return Model;
}());
exports.default = Model;
//# sourceMappingURL=model.js.map