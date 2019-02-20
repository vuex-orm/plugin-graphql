# Introduction

Vuex-ORM-GraphQL is a plugin for the amazing [Vuex-ORM](https://github.com/vuex-orm/vuex-orm), which brings
Object-Relational Mapping access to the Vuex Store. Vuex-ORM-GraphQL enhances Vuex-ORM to let you sync your Vuex state
via the Vuex-ORM models with your server via a [GraphQL API](http://graphql.org/).

The plugin will automatically generate GraphQL queries and mutations based on your model definitions and by
reading your and GraphQL schema from your server. Thus it hides the specifics of Network Communication, GraphQL,
Caching, De- and Serialization of your Data and so on from the developer. Getting a record of a model from the server
is as easy as calling `Product.fetch()`. This allows you to write sophisticated Single-Page Applications fast and
efficient without worrying about GraphQL.


::: warning
You should have basic knowledge of [GraphQL](http://graphql.org/), [Vue](https://vuejs.org/),
[Vuex](https://vuex.vuejs.org/) and [Vuex-ORM](https://vuex-orm.github.io/vuex-orm/) before reading this documentation.
:::


---


[[toc]]


## Actions

While using Vuex-ORM with the GraphQL plugin you have to distinguish between two types of Vuex actions:

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
      // Load all users from the server
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

::: tip
Vuex-ORM-GraphQL works with the [Apollo Dev Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)!
:::


## Connection Mode

It seems that there are several standards within the GraphQL community how connections (fields that returns multiple
records) are designed. Some do this via a `nodes` field, some via a `edges { nodes }` query and some do neither of them.
Vuex-ORM-GraphQL tries to be flexible and supports all of them, but the example queries in the documentation work with
the `nodes` query, don't be irritated. You'll find [more details here](/guide/connection-mode).


## License

Vuex-ORM-GraphQL is open-sourced software licensed under the
[MIT license](https://github.com/phortx/vuex-orm-graphql/blob/master/LICENSE.md).
