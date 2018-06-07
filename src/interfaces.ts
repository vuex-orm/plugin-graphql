import ORMModel from '@vuex-orm/core/lib/model/Model';

export type DispatchFunction = (action: string, data: Data) => Promise<any>;

export interface ActionParams {
  commit: any;
  dispatch: DispatchFunction;
  getters: any;
  rootGetters: any;
  rootState: any;
  state: any;
  filter?: Filter;
  id?: number;
  data?: Data;
  args?: Arguments;
  bypassCache?: boolean;
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

export interface Field {
  related?: ORMModel;
  parent?: ORMModel;
  localKey?: string;
  foreignKey?: string;
}

export class PatchedModel extends ORMModel {
  static async fetch (filter: any, bypassCache = false): Promise<any> { return undefined; }
  static async mutate (params: any): Promise<any> { return undefined; }
}
