import { ActionParams } from '../support/interfaces';
import Action from './action';
import NameGenerator from '../graphql/name-generator';
import Context from '../common/context';
import * as _ from 'lodash-es';

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
    if (query) {
      variables = this.prepareArgs(variables);
      const result = await Context.getInstance().apollo.simpleMutation(query, variables);

      // remove the symbols
      return _.clone(result.data);
    } else {
      throw new Error("The simpleMutation action requires the 'query' to be set");
    }
  }
}
