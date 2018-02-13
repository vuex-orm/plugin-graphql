import { print } from 'graphql/language/printer';
import { parse } from 'graphql/language/parser';

export default class Logger {
  private readonly enabled: boolean;

  public constructor (enabled: boolean) {
    this.enabled = enabled;
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

  // TODO also accept gql parsed queries
  public logQuery(query: string) {
    if (this.enabled) {
      try {
        this.group('Sending query:')
        console.log(this.prettify(query));
        this.groupEnd();
      } catch(e) {
        console.error('[Vuex-ORM-Apollo] There is a syntax error in the query!', e, query);
      }
    }
  }

  private prettify(query: string) {
    return print(parse(query));
  }
}
