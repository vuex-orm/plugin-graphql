# vuex-orm-apollo

[![Travis CI](https://travis-ci.org/vuex-orm/vuex-orm-apollo.svg?branch=master)](https://travis-ci.org/vuex-orm/vuex-orm-apollo)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/@vuex-orm/vuex-orm-apollo.svg)](https://github.com/vuex-orm/vuex-orm-apollo/blob/master/LICENSE.md)

This [Vuex-ORM](https://github.com/vuex-orm/vuex-orm) plugin uses the
[apollo-client](https://www.apollographql.com/client/) to let you sync your Vuex state with
a [GraphQL API](http://graphql.org/)

**Warning:** This is a early version of the plugin, use with care.


## Documentation

https://vuex-orm.github.io/vuex-orm-apollo/


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
- `url` (optional, default: '/graphql'): The URL to the graphql api. Will be passed to apollo-client.
- `debug` (optional, default: false): Set to true to activate the debug logging.


## API

While using Vuex-ORM you have to distinct between two types of operations:

- Vuex operations: Retrieve or save data from or to Vuex
- Persistence operations: Load or persist data from Vuex to the GraphQL API

The following table lists all operations you can use and what they to:

CRUD | Vuex Only | Persist to GraphQL API
--| -- | --
**R**EAD | getters['find'] & getters['findAll'] | dispatch('fetch')
**C**REATE | dispatch('create') | dispatch('persist')
**U**PDATE | dispatch('save') | dispatch('push')
**D**ELETE | dispatch('delete') | dispatch('destroy')


## Eager Loading

All `belongsTo` and `hasOne` related entities are eager loaded when fetch is called. All other related entities have to 
be added to a static field in the model called `eagerLoad` to have them eagerly loaded with fetch.

Example:

```javascript
class User extends Model {
  static entity = 'users';
  static eagerLoad = ['posts'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      
      posts: this.hasMany(Post, 'userId')
    }
  }
}
```


## Caching

Apollo-Client caches same queries. To bypass caching set the second param of the `fetch` action to `true`:

```
User.dispatch('fetch', { filter: { id: 42 }, bypassCache: true });
```



## Schema expectations

This plugin has an opinion how the GraphQL API schema should look like:

- Query for multiple records is plural camelCase: `blogPosts`
- Mutations begin with the verb (`create`, `update`, `delete`) and the camelCased entity: `createBlogPost` for example.
- The create mutation expects the new record as argument
- The update mutation expects two arguments: The ID and the new record
- The delete mutation expects the record ID to delete
- Multiple records are within a `nodes` object and filtered by a `filter` argument.

You can see query examples in the [project wiki](https://github.com/vuex-orm/vuex-orm-apollo/wiki/Example-Queries).


## Special record properties

This plugin adds a special property to your models: `$isPersisted`, which represents if this record is persisted on
the server. It's true for all records except newly created ones. 



## Contribution

To test this plugin in your existing project, you can use `yarn link` functionality. Run `yarn link` in your local
vuex-orm-apollo directory and run `yarn link @vuex-orm/plugin-apollo` in your project dir.

Remember to run `yarn build` in your vuex-orm-apollo directory and then again `yarn link` in your project after you have
made changes to the plugin code. You probably have also to restart your webpack server.


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
