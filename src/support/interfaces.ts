/* istanbul ignore file */
import { Database, Model as ORMModel } from "@vuex-orm/core";
import RootState from "@vuex-orm/core/lib/modules/contracts/RootState";
import { ApolloLink } from "apollo-link";
import { DocumentNode } from "graphql/language/ast";

export type DispatchFunction = (action: string, data: Data) => Promise<any>;

export interface Options {
  database: Database;
  url?: string;
  headers?: { [index: string]: any };
  credentials?: string;
  useGETForQueries?: boolean;
  debug?: boolean;
  connectionQueryMode?: string;
  link?: ApolloLink;
}

export interface ActionParams {
  commit?: any;
  dispatch?: DispatchFunction;
  getters?: any;
  rootGetters?: any;
  rootState?: any;
  state?: RootState;
  filter?: Filter;
  id?: number;
  data?: Data;
  args?: Arguments;
  variables?: Arguments;
  bypassCache?: boolean;
  query?: string | DocumentNode;
  multiple?: boolean;
  name?: string;
}

export interface Data {
  [index: string]: any;
}

export interface Filter {
  [index: string]: any;
}

export interface Arguments {
  [index: string]: any;
}

export interface GraphQLType {
  description: string;
  name: string;
  fields?: Array<GraphQLField>;
  inputFields?: Array<GraphQLField>;
}

export interface GraphQLField {
  description: string;
  name: string;
  args: Array<GraphQLField>;
  type: GraphQLTypeDefinition;
}

export interface GraphQLTypeDefinition {
  kind: string;
  name?: string;
  ofType: GraphQLTypeDefinition;
}

export interface GraphQLSchema {
  types: Array<GraphQLType>;
}

export interface Field {
  related?: ORMModel;
  parent?: ORMModel;
  localKey?: string;
  foreignKey?: string;
}

export class PatchedModel extends ORMModel {
  static async fetch(filter?: any, bypassCache: boolean = false): Promise<any> {
    return undefined;
  }
  static async mutate(params: ActionParams): Promise<any> {
    return undefined;
  }
  static async customQuery(params: ActionParams): Promise<any> {
    return undefined;
  }
}
