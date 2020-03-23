import Context from '../common/context'
import { ActionParams, Data, Arguments } from '../support/interfaces'
import Action from './action'
import { Store } from '../orm/store'

/**
 * Persist action for sending a create mutation. Will be used for record.$persist().
 */
export default class Persist extends Action {
  /**
   * @param {any} state The Vuex state
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {string} id ID of the record to persist
   * @returns {Promise<Data>} The saved record
   */
  public static async call({ state, dispatch }: ActionParams, { id, args }: ActionParams): Promise<Data> {
    if (id) {
      const context: Context = Context.getInstance()

      const model = this.getModelFromState(state!)
      const mutationName = context.adapter.getNameForPersist(model)
      const oldRecord = model.getRecordWithId(id)!

      const mockReturnValue = model.$mockHook('persist', {
        id,
        args: args || {},
      })

      if (mockReturnValue) {
        const newRecord = await Store.insertData(mockReturnValue, dispatch!)
        await this.deleteObsoleteRecord(newRecord, oldRecord)
        return newRecord
      }

      // Arguments
      args = this.prepareArgs(args)
      this.addRecordToArgs(args, model, oldRecord)

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

      // Send mutation
      const newRecord = await Action.mutation(mutationName, args as Data, dispatch!, model)

      // Delete the old record if necessary
      await this.deleteObsoleteRecord(newRecord, oldRecord)

      return newRecord
    } else {
      /* istanbul ignore next */
      throw new Error("The persist action requires the 'id' to be set")
    }
  }

  /**
   * It's very likely that the server generated different ID for this record.
   * In this case Action.mutation has inserted a new record instead of updating the existing one.
   *
   * @param {Model} model
   * @param {Data} record
   * @returns {Promise<void>}
   */
  private static async deleteObsoleteRecord(newRecord: Data, oldRecord: Data) {
    if (newRecord && oldRecord && newRecord.id !== oldRecord.id) {
      Context.getInstance().logger.log('Dropping deprecated record', oldRecord)
      return oldRecord.$delete()
    }

    return null
  }
}
