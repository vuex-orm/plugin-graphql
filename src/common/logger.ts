import { DocumentNode } from 'graphql';
import { Arguments } from '../support/interfaces';
import { FetchPolicy } from 'apollo-client';
import { prettify } from '../support/utils';
import * as _ from 'lodash-es';

/**
 * Vuex-ORM-Apollo Debug Logger.
 * Wraps console and only logs if enabled.
 *
 * Also contains some methods to format graphql queries for the output
 */
export default class Logger {
  /**
   * Tells if any logging should happen
   * @type {boolean}
   */
  private readonly enabled: boolean;

  /**
   * Fancy Vuex-ORM-Apollo prefix for all log messages.
   * @type {string[]}
   */
  private readonly PREFIX = [
    '%c Vuex-ORM: GraphQL Plugin %c',
    'background: #35495e; padding: 1px 0; border-radius: 3px; color: #eee;',
    'background: transparent;'
  ];

  /**
   * @constructor
   * @param {boolean} enabled Tells if any logging should happen
   */
  public constructor (enabled: boolean) {
    this.enabled = enabled;
    this.log('Logging is enabled.');
  }

  /**
   * Wraps console.group. In TEST env console.log is used instead because console.group doesn't work on CLI.
   * If available console.groupCollapsed will be used instead.
   * @param {Array<any>} messages
   */
  public group (...messages: Array<any>): void {
    if (this.enabled) {
      if (console.groupCollapsed) {
        console.groupCollapsed(...this.PREFIX, ...messages);
      } else {
        console.log(...this.PREFIX, ...messages);
      }
    }
  }

  /**
   * Wrapper for console.groupEnd. In TEST env nothing happens because console.groupEnd doesn't work on CLI.
   */
  public groupEnd (): void {
    if (this.enabled && console.groupEnd) console.groupEnd();
  }

  /**
   * Wrapper for console.log.
   * @param {Array<any>} messages
   */
  public log (...messages: Array<any>): void {
    if (this.enabled) {
      console.log(...this.PREFIX, ...messages);
    }
  }

  /**
   * Wrapper for console.warn.
   * @param {Array<any>} messages
   */
  public warn (...messages: Array<any>): void {
    if (this.enabled) {
      console.warn(...this.PREFIX, ...messages);
    }
  }

  /**
   * Logs a graphql query in a readable format and with all information like fetch policy and variables.
   * @param {string | DocumentNode} query
   * @param {Arguments} variables
   * @param {FetchPolicy} fetchPolicy
   */
  public logQuery (query: string | DocumentNode, variables?: Arguments, fetchPolicy?: FetchPolicy) {
    if (this.enabled) {
      try {
        let prettified = '';
        if (_.isObject(query) && (query as DocumentNode).loc) {
          prettified = prettify((query as DocumentNode).loc!.source.body);
        } else {
          prettified = prettify(query as string);
        }

        this.group('Sending query:', prettified.split('\n')[1].replace('{', '').trim());
        console.log(prettified);

        if (variables) console.log('VARIABLES:', variables);
        if (fetchPolicy) console.log('FETCH POLICY:', fetchPolicy);

        this.groupEnd();
      } catch (e) {
        console.error('[Vuex-ORM-Apollo] There is a syntax error in the query!', e, query);
      }
    }
  }
}
