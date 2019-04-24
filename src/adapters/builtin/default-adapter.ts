import Adapter, { ConnectionMode, FilterMode } from "../adapter";
import Model from "../../orm/model";
import { upcaseFirstLetter } from "../../support/utils";

export default class DefaultAdapter implements Adapter {
  getConnectionMode(): ConnectionMode {
    return ConnectionMode.NODES;
  }

  getFilterMode(): FilterMode {
    return FilterMode.TYPE;
  }

  getFilterTypeName(model: Model): string {
    return `${upcaseFirstLetter(model.singularName)}Filter`;
  }

  getNameForDestroy(model: Model): string {
    return `delete${upcaseFirstLetter(model.singularName)}`;
  }

  getNameForFetch(model: Model, plural: boolean): string {
    return plural ? model.pluralName : model.singularName;
  }

  getNameForPersist(model: Model): string {
    return `create${upcaseFirstLetter(model.singularName)}`;
  }

  getNameForPush(model: Model): string {
    return `update${upcaseFirstLetter(model.singularName)}`;
  }
}
