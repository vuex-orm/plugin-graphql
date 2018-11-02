import Action from './action';
import { ActionParams, Data } from '../support/interfaces';
import Context from '../common/context';

export default class NextPage extends Action {
  public static async call ({ state, commit, dispatch }: ActionParams): Promise<Data> {
    const context = Context.getInstance();

    let filter = {};
    let extraArgs = {};

    if (state['previousQuery']) {
      // JSON.stringify and parse is a workaround for vuex's "reactivity".
      filter = JSON.parse(JSON.stringify(state['previousQuery'].filter)) || {};
      extraArgs = JSON.parse(JSON.stringify(state['previousQuery'].extraArgs)) || {};
    }

    if (context.connectionQueryMode === 'relay') {
      if (state['pagination'].hasNextPage) {
        extraArgs['after'] = state['pagination'].endCursor;
      } else {
        return Promise.reject('no more pages');
      }
    }

    return dispatch('fetch', {
      filter,
      extraArgs,
      bypassCache: false
    });
  }
}
