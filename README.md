# vuex-orm-apollo

[![Travis CI](https://travis-ci.org/phortx/vuex-orm-apollo.svg?branch=master)](https://travis-ci.org/phortx/vuex-orm-apollo)
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



## Roadmap

- [x] Setup apollo integration
- [x] Implement fetch action
- [x] Make sure the reactivity works
- [ ] Playground project (GraphQL API + Vue/Vuex-ORM app)
- [ ] Tests
- [ ] Docs & document schema expectations
- [ ] Deletions & persist
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


### apollo-link import bug

Currently there exists [a bug in apollo-link](https://github.com/apollographql/apollo-link/issues/248), which causes
errors in vuex-orm-apollo. As a workaround, you have to change he file `node_modules/apollo-link/lib/index.js` after
installing the node_modules.

In line 3 change

```javascript
import * as Observable from 'zen-observable';
```

to:

```javascript
import Observable from 'zen-observable';
``` 


## License

Vuex ORM Apollo is open-sourced software licensed under the [MIT license](https://github.com/phortx/vuex-orm-apollo/blob/master/LICENSE.md).
