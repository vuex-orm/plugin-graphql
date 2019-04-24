import DefaultAdapter from "../../src/adapters/builtin/default-adapter";
import { ConnectionMode, FilterMode } from "../../src/adapters/adapter";

/**
 * Adapter implementation that allows to change ConnectionMode, FilterMode and so on in runtime.
 */
export default class TestAdapter extends DefaultAdapter {
  public connectionMode: ConnectionMode = ConnectionMode.NODES;
  public filterMode: FilterMode = FilterMode.TYPE;

  getConnectionMode(): ConnectionMode {
    return this.connectionMode;
  }

  getFilterMode(): FilterMode {
    return this.filterMode;
  }
}
