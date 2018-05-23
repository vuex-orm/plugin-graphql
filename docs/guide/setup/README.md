# Setup

[[toc]]

Installation of the Apollo plugin is easy. First add the package to your dependencies:

```bash
$ yarn add @vuex-orm/plugin-apollo
```

or

```bash
$ npm install --save @vuex-orm/plugin-apollo
```


After that we setup the plugin. Add this after registering your models to the database:

```javascript
import VuexORMApollo from '@vuex-orm/plugin-apollo';
VuexORM.use(VuexORMApollo, { database: database });
```

## Possible options

These are the possible options to pass when calling `VuexORM.use()`:

- `database` (required): The Vuex-ORM database.
- `url` (optional, default: '/graphql'): The URL to the graphql api. Will be passed to apollo-client.
- `debug` (optional, default: false): Set to true to activate the debug logging.

More options will come in future releases.

::: tip
We recommend to activate the debug mode in development env automatically via:
```javascript
{ debug: process.env.NODE_ENV !== 'production' }
```
:::
