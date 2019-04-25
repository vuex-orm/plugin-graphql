# Setup

[[toc]]


## Installation

Installation of the GraphQL plugin is easy. First add the package to your dependencies:

```bash
$ yarn add @vuex-orm/plugin-graphql
```

or

```bash
$ npm install --save @vuex-orm/plugin-graphql
```


After that we setup the plugin. Add this after [registering your models to the database](https://vuex-orm.github.io/vuex-orm/guide/prologue/getting-started.html#register-models-and-modules-to-the-vuex-store):

```javascript
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
VuexORM.use(VuexORMGraphQL, { database });
```

## Possible options

These are the possible options to pass when calling `VuexORM.use()`:

- `database` (required): The Vuex-ORM database.
- `debug` (optional, default: `false`): Set to true to activate the debug logging.
- `url` (optional, default: `/graphql`): The URL to the graphql api. Will be passed to apollo-client.
- `headers` (optional, default: `{}`) HTTP Headers. See
  [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options).
  This can be a static object or a function, returning a object, which will be called before a request is made.
- `credentials` (optional, default: `same-origin`) Credentials Policy. See [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options)
- `useGETForQueries` (optional, default: `false`) Use GET for queries (not for mutations). See [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options)
- `connectionQueryMode` (optional, default: `auto`). One of `auto | nodes | edges | plain`. See [Connection Mode](connection-mode.md)

More options will come in future releases.

::: tip
We recommend to activate the debug mode in development env automatically via:
```javascript
{ debug: process.env.NODE_ENV !== 'production' }
```
:::
