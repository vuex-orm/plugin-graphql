import ORMModel from '@vuex-orm/core/lib/model/Model';
import Database from '@vuex-orm/core/lib/database/Database';
import State from '@vuex-orm/core/lib/modules/State';

export type DispatchFunction = (action: string, data: Data) => Promise<any>;

export interface Options {
  database: Database;
  url?: string;
  headers?: { [index: string]: any };
  credentials?: string;
  useGETForQueries?: boolean;
  debug?: boolean;
}

export interface ActionParams {
  commit: any;
  dispatch: DispatchFunction;
  getters: any;
  rootGetters: any;
  rootState: any;
  state: State;
  filter?: Filter;
  id?: number;
  data?: Data;
  args?: Arguments;
  bypassCache?: boolean;
  query?: string;
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
  static async fetch (filter: any, bypassCache: boolean = false): Promise<any> { return undefined; }
  static async mutate (params: any): Promise<any> { return undefined; }
  static async customQuery (query: string, params: any, bypassCache: boolean = false): Promise<any> { return undefined; }
}
