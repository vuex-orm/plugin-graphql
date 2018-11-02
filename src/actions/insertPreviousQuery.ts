import Action from './action';
import { ActionParams, Data } from '../support/interfaces';

export default class InsertPreviousQuery extends Action {
  public static async call ({ state, commit }: ActionParams, payload: Data): Promise<Data> {
    const entity = this.getModelFromState(state);

    commit('entities/commitPreviousQuery', { entity, ...payload }, { root: true });

    return Promise.resolve(payload);
  }
}
