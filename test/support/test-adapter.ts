import DefaultAdapter from "../../src/adapters/builtin/default-adapter";
import { ConnectionMode, ArgumentMode } from "../../src/adapters/adapter";

/**
 * Adapter implementation that allows to change ConnectionMode, ArgumentMode and so on in runtime.
 */
export default class TestAdapter extends DefaultAdapter {
  public connectionMode: ConnectionMode = ConnectionMode.NODES;
  public argumentMode: ArgumentMode = ArgumentMode.TYPE;

  getConnectionMode(): ConnectionMode {
    return this.connectionMode;
  }

  getArgumentMode(): ArgumentMode {
    return this.argumentMode;
  }
}
