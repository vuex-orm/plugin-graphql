# vuex-orm-apollo

[![Travis CI](https://travis-ci.org/phortx/vuex-orm-apollo.svg?branch=master)](https://travis-ci.org/vuex-orm/vuex-orm-apollo)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/@vuex-orm/core.svg)](https://github.com/vuex-orm/vuex-orm/blob/master/LICENSE.md)

This Vuex-ORM plugin let's you sync the data against a GraphQL API via Apollo.

**Warning:** This plugin is still under development, use with care.


## Usage

```bash
$ yarn add @vuex-orm/plugin-apollo
```

or

```bash
$ npm install --save @vuex-orm/plugin-apollo
```

Add this after registering your models to the database:

```javascript
import installVuexORMApollo from '@vuex-orm/plugin-apollo';
VuexORM.use(installVuexORMApollo, { database: database });
```

In your component:

```vue
<template>
    <ul>
        <li v-for="user in users" :key="user.name">{{user.name}}</li>
    </ul>
</template>


<script>
    export default {
        computed: {
            users: () => store.getters['entities/users/all']()
        },
        
        created() {
            this.$store.dispatch('entities/users/fetch');
        }
    }
</script>
```


## Possible options:

- `database` (required): The Vuex-ORM database.
- `debug` (optional, default: false): Set to true to activate the debug logging.


## API

While using Vuex-ORM you have to distinct between two types of operations:

- Vuex operations: Retrieve or save data from or to Vuex
- Persistence operations: Load or persist data from Vuex to the GraphQL API

The following table lists all operations you can use and what they to:

CRUD | Vuex Only | Persist to GraphQL API
--| -- | --
**R**EAD | getters['find'] & getters['findAll'] | dispatch('fetch')
**C**REATE | dispatch('create) | dispatch('persist')
**U**PDATE | dispatch('save') | dispatch('push')
**D**ELETE | dispatch('delete') | dispatch('destroy')


## Schema expectations

This plugin has an opinion how the GraphQL API schema should look like:

- Query for multiple records is plural camelCase: `blogPosts`
- Mutations begin with the verb (`create`, `update`, `delete`) and the camelCased entity: `createBlogPost` for example.
- The create mutation expects the new record as argument
- The update mutation expects two arguments: The ID and the new record
- The delete mutation expects the record ID to delete

You can see query examples in the [project wiki](https://github.com/vuex-orm/vuex-orm-apollo/wiki).


## Roadmap

- [x] Setup apollo integration
- [x] Implement fetch action
- [x] Make sure the reactivity works
- [x] destroy, push & persist
- [ ] Playground project (GraphQL API + Vue/Vuex-ORM app)
- [x] Tests
- [x] Docs & document schema expectations
- [ ] Subscriptions
- [ ] Attach multiple GraphQL APIs with different models in the same app



## Contribution

```bash
$ yarn run build
```

Compile files and generate bundles in dist directory.

```bash
$ yarn run lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn run test
```

Run the test using Mocha Webpack.

```bash
$ yarn run coverage
```

Generate test coverage in coverage directory.


## License

Vuex ORM Apollo is open-sourced software licensed under the [MIT license](https://github.com/phortx/vuex-orm-apollo/blob/master/LICENSE.md).
