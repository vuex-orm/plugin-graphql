import { ActionParams } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';
import Context from '../common/context';

/**
 * SimpleQuery action for sending a model unrelated simple query.
 */
export default class SimpleQuery extends Action {
  /**
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} query The query to send
   * @param {Arguments} variables
   * @param {boolean} bypassCache Whether to bypass the cache
   * @returns {Promise<any>} The result
   */
  public static async call ({ dispatch }: ActionParams, { query, bypassCache, variables }: ActionParams): Promise<any> {
    if (query) {
      variables = this.prepareArgs(variables);
      const result = await Context.getInstance().apollo.simpleQuery(query, variables, bypassCache);
      return result.data;
    } else {
      throw new Error("The simpleQuery action requires the 'query' to be set");
    }
  }
}
