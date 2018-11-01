import Mutation from '../mutations/mutation';
import { Data } from '../support/interfaces';
import Context from '../common/context';

export default class CommitPagination extends Mutation {
  public static async call (state: any, payload: Data) {
    const { entity } = payload;
    let paginationVar = '';

    switch (Context.getInstance().connectionQueryMode) {
      case 'relay':
        paginationVar = 'pageInfo';
        break;

      default:
        paginationVar = 'pagination';
    }

    state[entity.pluralName].pagination = payload[entity.pluralName][paginationVar];
  }
}
