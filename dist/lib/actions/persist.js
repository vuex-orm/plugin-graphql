"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var context_1 = __importDefault(require("../common/context"));
var action_1 = __importDefault(require("./action"));
var name_generator_1 = __importDefault(require("../graphql/name-generator"));
var store_1 = require("../orm/store");
/**
 * Persist action for sending a create mutation. Will be used for record.$persist().
 */
var Persist = /** @class */ (function (_super) {
    __extends(Persist, _super);
    function Persist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {any} state The Vuex state
     * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
     * @param {string} id ID of the record to persist
     * @returns {Promise<Data>} The saved record
     */
    Persist.call = function (_a, _b) {
        var state = _a.state, dispatch = _a.dispatch;
        var id = _b.id, args = _b.args;
        return __awaiter(this, void 0, void 0, function () {
            var model, mutationName, oldRecord, mockReturnValue, newRecord_1, newRecord;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 5];
                        model = this.getModelFromState(state);
                        mutationName = name_generator_1.default.getNameForPersist(model);
                        oldRecord = model.getRecordWithId(id);
                        mockReturnValue = model.$mockHook("persist", {
                            id: id,
                            args: args || {}
                        });
                        if (!mockReturnValue) return [3 /*break*/, 2];
                        newRecord_1 = store_1.Store.insertData(mockReturnValue, dispatch);
                        return [4 /*yield*/, this.deleteObsoleteRecord(model, newRecord_1, oldRecord)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, newRecord_1];
                    case 2:
                        // Arguments
                        args = this.prepareArgs(args);
                        this.addRecordToArgs(args, model, oldRecord);
                        return [4 /*yield*/, action_1.default.mutation(mutationName, args, dispatch, model)];
                    case 3:
                        newRecord = _c.sent();
                        // Delete the old record if necessary
                        return [4 /*yield*/, this.deleteObsoleteRecord(model, newRecord, oldRecord)];
                    case 4:
                        // Delete the old record if necessary
                        _c.sent();
                        return [2 /*return*/, newRecord];
                    case 5: throw new Error("The persist action requires the 'id' to be set");
                }
            });
        });
    };
    /**
     * It's very likely that the server generated different ID for this record.
     * In this case Action.mutation has inserted a new record instead of updating the existing one.
     *
     * @param {Model} model
     * @param {Data} record
     * @returns {Promise<void>}
     */
    Persist.deleteObsoleteRecord = function (model, newRecord, oldRecord) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (newRecord && oldRecord && newRecord.id !== oldRecord.id) {
                    context_1.default.getInstance().logger.log("Dropping deprecated record", oldRecord);
                    return [2 /*return*/, oldRecord.$delete()];
                }
                return [2 /*return*/];
            });
        });
    };
    return Persist;
}(action_1.default));
exports.default = Persist;
//# sourceMappingURL=persist.js.map