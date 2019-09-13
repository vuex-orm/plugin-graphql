import { ActionParams } from '../support/interfaces'
import Action from './action'
import Context from '../common/context'
import { clone, graphQlDocumentToString, parseQuery, removeSymbols } from '../support/utils'

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
  public static async call({  }: ActionParams, { query, bypassCache, variables }: ActionParams): Promise<any> {
    const context: Context = Context.getInstance()

    if (query) {
      const parsedQuery = parseQuery(query)

      const mockReturnValue = context.globalMockHook('simpleQuery', {
        name: parsedQuery.definitions[0]['name'].value,
        variables,
      })

      if (mockReturnValue) {
        return mockReturnValue
      }

      variables = this.prepareArgs(variables)

      const result = await context.apollo.simpleQuery(graphQlDocumentToString(parsedQuery), variables, bypassCache)

      // remove the symbols
      return removeSymbols(clone(result.data))
    } else {
      /* istanbul ignore next */
      throw new Error("The simpleQuery action requires the 'query' to be set")
    }
  }
}
