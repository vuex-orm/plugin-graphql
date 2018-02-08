export interface FetchParams {
  commit: any;
  dispatch: any;
  getters: any;
  rootGetters: any;
  rootState: any;
  state: any;

  filter?: Filter;
}

export interface Data {
  [index: string]: any;
}

export interface Filter extends Object {
  [index: string]: any;
}

export interface ORMModel {
  entity: string;

  fields (): any;
}

export interface Field {
  related: ORMModel;
  parent: ORMModel;
}
