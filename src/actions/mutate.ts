import Context from "../common/context";
import Transformer from "../graphql/transformer";
import {ActionParams, Arguments} from "../support/interfaces";
import Action from "./action";

const inflection = require('inflection');

export default class Mutate extends Action {
  /**
   * Will be called, when dispatch('entities/something/mutation') is called.
   * For custom mutations.
   * @param {any} state The Vuex State from Vuex-ORM
   * @param {DispatchFunction} dispatch Vuex Dispatch method for the model
   * @param {Arguments} args Arguments for the mutation. Must contain a 'mutation' field.
   * @returns {Promise<any>}
   */
  public static async call ({ state, dispatch }: ActionParams, args: Arguments): Promise<any> {
    const context = Context.getInstance();
    const name: string = args['mutation'];
    delete args['mutation'];

    // There could be anything in the args, but we have to be sure that all records are gone through
    // transformOutgoingData()
    Object.keys(args).forEach((key: string) => {
      const value: any = args[key];

      if (value instanceof context.components.Model) {
        const model = context.getModel(inflection.singularize(value.$self().entity));
        const transformedValue = Transformer.transformOutgoingData(model, value);
        context.logger.log('A', key, 'model was found within the variables and will be transformed from', value, 'to', transformedValue);
        args[key] = transformedValue;
      }
    });

    const model = context.getModel(state.$name);

    return Action.mutation(name, args, dispatch, model, false);
  }
}
