# Introduction

This [Vuex-ORM](https://github.com/vuex-orm/vuex-orm) plugin uses the
[apollo-client](https://www.apollographql.com/client/) to let you sync your Vuex-ORM database with your server via
a [GraphQL API](http://graphql.org/).

::: warning
This plugin is in BETA stage, please use with care.
:::

::: warning
You should have basic knowledge of [Vue](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/) and
[Vuex-ORM](https://vuex-orm.github.io/vuex-orm/) before reading this documentation.
:::


---


[[toc]]


## Actions

While using Vuex-ORM with the Apollo plugin you have to distinct between two types of Vuex actions:

- Vuex-ORM actions: Retrieve data from or save data to Vuex (`Vue Component <--> Vuex Store`)
- Persistence actions: Load data from or persist data to the GraphQL API (`Vuex Store <--> GraphQL Server`)

The following table lists all actions and what they do:

CRUD | Vuex Only | Persist to GraphQL API
--| -- | --
**R**EAD | [`find()`](https://vuex-orm.github.io/vuex-orm/store/retrieving-data.html#get-single-data), [`all()`](https://vuex-orm.github.io/vuex-orm/store/retrieving-data.html#get-all-data), [`query()`](https://vuex-orm.github.io/vuex-orm/store/retrieving-data.html#query-builder) | [`fetch()`](/guide/fetch)
**C**REATE | [`create()`](https://vuex-orm.github.io/vuex-orm/store/inserting-and-updating-data.html#inserts) or [`insert()`](https://vuex-orm.github.io/vuex-orm/store/inserting-and-updating-data.html#inserts) | [`$persist()`](/guide/persist)
**U**PDATE | [`$update()`](https://vuex-orm.github.io/vuex-orm/store/inserting-and-updating-data.html#updates) | [`$push()`](/guide/push)
**D**ELETE | [`$delete()`](https://vuex-orm.github.io/vuex-orm/store/deleting-data.html) | [`$destroy()`](/guide/destroy)

See the example below to get an idea of how this plugin interacts with Vuex-ORM.




## Example usage

After [installing](/guide/setup) this plugin you can load data in your component:

```vue
<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{user.name}}
      
      <a href="#" @click.prevent="destroy(user)">x</a>
    </li>
  </ul>
</template>


<script>
  import User from 'data/models/user';
  
  export default {
    computed: {
      /**
       * Returns all users with reactivity.
       */ 
      users: () => User.query().withAll().all()
    },


    async mounted() {
      // Load all users form the server
      await User.fetch();
    },
    
    
    methods: {
      /**
      * Deletes the user from Vuex Store and from the server. 
      */
      async destroy(user) {
        await user.$deleteAndDestroy();
      }
    }
  }
</script>
```


## License

Vuex ORM Apollo is open-sourced software licensed under the
[MIT license](https://github.com/phortx/vuex-orm-apollo/blob/master/LICENSE.md).
