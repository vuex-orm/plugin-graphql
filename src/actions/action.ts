import QueryBuilder from "../graphql/query-builder";
import Context from "../common/context";
import { Store } from "../orm/store";
import { Arguments, Data, DispatchFunction } from "../support/interfaces";
import Model from "../orm/model";
import RootState from "@vuex-orm/core/lib/modules/contracts/RootState";
import Transformer from "../graphql/transformer";
import Schema from "../graphql/schema";
import { singularize } from "../support/utils";
import {ArgumentMode} from "..";

/**
 * Base class for all Vuex actions. Contains some utility and convenience methods.
 */
export default class Action {
  /**
   * Sends a mutation.
   *
   * @param {string} name Name of the mutation like 'createUser'
   * @param {Data | undefined} variables Variables to send with the mutation
   * @param {Function} dispatch Vuex Dispatch method for the model
   * @param {Model} model The model this mutation affects.
   * @param {boolean} multiple Tells if we're requesting a single record or multiple.
   * @returns {Promise<any>}
   */
  protected static async mutation(
    name: string,
    variables: Data | undefined,
    dispatch: DispatchFunction,
    model: Model
  ): Promise<any> {
    if (variables) {
      const context: Context = Context.getInstance();
      const schema: Schema = await context.loadSchema();

      const multiple: boolean = Schema.returnsConnection(schema.getMutation(name)!);
      const query = QueryBuilder.buildQuery("mutation", model, name, variables, multiple);

      // Send GraphQL Mutation
      let newData = await context.apollo.request(model, query, variables, true);

      // When this was not a destroy action, we get new data, which we should insert in the store
      if (name !== context.adapter.getNameForDestroy(model)) {
        newData = newData[Object.keys(newData)[0]];

        // IDs as String cause terrible issues, so we convert them to integers.
        newData.id = parseInt(newData.id, 10);

        const insertedData: Data = await Store.insertData(
          { [model.pluralName]: newData } as Data,
          dispatch
        );

        // Try to find the record to return
        const records = insertedData[model.pluralName];
        const newRecord = records[records.length - 1];
        if (newRecord) {
          return newRecord;
        } else {
          Context.getInstance().logger.log(
            "Couldn't find the record of type '",
            model.pluralName,
            "' within",
            insertedData,
            ". Falling back to find()"
          );
          return model.baseModel.query().last();
        }
      }

      return true;
    }
  }

  /**
   * Convenience method to get the model from the state.
   * @param {RootState} state Vuex state
   * @returns {Model}
   */
  static getModelFromState(state: RootState): Model {
    return Context.getInstance().getModel(state.$name);
  }

  /**
   * Makes sure args is a hash.
   *
   * @param {Arguments|undefined} args
   * @param {any} id When not undefined, it's added to the args
   * @returns {Arguments}
   */
  static prepareArgs(args?: Arguments, id?: any): Arguments {
    args = args || {};
    if (id) args["id"] = id;

    return args;
  }

  /**
   * Adds the record itself to the args and sends it through transformOutgoingData. Key is named by the singular name
   * of the model.
   *
   * @param {Arguments} args
   * @param {Model} model
   * @param {Data} data
   * @returns {Arguments}
   */
  static addRecordToArgs(args: Arguments, model: Model, data: Data): Arguments {
    const context = Context.getInstance()
    if (Context.getInstance().adapter.getArgumentMode() === ArgumentMode.LIST) {
      Object.assign(args, Transformer.transformOutgoingData(model, data, false))
    } else {
      args[model.singularName] = Transformer.transformOutgoingData(model, data, false)
    }
    return args
  }

  /**
   * Transforms each field of the args which contains a model.
   * @param {Arguments} args
   * @returns {Arguments}
   */
  protected static transformArgs(args: Arguments): Arguments {
    const context = Context.getInstance();

    Object.keys(args).forEach((key: string) => {
      const value: Data = args[key];

      if (value instanceof context.components.Model) {
        const model = context.getModel(singularize(value.$self().entity));
        const transformedValue = Transformer.transformOutgoingData(model, value, false);
        context.logger.log(
          "A",
          key,
          "model was found within the variables and will be transformed from",
          value,
          "to",
          transformedValue
        );
        args[key] = transformedValue;
      }
    });

    return args;
  }
}
