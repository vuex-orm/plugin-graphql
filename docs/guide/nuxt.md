# Nuxt.js / SSR Integration

[[toc]]

Since Version 1.0.0.RC.21 there is support for SSR. You will need
[node-fetch](https://www.npmjs.com/package/node-fetch) in order to make it work and you have to
construct your own HttpLink instance.

Example store setup for nuxt.js:

```javascript{13,14,15}
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
import { HttpLink } from 'apollo-link-http';
import database from './database';
import fetch from 'node-fetch';

const options = {
  database,
  url: process.env.BACKEND_URL + '/api/v2',
};

if (process.server) {
  options.link = new HttpLink({ uri: options.url, fetch });
}

VuexORM.use(VuexORMGraphQL, options);


export default function createStore () {
  const plugins = [VuexORM.install(database)];
  return new Vuex.Store({ plugins });
}
```
