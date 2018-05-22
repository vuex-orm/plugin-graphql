# Introduction

This [Vuex-ORM](https://github.com/vuex-orm/vuex-orm) plugin uses the
[apollo-client](https://www.apollographql.com/client/) to let you sync your Vuex state with
a [GraphQL API](http://graphql.org/).

::: warning
This plugin is in BETA stage, please use with care.
:::


## Actions

While using Vuex-ORM with the Apollo plugin you have to distinct between two types of Vuex actions:

- Vuex-ORM actions: Retrieve data from or save data to Vuex (`Vue Component <--> Vuex Store`)
- Persistence actions: Load data from or persist data to the GraphQL API (`Vuex Store <--> GraphQL Server`)

The following table lists all actions and what they to:

CRUD | Vuex Only | Persist to GraphQL API
--| -- | --
**R**EAD | getters['find'] & getters['findAll'] | dispatch('fetch')
**C**REATE | dispatch('create') | dispatch('persist')
**U**PDATE | dispatch('save') | dispatch('push')
**D**ELETE | dispatch('delete') | dispatch('destroy')

See the example below to get an idea of how this plugin interacts with Vuex-ORM.


## Example usage

After [installing](/guide/setup) this plugin you can load data in your component:

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


## License

Vuex ORM Apollo is open-sourced software licensed under the
[MIT license](https://github.com/phortx/vuex-orm-apollo/blob/master/LICENSE.md).
