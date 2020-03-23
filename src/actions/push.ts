import { ActionParams, Arguments, Data } from '../support/interfaces'
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
      const context: Context = Context.getInstance()
      const model = this.getModelFromState(state!)
      const mutationName = context.adapter.getNameForPush(model)

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

      const schema = await context.loadSchema()

      // Check the mutation in the schema and remove unneeded arguments from sending to the server
      if (args) {
        try {
          const mutation = schema.getMutation(mutationName)
          const newArgs: Arguments = {}
          Object.entries(args).forEach(([argName, value]) => {
            if (mutation && !mutation.args.find((a) => a.name === argName)) {
              context.logger.warn(
                `Removing mutation argument ${mutationName}.${argName} because it's not in the schema.`
              )
            } else {
              newArgs[argName] = value
            }
          })
          args = newArgs
        } catch (error) {
          context.logger.warn(`Ignoring mutation ${mutationName} because it's not in the schema. ${error}`)
        }
      }

      // Send the mutation
      return Action.mutation(mutationName, args as Data, dispatch!, model)
    } else {
      /* istanbul ignore next */
      throw new Error("The persist action requires the 'data' to be set")
    }
  }
}
