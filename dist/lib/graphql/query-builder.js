"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("../orm/model"));
var utils_1 = require("../support/utils");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var context_1 = __importDefault(require("../common/context"));
var schema_1 = __importDefault(require("./schema"));
/**
 * Contains all logic to build GraphQL queries/mutations.
 */
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
    }
    /**
     * Builds a field for the GraphQL query and a specific model
     *
     * @param {Model|string} model The model to use
     * @param {boolean} multiple Determines whether plural/nodes syntax or singular syntax is used.
     * @param {Arguments} args The args that will be passed to the query field ( user(role: $role) )
     * @param {Array<Model>} path The relations in this list are ignored (while traversing relations).
     *                                    Mainly for recursion
     * @param {string} name Optional name of the field. If not provided, this will be the model name
     * @param filter
     * @param {boolean} allowIdFields Optional. Determines if id fields will be ignored for the argument generation.
     *                                See buildArguments
     * @returns {string}
     *
     * @todo Do we need the allowIdFields param?
     */
    QueryBuilder.buildField = function (model, multiple, args, path, name, filter, allowIdFields) {
        if (multiple === void 0) { multiple = true; }
        if (path === void 0) { path = []; }
        if (filter === void 0) { filter = false; }
        if (allowIdFields === void 0) { allowIdFields = false; }
        var context = context_1.default.getInstance();
        model = context.getModel(model);
        name = name ? name : model.pluralName;
        var field = context.schema.getMutation(name, true) || context.schema.getQuery(name, true);
        var params = this.buildArguments(model, args, false, filter, allowIdFields, field);
        path = path.length === 0 ? [model.singularName] : path;
        var fields = "\n      " + model.getQueryFields().join(" ") + "\n      " + this.buildRelationsQuery(model, path) + "\n    ";
        if (multiple) {
            var header = "" + name + params;
            if (context.connectionQueryMode === "nodes") {
                return "\n          " + header + " {\n            nodes {\n              " + fields + "\n            }\n          }\n        ";
            }
            else if (context.connectionQueryMode === "edges") {
                return "\n          " + header + " {\n            edges {\n              node {\n                " + fields + "\n              }\n            }\n          }\n        ";
            }
            else {
                return "\n          " + header + " {\n            " + fields + "\n          }\n        ";
            }
        }
        else {
            return "\n        " + (name ? name : model.singularName) + params + " {\n          " + fields + "\n        }\n      ";
        }
    };
    /**
     * Generates a query.
     * Currently only one root field for the query is possible.
     * @param {string} type 'mutation' or 'query'
     * @param {Model | string} model The model this query or mutation affects. This mainly determines the query fields.
     * @param {string} name Optional name of the query/mutation. Will overwrite the name from the model.
     * @param {Arguments} args Arguments for the query
     * @param {boolean} multiple Determines if the root query field is a connection or not (will be passed to buildField)
     * @param {boolean} filter When true the query arguments are passed via a filter object.
     * @returns {any} Whatever gql() returns
     */
    QueryBuilder.buildQuery = function (type, model, name, args, multiple, filter) {
        var context = context_1.default.getInstance();
        // model
        model = context.getModel(model);
        if (!model)
            throw new Error("No model provided to build the query!");
        // args
        args = args ? utils_1.clone(args) : {};
        if (!args)
            throw new Error("args is undefined");
        Object.keys(args).forEach(function (key) {
            if (args && args[key] && utils_1.isPlainObject(args[key])) {
                args[key] = { __type: utils_1.upcaseFirstLetter(key) };
            }
        });
        // multiple
        multiple = multiple === undefined ? !args["id"] : multiple;
        // name
        if (!name)
            name = multiple ? model.pluralName : model.singularName;
        // field
        var field = context.schema.getMutation(name, true) || context.schema.getQuery(name, true);
        // build query
        var query = type + " " + utils_1.upcaseFirstLetter(name) + this.buildArguments(model, args, true, filter, true, field) + " {\n" +
            ("  " + this.buildField(model, multiple, args, [], name, filter, true) + "\n") +
            "}";
        return graphql_tag_1.default(query);
    };
    /**
     * Generates the arguments string for a graphql query based on a given map.
     *
     * There are three types of arguments:
     *
     * 1) Signatures with primitive types (signature = true)
     *      => 'mutation createUser($name: String!)'
     *
     * 2) Signatures with object types (signature = true, args = { user: { __type: 'User' }})
     *      => 'mutation createUser($user: UserInput!)'
     *
     * 3) Fields with variables (signature = false)
     *      => 'user(id: $id)'
     *
     * 4) Filter fields with variables (signature = false, filter = true)
     *      => 'users(filter: { active: $active })'
     *
     * @param model
     * @param {Arguments | undefined} args
     * @param {boolean} signature When true, then this method generates a query signature instead of key/value pairs
     * @param filter
     * @param {boolean} allowIdFields If true, ID fields will be included in the arguments list
     * @param {GraphQLField} field Optional. The GraphQL mutation or query field
     * @returns {String}
     */
    QueryBuilder.buildArguments = function (model, args, signature, filter, allowIdFields, field) {
        var _this = this;
        if (signature === void 0) { signature = false; }
        if (filter === void 0) { filter = false; }
        if (allowIdFields === void 0) { allowIdFields = true; }
        if (field === void 0) { field = null; }
        if (args === undefined)
            return "";
        var returnValue = "";
        var first = true;
        if (args) {
            Object.keys(args).forEach(function (key) {
                var value = args[key];
                var isForeignKey = model.skipField(key);
                var skipFieldDueId = (key === "id" || isForeignKey) && !allowIdFields;
                var schemaField = _this.findSchemaFieldForArgument(key, field, model, filter);
                var isConnectionField = schemaField && schema_1.default.getTypeNameOfField(schemaField).endsWith("TypeConnection");
                // Ignore null fields, ids and connections
                if (value && !skipFieldDueId && !isConnectionField) {
                    var typeOrValue = "";
                    if (signature) {
                        if (utils_1.isPlainObject(value) && value.__type) {
                            // Case 2 (User!)
                            typeOrValue = value.__type + "Input!";
                        }
                        else if (Array.isArray(value) && field) {
                            var arg = QueryBuilder.findSchemaFieldForArgument(key, field, model, filter);
                            if (!arg) {
                                throw new Error("The argument " + key + " is of type array but it's not possible to determine the type, because it's not in the field " + field.name);
                            }
                            typeOrValue = schema_1.default.getTypeNameOfField(arg) + "!";
                        }
                        else if (schemaField && schema_1.default.getTypeNameOfField(schemaField)) {
                            // Case 1, 3 and 4
                            typeOrValue = schema_1.default.getTypeNameOfField(schemaField) + "!";
                        }
                        else if (key === "id" || isForeignKey) {
                            // Case 1 (ID!)
                            typeOrValue = "ID!";
                        }
                        else {
                            // Case 1 (String!)
                            typeOrValue = _this.determineAttributeType(model, key, value, field || undefined);
                            typeOrValue = typeOrValue + "!";
                        }
                    }
                    else {
                        // Case 3 or 4
                        typeOrValue = "$" + key;
                    }
                    returnValue = "" + returnValue + (first ? "" : ", ") + ((signature ? "$" : "") +
                        key) + ": " + typeOrValue;
                    first = false;
                }
            });
            if (!first) {
                if (!signature && filter)
                    returnValue = "filter: { " + returnValue + " }";
                returnValue = "(" + returnValue + ")";
            }
        }
        return returnValue;
    };
    /**
     * Determines the GraphQL primitive type of a field in the variables hash by the field type or (when
     * the field type is generic attribute) by the variable type.
     * @param {Model} model
     * @param {string} key
     * @param {string} value
     * @param {GraphQLField} query Pass when we have to detect the type of an argument
     * @returns {string}
     */
    QueryBuilder.determineAttributeType = function (model, key, value, query) {
        var context = context_1.default.getInstance();
        var field = model.fields.get(key);
        var schemaField;
        if (query) {
            schemaField = query.args.find(function (f) { return f.name === key; });
            if (!schemaField) {
                var filterField = query.args.find(function (f) { return f.name === "filter"; });
                if (filterField) {
                    schemaField = this.findSchemaFieldForArgument(key, null, model, true);
                }
            }
        }
        else {
            schemaField = context.schema.getType(model.singularName).fields.find(function (f) { return f.name === key; });
        }
        if (schemaField && schema_1.default.getTypeNameOfField(schemaField)) {
            return schema_1.default.getTypeNameOfField(schemaField);
        }
        else {
            if (field instanceof context.components.String) {
                return "String";
            }
            else if (field && field instanceof context.components.Number) {
                return "Int";
            }
            else if (field && field instanceof context.components.Boolean) {
                return "Boolean";
            }
            else {
                if (typeof value === "number")
                    return "Int";
                if (typeof value === "string")
                    return "String";
                if (typeof value === "boolean")
                    return "Boolean";
                throw new Error("Can't find suitable graphql type for field '" + model.singularName + "." + key + "'.");
            }
        }
    };
    QueryBuilder.findSchemaFieldForArgument = function (name, field, model, isFilter) {
        var schema = context_1.default.getInstance().schema;
        var schemaField;
        if (field) {
            schemaField = field.args.find(function (f) { return f.name === name; });
            if (schemaField)
                return schemaField;
        }
        // We try to find the FilterType or at least the Type this query belongs to.
        var type = schema.getType(model.singularName + (isFilter ? "Filter" : ""), true);
        // Next we try to find the field from the type
        schemaField = type
            ? (isFilter ? type.inputFields : type.fields).find(function (f) { return f.name === name; })
            : undefined;
        // Warn before we return null
        if (!schemaField) {
            context_1.default.getInstance().logger.warn("Couldn't find the argument with name " + name + " for the mutation/query " + (field ? field.name : "(?)"));
        }
        return schemaField;
    };
    /**
     * Generates the fields for all related models.
     *
     * @param {Model} model
     * @param {Array<Model>} path
     * @returns {string}
     */
    QueryBuilder.buildRelationsQuery = function (model, path) {
        var _this = this;
        if (path === void 0) { path = []; }
        if (model === null)
            return "";
        var context = context_1.default.getInstance();
        var relationQueries = [];
        model.getRelations().forEach(function (field, name) {
            var relatedModel;
            if (field.related) {
                relatedModel = context.getModel(field.related.entity);
            }
            else if (field.parent) {
                relatedModel = context.getModel(field.parent.entity);
            }
            else {
                relatedModel = context.getModel(name);
                context.logger.log("WARNING: field has neither parent nor related property. Fallback to attribute name", field);
            }
            // We will ignore the field, when it's already in the path. Means: When it's already queried. However there are
            // cases where the model will have a relationship to itself. For example a nested category strucure where the
            // category model has a parent: belongsTo(Category). So we also check if the model references itself. If this is
            // the case, we allow the nesting up to 5 times.
            var referencesItSelf = utils_1.takeWhile(path.slice(0).reverse(), function (p) { return p === relatedModel.singularName; }).length;
            var ignore = referencesItSelf
                ? referencesItSelf > 5
                : path.includes(relatedModel.singularName);
            // console.log(`-----> Will ${ignore ? '' : 'not'} ignore ${model.singularName}.${name}, path: ${path.join('.')}`);
            if (model.shouldEagerLoadRelation(name, field, relatedModel) && !ignore) {
                var newPath = path.slice(0);
                newPath.push(relatedModel.singularName);
                relationQueries.push(_this.buildField(relatedModel, model_1.default.isConnection(field), undefined, newPath, name, false));
            }
        });
        return relationQueries.join("\n");
    };
    return QueryBuilder;
}());
exports.default = QueryBuilder;
//# sourceMappingURL=query-builder.js.map