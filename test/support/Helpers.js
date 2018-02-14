import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM, { Database, Model } from '@vuex-orm/core';
// import installVuexORMApollo from 'app';

Vue.use(Vuex);

/**
 * Create a new Vuex Store.
 */
export function createStore (entities) {
  const database = new Database();

  _.forEach(entities, (entity) => {
    database.register(entity.model, entity.module || {})
  });

  // VuexORM.use(installVuexORMApollo, { database: database });

  return new Vuex.Store({
    plugins: [VuexORM.install(database)]
  });
}
