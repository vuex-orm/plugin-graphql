import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM, { Database, Model } from '@vuex-orm/core';
import installVuexORMApollo from 'app';
import fetchMock from 'fetch-mock';

Vue.use(Vuex);

let fetchMockSetupDone = false;

/**
 * Create a new Vuex Store.
 */
export function createStore (entities) {
  const database = new Database();

  if (!fetchMockSetupDone) {
    fetchMock.get('*', {});
    fetchMockSetupDone = true;
  }

  _.forEach(entities, (entity) => {
    database.register(entity.model, entity.module || {})
  });

  VuexORM.use(installVuexORMApollo, { database: database });

  return new Vuex.Store({
    plugins: [VuexORM.install(database)]
  });
}



export async function sendWithMockFetch(response, callback) {
  fetchMock.post('/graphql', response);

  try {
    await callback();

  } catch (error) {
    console.error("An error occured:");
    console.error(error);
    throw new Error("Request failed!");
  }

  const request = fetchMock.lastCall();

  if (!request) throw new Error("No request was made!");

  fetchMock.restore();

  /*
    Generates

    {
      operationName: "Users",
      query: "query Users {\n  users {\n    nodes {\n      id\n      name\n      posts {\n        nodes {\n          id\n          title\n          content\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      variables: {}
    }
   */
  return JSON.parse(request[1].body);
}
