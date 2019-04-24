import Model from "../orm/model";

export enum ConnectionMode {
  AUTO,
  PLAIN,
  NODES,
  EDGES
}

export enum FilterMode {
  TYPE,
  LIST
}

export default interface Adapter {
  getRootQueryName(): string;
  getRootMutationName(): string;

  getNameForPersist(model: Model): string;
  getNameForPush(model: Model): string;
  getNameForDestroy(model: Model): string;
  getNameForFetch(model: Model, plural: boolean): string;

  getConnectionMode(): ConnectionMode;

  getFilterMode(): FilterMode;
  getFilterTypeName(model: Model): string;
  getInputTypeName(model: Model, action?: string): string;
}
