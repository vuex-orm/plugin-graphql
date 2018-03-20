import QueryBuilder from './queryBuilder';
import { DocumentNode } from 'graphql';
import { Arguments } from './interfaces';

export default class Logger {
  private readonly enabled: boolean;

  public constructor (enabled: boolean) {
    this.enabled = enabled;
    this.log('Logging is enabled.');
  }

  public group (...messages: Array<any>): void {
    if (this.enabled) {
      console.group('[Vuex-ORM-Apollo]', ...messages);
    }
  }

  public groupEnd (): void {
    if (this.enabled) console.groupEnd();
  }

  public log (...messages: Array<any>): void {
    if (this.enabled) {
      console.log('[Vuex-ORM-Apollo]', ...messages);
    }
  }

  public logQuery (query: string | DocumentNode, variables?: Arguments) {
    if (this.enabled) {
      try {
        this.group('Sending query:');

        if (typeof query === 'object' && query.loc) {
          console.log(QueryBuilder.prettify(query.loc.source.body));
        } else {
          console.log(QueryBuilder.prettify(query as string));
        }

        if (variables) console.log('VARIABLES:', variables);

        this.groupEnd();
      } catch (e) {
        console.error('[Vuex-ORM-Apollo] There is a syntax error in the query!', e, query);
      }
    }
  }
}
