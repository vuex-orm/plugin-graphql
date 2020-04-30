import { Database, Model as ORMModel } from "@vuex-orm/core";
import ORMInstance from "@vuex-orm/core/lib/data/Instance";
import RootState from "@vuex-orm/core/lib/modules/contracts/RootState";
import { ApolloLink } from "apollo-link";
import { DocumentNode } from "graphql/language/ast";
import Adapter from "../adapters/adapter";
export declare type DispatchFunction = (action: string, data: Data) => Promise<any>;
export interface Options {
    apolloClient: any;
    database: Database;
    url?: string;
    headers?: {
        [index: string]: any;
    };
    credentials?: string;
    useGETForQueries?: boolean;
    debug?: boolean;
    link?: ApolloLink;
    adapter?: Adapter;
}
export interface ActionParams {
    commit?: any;
    dispatch?: DispatchFunction;
    getters?: any;
    rootGetters?: any;
    rootState?: any;
    state?: RootState;
    filter?: Filter;
    id?: string;
    data?: Data;
    args?: Arguments;
    variables?: Arguments;
    bypassCache?: boolean;
    query?: string | DocumentNode;
    multiple?: boolean;
    name?: string;
}
export interface Data extends ORMInstance<PatchedModel> {
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
    related?: typeof ORMModel;
    parent?: typeof ORMModel;
    localKey?: string;
    foreignKey?: string;
}
export declare class PatchedModel extends ORMModel {
    static eagerLoad?: Array<String>;
    static eagerSave?: Array<String>;
    static eagerSync?: Array<String>;
    static skipFields?: Array<String>;
    $isPersisted: boolean;
    static fetch(filter?: any, bypassCache?: boolean): Promise<any>;
    static mutate(params: ActionParams): Promise<any>;
    static customQuery(params: ActionParams): Promise<any>;
    $mutate(params: ActionParams): Promise<any>;
    $customQuery(params: ActionParams): Promise<any>;
    $persist(args?: any): Promise<any>;
    $push(args?: any): Promise<any>;
    $destroy(): Promise<any>;
    $deleteAndDestroy(): Promise<any>;
}
