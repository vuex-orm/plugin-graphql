import Vue from "vue";
import Vuex from "vuex";
import VuexORM, { Database, Model } from "@vuex-orm/core";
import VuexORMGraphQLPlugin from "../../src";
import { SchemaLink } from "apollo-link-schema";
import { ApolloLink } from "apollo-link";
import { makeExecutableSchema } from "graphql-tools";
import { prettify } from "../../src/support/utils";
import { typeDefs, resolvers } from "./mock-schema";
import sinon from "sinon";
import Adapter from "../../src/adapters/adapter";

// @ts-ignore
Vue.use(Vuex);

export let link: ApolloLink;

export interface Entity {
  model: typeof Model;
  module?: object;
}

/**
 * Create a new Vuex Store.
 */
export function createStore(entities: Array<Entity>, headers?: any, adapter?: Adapter) {
  const database = new Database();

  entities.forEach(entity => {
    database.register(entity.model, entity.module || {});
  });

  // @ts-ignore
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  link = new SchemaLink({ schema: executableSchema });

  VuexORM.use(VuexORMGraphQLPlugin, {
    database: database,
    link,
    headers,
    adapter
  });

  const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
  });

  return [store, VuexORMGraphQLPlugin.instance];
}

export async function recordGraphQLRequest(callback: Function, allowToFail: boolean = false) {
  const spy = sinon.spy(link, "request");

  try {
    await callback();
  } catch (e) {
    //console.log(JSON.stringify(e, null, 2));
    throw e;
  }

  spy.restore();

  if (spy.notCalled) {
    if (allowToFail) {
      return null;
    } else {
      throw new Error("No GraphQL request was made.");
    }
  }

  const relevantCall = spy.getCalls().find(c => c.args[0].operationName !== "Introspection");

  return {
    operationName: relevantCall!.args[0].operationName,
    variables: relevantCall!.args[0].variables,
    query: prettify(relevantCall!.args[0].query.loc!.source.body)
  };
}
