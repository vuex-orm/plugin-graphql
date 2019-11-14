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
- `apolloClient` (optional): Provide a preconfigured instance of the Apollo client. See [client](#client)
- `database` (required): The Vuex-ORM database.
- `debug` (optional, default: `false`): Set to true to activate the debug logging.
- `url` (optional, default: `/graphql`): The URL to the graphql api. Will be passed to apollo-client.
- `headers` (optional, default: `{}`) HTTP Headers. See
  [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options).
  This can be a static object or a function, returning a object, which will be called before a request is made.
- `credentials` (optional, default: `same-origin`) Credentials Policy. See [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options)
- `useGETForQueries` (optional, default: `false`) Use GET for queries (not for mutations). See [apollo-link-http](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options)
- `adapter` (optional, default: `DefaultAdapter`). See [Adapters](adapters.md)

::: tip
We recommend to activate the debug mode in development env automatically via:
```javascript
{ debug: process.env.NODE_ENV !== 'production' }
```
:::

## Client

You can inject your own instance of the Apollo Client using `option.apolloClient`. This is useful if
the app requires a more complex configuration, such as integration with AWS AppSync. When `apolloClient`
is used, `plugin-graphql` ignores any other options to configure Apollo client.

Here is an example configuration for AWS AppSync:

```
import VuexORM from '@vuex-orm/core'
import AWSAppSyncClient from 'aws-appsync'
import { Auth } from 'aws-amplify'
import VuexORMGraphQL from '@vuex-orm/plugin-graphql'

import database from '../database'
import awsexports from '../aws-exports'

const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  },
  connectionQueryMode: 'nodes',
  database: database,
  url: awsexports.aws_appsync_graphqlEndpoint,
  includeExtensions: true,
  debug: process.env.NODE_ENV !== 'production'
}

const config = {
  url: awsexports.aws_appsync_graphqlEndpoint,
  region: awsexports.aws_appsync_region,
  auth: {
    type: awsexports.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
}

const client = new AWSAppSyncClient(config, options)

options.apolloClient = client

VuexORM.use(VuexORMGraphQL, options)

export const plugins = [
  VuexORM.install(database)
]
```
