"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../support/utils");
var Schema = /** @class */ (function () {
    function Schema(schema) {
        var _this = this;
        this.schema = schema;
        this.types = new Map();
        this.mutations = new Map();
        this.queries = new Map();
        this.schema.types.forEach(function (t) { return _this.types.set(t.name, t); });
        this.getType('Query').fields.forEach(function (f) { return _this.queries.set(f.name, f); });
        this.getType('Mutation').fields.forEach(function (f) { return _this.mutations.set(f.name, f); });
    }
    Schema.prototype.determineQueryMode = function () {
        var _this = this;
        var connection = null;
        this.queries.forEach(function (query) {
            var typeName = Schema.getTypeNameOfField(query);
            if (typeName.endsWith('TypeConnection')) {
                connection = _this.getType(typeName);
                return false; // break
            }
            return true;
        });
        if (!connection) {
            throw new Error("Can't determine the connection mode due to the fact that here are no connection types in the schema. Please set the connectionQueryMode via Vuex-ORM-GraphQL options!");
        }
        if (connection.fields.find(function (f) { return f.name === 'nodes'; })) {
            return 'nodes';
        }
        else if (connection.fields.find(function (f) { return f.name === 'edges'; })) {
            return 'edges';
        }
        else {
            return 'plain';
        }
    };
    Schema.prototype.getType = function (name, allowNull) {
        if (allowNull === void 0) { allowNull = false; }
        name = utils_1.upcaseFirstLetter(name);
        var type = this.types.get(name);
        if (!allowNull && !type)
            throw new Error("Couldn't find Type of name " + name + " in the GraphQL Schema.");
        return type || null;
    };
    Schema.prototype.getMutation = function (name, allowNull) {
        if (allowNull === void 0) { allowNull = false; }
        var mutation = this.mutations.get(name);
        if (!allowNull && !mutation)
            throw new Error("Couldn't find Mutation of name " + name + " in the GraphQL Schema.");
        return mutation || null;
    };
    Schema.prototype.getQuery = function (name, allowNull) {
        if (allowNull === void 0) { allowNull = false; }
        var query = this.queries.get(name);
        if (!allowNull && !query)
            throw new Error("Couldn't find Query of name " + name + " in the GraphQL Schema.");
        return query || null;
    };
    Schema.returnsConnection = function (field) {
        return (Schema.getTypeNameOfField(field).endsWith('TypeConnection'));
    };
    Schema.getRealType = function (type) {
        if (type.kind === 'NON_NULL') {
            return this.getRealType(type.ofType);
        }
        else {
            return type;
        }
    };
    Schema.getTypeNameOfField = function (field) {
        var type = this.getRealType(field.type);
        if (type.kind === 'LIST') {
            return "[" + type.ofType.name + "]";
        }
        var name = type.name || type.ofType.name || type.ofType.ofType.name;
        if (!name)
            throw new Error("Can't find type name for field " + field.name);
        return name;
    };
    return Schema;
}());
exports.default = Schema;
//# sourceMappingURL=schema.js.map