"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("graphql/language/parser");
var printer_1 = require("graphql/language/printer");
// @ts-ignore
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function upcaseFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
exports.upcaseFirstLetter = upcaseFirstLetter;
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function downcaseFirstLetter(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
exports.downcaseFirstLetter = downcaseFirstLetter;
/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
function prettify(query) {
    return printer_1.print(parser_1.parse(query));
}
exports.prettify = prettify;
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} value - Value to check.
 */
function isPlainObject(value) {
    return (value != null && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype);
}
exports.isPlainObject = isPlainObject;
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
function pick(object, props) {
    if (!object) {
        return {};
    }
    var index = -1;
    var length = props.length;
    var result = {};
    while (++index < length) {
        var prop = props[index];
        result[prop] = object[prop];
    }
    return result;
}
exports.pick = pick;
function isEqual(a, b) {
    // Couldn' find a simpler working implementation yet.
    return lodash_isequal_1.default(a, b);
}
exports.isEqual = isEqual;
function clone(input) {
    return JSON.parse(JSON.stringify(input));
}
exports.clone = clone;
function takeWhile(array, predicate) {
    var index = -1;
    while (++index < array.length && predicate(array[index], index, array)) {
        // just increase index
    }
    return array.slice(0, index);
}
exports.takeWhile = takeWhile;
function matches(source) {
    source = clone(source);
    return function (object) { return isEqual(object, source); };
}
exports.matches = matches;
//# sourceMappingURL=utils.js.map