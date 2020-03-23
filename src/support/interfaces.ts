/* istanbul ignore file */
import { Database, Model as ORMModel } from '@vuex-orm/core'
import ORMInstance from '@vuex-orm/core/lib/data/Instance'
import RootState from '@vuex-orm/core/lib/modules/contracts/RootState'
import { ApolloLink } from 'apollo-link'
import { DocumentNode } from 'graphql/language/ast'
import Adapter from '../adapters/adapter'

export type DispatchFunction = (action: string, data: Data) => Promise<any>

export interface Options {
  apolloClient: any
  database: Database
  url?: string
  headers?: { [index: string]: any }
  credentials?: string
  useGETForQueries?: boolean
  debug?: boolean
  link?: ApolloLink
  adapter?: Adapter
}

export interface ActionParams {
  commit?: any
  dispatch?: DispatchFunction
  getters?: any
  rootGetters?: any
  rootState?: any
  state?: RootState
  filter?: Filter
  id?: number
  data?: Data
  args?: Arguments
  variables?: Arguments
  bypassCache?: boolean
  query?: string | DocumentNode
  multiple?: boolean
  name?: string
}

export interface Data extends ORMInstance<PatchedModel> {
  [index: string]: any
}

export interface Filter {
  [index: string]: any
}

export interface Arguments {
  [index: string]: any
}

export interface GraphQLType {
  description: string
  name: string
  fields?: Array<GraphQLField>
  inputFields?: Array<GraphQLField>
}

export interface GraphQLField {
  description: string
  name: string
  args: Array<GraphQLField>
  type: GraphQLTypeDefinition
}

export interface GraphQLTypeDefinition {
  kind: string
  name?: string
  ofType: GraphQLTypeDefinition
}

export interface GraphQLSchema {
  types: Array<GraphQLType>
}

export interface Field {
  related?: typeof ORMModel
  parent?: typeof ORMModel
  localKey?: string
  foreignKey?: string
}

export class PatchedModel extends ORMModel {
  static eagerLoad?: Array<String>
  static eagerSave?: Array<String>
  static eagerSync?: Array<String>
  static skipFields?: Array<String>

  $isPersisted: boolean = false

  static async fetch(filter?: any, bypassCache: boolean = false): Promise<any> {
    return undefined
  }
  static async mutate(params: ActionParams): Promise<any> {
    return undefined
  }
  static async customQuery(params: ActionParams): Promise<any> {
    return undefined
  }

  async $mutate(params: ActionParams): Promise<any> {
    return undefined
  }

  async $customQuery(params: ActionParams): Promise<any> {
    return undefined
  }

  async $persist(args?: any): Promise<any> {
    return undefined
  }

  async $push(args?: any): Promise<any> {
    return undefined
  }

  async $destroy(): Promise<any> {
    return undefined
  }

  async $deleteAndDestroy(): Promise<any> {
    return undefined
  }
}
