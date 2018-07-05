import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM, { Database } from '@vuex-orm/core';
import VuexORMGraphQLPlugin from "app";
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import {upcaseFirstLetter, prettify} from "app/support/utils";
import { typeDefs, resolvers } from 'test/support/mock-schema.js';
import sinon from 'sinon';

Vue.use(Vuex);

export let link;


/**
 * Create a new Vuex Store.
 */
export function createStore (entities) {
  const database = new Database();

  _.forEach(entities, (entity) => {
    database.register(entity.model, entity.module || {})
  });

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  link = new SchemaLink({ schema: executableSchema });

  VuexORM.use(VuexORMGraphQLPlugin, {
    database: database,
    link
  });

  const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
  });

  return [store, VuexORMGraphQLPlugin.instance];
}


export async function recordGraphQLRequest(callback, allowToFail = false) {
  const spy = sinon.spy(link, 'request');

  try {
    await callback();
  } catch(e) {
    console.log(JSON.stringify(e, null, 2));
    throw e;
  }

  spy.restore();

  if (spy.notCalled) {
    if (allowToFail) {
      return null;
    } else {
      throw new Error('No GraphQL request was made.');
    }
  }

  const relevantCall = spy.getCalls().find((c) => {
    if (c.args[0].operationName !== 'Introspection') {
      return true;
    }
  });

  return {
    operationName: relevantCall.args[0].operationName,
    variables: relevantCall.args[0].variables,
    query: prettify(relevantCall.args[0].query.loc.source.body)
  };
}
