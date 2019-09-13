import { ActionParams, Data } from '../support/interfaces'
import Action from './action'
import { Store } from '../orm/store'
import Context from '../common/context'

/**
 * Push action for sending a update mutation. Will be used for record.$push().
 */
export default class Push extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} data New data to save
   * @param {Arguments} args Additional arguments
   * @returns {Promise<Data>} The updated record
   */
  public static async call({ state, dispatch }: ActionParams, { data, args }: ActionParams): Promise<Data> {
    if (data) {
      const model = this.getModelFromState(state!)
      const mutationName = Context.getInstance().adapter.getNameForPush(model)

      const mockReturnValue = model.$mockHook('push', {
        data,
        args: args || {},
      })

      if (mockReturnValue) {
        return Store.insertData(mockReturnValue, dispatch!)
      }

      // Arguments
      args = this.prepareArgs(args, data.id)
      this.addRecordToArgs(args, model, data)

      // Send the mutation
      return Action.mutation(mutationName, args as Data, dispatch!, model)
    } else {
      /* istanbul ignore next */
      throw new Error("The persist action requires the 'data' to be set")
    }
  }
}
