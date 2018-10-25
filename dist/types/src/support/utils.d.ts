/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export declare function upcaseFirstLetter(input: string): string;
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export declare function downcaseFirstLetter(input: string): string;
/**
 * Takes a string with a graphql query and formats it. Useful for debug output and the tests.
 * @param {string} query
 * @returns {string}
 */
export declare function prettify(query: string): string;
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} value - Value to check.
 */
export declare function isPlainObject(value: any): boolean;
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
export declare function pick(object: any, props: Array<string>): {};
export declare function isEqual(a: object, b: object): boolean;
export declare function clone(input: any): any;
export declare function takeWhile(array: Array<any>, predicate: (x: any, idx: number, array: Array<any>) => any): any[];
export declare function matches(source: any): (object: any) => boolean;
