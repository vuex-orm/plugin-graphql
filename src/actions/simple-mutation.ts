import { ActionParams } from '../support/interfaces';
import Action from './action';
import Context from '../common/context';
import * as _ from 'lodash-es';
import { parse } from 'graphql/language/parser';

/**
 * SimpleMutation action for sending a model unrelated simple mutation.
 */
export default class SimpleMutation extends Action {
  /**
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} query The query to send
   * @param {Arguments} variables
   * @returns {Promise<any>} The result
   */
  public static async call ({ dispatch }: ActionParams, { query, variables }: ActionParams): Promise<any> {
    const context: Context = Context.getInstance();

    if (query) {
      const parsedQuery = parse(query);
      const mockReturnValue = context.globalMockHook('simpleMutation', {
        name: parsedQuery.definitions[0]['name'].value,
        variables
      });

      if (mockReturnValue) {
        return mockReturnValue;
      }

      variables = this.prepareArgs(variables);
      const result = await context.apollo.simpleMutation(query, variables);

      // remove the symbols
      return _.clone(result.data);
    } else {
      throw new Error("The simpleMutation action requires the 'query' to be set");
    }
  }
}
