import { parse } from "graphql/language/parser";
import { print } from "graphql/language/printer";

// @ts-ignore
import lodashIsEqual from "lodash.isequal";

// @ts-ignore
import lodashClone from "lodash.clone";

/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function upcaseFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function downcaseFirstLetter(input: string) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
export function prettify(query: string): string {
  return print(parse(query));
}

/**
 * Tells if a object is just a simple object.
 *
 * @param {any} value - Value to check.
 */
export function isPlainObject(obj: any): boolean {
  // Basic check for Type object that's not null
  if (typeof obj === "object" && obj !== null) {
    const proto = Object.getPrototypeOf(obj);
    return proto === Object.prototype || proto === null;
  }

  // Not an object
  return false;
}

/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
export function pick(object: any, props: Array<string>) {
  if (!object) {
    return {};
  }

  let index = -1;
  const length = props.length;
  const result = {};

  while (++index < length) {
    const prop = props[index];
    result[prop] = object[prop];
  }

  return result;
}

export function isEqual(a: object, b: object): boolean {
  // Couldn' find a simpler working implementation yet.
  return lodashIsEqual(a, b);
}

export function clone(input: any): any {
  // Couldn' find a simpler working implementation yet.
  return lodashClone(input);
}

export function takeWhile(
  array: Array<any>,
  predicate: (x: any, idx: number, array: Array<any>) => any
) {
  let index = -1;

  while (++index < array.length && predicate(array[index], index, array)) {
    // just increase index
  }

  return array.slice(0, index);
}

export function matches(source: any) {
  source = clone(source);

  return (object: any) => isEqual(object, source);
}

export function removeSymbols(input: any) {
  return JSON.parse(JSON.stringify(input));
}
