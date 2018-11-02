import Mutation from '../mutations/mutation';
import { Data } from '../support/interfaces';
import * as _ from 'lodash-es';

export default class CommitPreviousQuery extends Mutation {
  public static async call (state: any, payload: Data) {
    const { entity } = payload;
    payload = _.omit(payload, 'entity');

    state[entity.pluralName].previousQuery = payload;
  }
}
