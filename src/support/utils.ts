import { parse } from 'graphql/language/parser';
import { print } from 'graphql/language/printer';

/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function upcaseFirstLetter (input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export function downcaseFirstLetter (input: string) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
export function prettify (query: string): string {
  return print(parse(query));
}
