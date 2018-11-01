import Action from './action';
import { ActionParams, Data } from '../support/interfaces';

export default class InsertPaginationData extends Action {
  public static async call ({ state, commit }: ActionParams, payload: Data): Promise<Data> {
    const entity = this.getModelFromState(state);

    commit('entities/commitPagination', { entity, ...payload }, { root: true });

    return Promise.resolve(payload);
  }
}
