# Nuxt.js / SSR Integration

[[toc]]

Since Version 1.0.0.RC.21 there is support for SSR. The following example shows how to setup
Vuex-ORM and Plugin GraphQL with Nuxt.

`nuxt.config.js`:

```javascript
export default { 
  plugins: [
    '~/plugins/graphql',
    '~/plugins/vuex-orm'
  ] 
};
```

`/store/index.js`:

```javascript
export const state = () => ({});
```


`/plugins/vuex-orm.js`:

```javascript
import VuexORM from '@vuex-orm/core';
import database from '~/data/database';

export default ({ store }) => {
  VuexORM.install(database)(store);
};

```

`/data/database.js`:

```javascript
import { Database } from '@vuex-orm/core';
import User from '~/data/models/user';
// ...

const database = new Database();
database.register(User);
// ...

export default database;

```


`/plugins/graphql.js`:

```javascript
import VuexORM from '@vuex-orm/core';
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import database from '~/data/database';

// The url can be anything, in this example we use the value from dotenv
export default function({ app, env: { url } }) {
    const apolloClient = app?.apolloProvider?.defaultClient
    const options = { database, url };

    if (apolloClient) {
      options.apolloClient = apolloClient
    } else {
      options.link = new HttpLink({ uri: options.url, fetch });
    }

    VuexORM.use(VuexORMGraphQL, options);
}
```
