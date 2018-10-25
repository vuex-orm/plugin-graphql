import { parse } from "graphql/language/parser";
import { print } from "graphql/language/printer";
// @ts-ignore
import lodashIsEqual from 'lodash.isequal';
/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function upcaseFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function downcaseFirstLetter(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
export function prettify(query) {
    return print(parse(query));
}
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} value - Value to check.
 */
export function isPlainObject(value) {
    return value != null &&
        typeof (value) === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype;
}
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
export function pick(object, props) {
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
export function isEqual(a, b) {
    // Couldn' find a simpler working implementation yet.
    return lodashIsEqual(a, b);
}
export function clone(input) {
    return JSON.parse(JSON.stringify(input));
}
export function takeWhile(array, predicate) {
    var index = -1;
    while (++index < array.length && predicate(array[index], index, array)) {
        // just increase index
    }
    return array.slice(0, index);
}
export function matches(source) {
    source = clone(source);
    return function (object) { return isEqual(object, source); };
}
//# sourceMappingURL=utils.js.map