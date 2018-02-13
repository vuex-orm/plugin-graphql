import Model from "./model";

export interface ActionParams {
  commit: any;
  dispatch: any;
  getters: any;
  rootGetters: any;
  rootState: any;
  state: any;
  filter?: Filter;
  data?: Data;
  id?: string|number
}

export interface Data {
  [index: string]: any;
}

export interface Filter extends Object {
  [index: string]: any;
}

export interface Arguments extends Object {
  [index: string]: any;
}

export interface ORMModel {
  entity: string;

  fields (): any;
  dispatch(name: string, ...params: Array<any>): any;
  getters(name: string, ...params: Array<any>): any;
}

export interface Field {
  related: ORMModel;
  parent: ORMModel;
}
