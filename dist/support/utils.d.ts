import { DocumentNode } from "graphql/language/ast";
export declare const pluralize: any;
export declare const singularize: any;
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
export declare function prettify(query: string | DocumentNode): string;
/**
 * Returns a parsed query as GraphQL AST DocumentNode.
 *
 * @param {string | DocumentNode} query - Query as string or GraphQL AST DocumentNode.
 *
 * @returns {DocumentNode} Query as GraphQL AST DocumentNode.
 */
export declare function parseQuery(query: string | DocumentNode): DocumentNode;
/**
 * @param {DocumentNode} query - The GraphQL AST DocumentNode.
 *
 * @returns {string} the GraphQL query within a DocumentNode as a plain string.
 */
export declare function graphQlDocumentToString(query: DocumentNode): string;
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} obj - Value to check.
 */
export declare function isPlainObject(obj: any): boolean;
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
export declare function removeSymbols(input: any): any;
/**
 * Converts the argument into a number.
 */
export declare function toNumber(input: string | number | null): number | string;
