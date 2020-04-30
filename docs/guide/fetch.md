# fetch

[[toc]]

The `fetch` action is for loading data from the GraphQL API into your Vuex-Store.


## Fetching all records

The simplest way to call the fetch
method is without any arguments. This will query all records from the GraphQL API:

```javascript
await Comment.fetch();
// or
await Comment.dispatch('fetch')
```

This produces the following GraphQL query:

```graphql
query Comments {
  comments {
    nodes {
      id
      content
      postId
      userId

      user {
        id
        email
      }

      post {
        id
        content
        title

        user {
          id
          email
        }
      }
    }
  }
}
```

When you look in the store after a fetch, you'll find that there is the comment, comment author user, post and posts
author user loaded.

So using the regular Vuex-ORM getters should work out of the box now:

```javascript
const comments = Comment.query().withAll().all();
```

When fetching all returned records replace the respective existing records in the Vuex-ORM database.


## Fetching a single record

You can also fetch single records via ID:

```javascript
await Comment.fetch('42');
// or
await Comment.fetch({ id: '42' });
// or
await Comment.dispatch('fetch', { filter: { id: '42' }})
```

It automatically recognizes, that you're requesting a single record and sends a GraphQL Query for a single record:

```graphql
query Comment($id: ID!) {
  comment(id: $id) {
    id
    content
    postId
    userId

    user {
      id
      email
    }

    post {
      id
      content
      title

      user {
        id
        email
      }
    }
  }
}
```


## Filtering

Additionally you can pass a filter object to the fetch action like this:

```javascript
await Comment.fetch({ postId: '15', deleted: false });
// or
await Comment.dispatch('fetch', { filter: { postId: '15', deleted: false }})
```

This will generate the following GraphQL query:

```graphql
query Comments($postId: ID!, $deleted: Boolean!) {
  comments(filter: { postId: $postId, deleted: $deleted }) {
    nodes {
      id
      content
      postId
      userId

      user {
        id
        email
      }

      post {
        id
        content
        title

        user {
          id
          email
        }
      }
    }
  }
}
```


## Usage with vue-router

When you use vue-router, you should call your fetch actions in the page component after the navigation. Also we highly
recommend the usage of async/await.

```vue
<template>
  <div class="post" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
  export default {
    // Use a computed property for the component state to keep it reactive
    computed: {
      post: () => Post.find('1')
    },

    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData();
    },

    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },

    methods: {
      // Loads the data from the server and stores them in the Vuex Store.
      async fetchData () {
        await Post.fetch({ filter: { id: this.$route.params.id }});
      }
    }
  }
</script>
```


## Caching

The plugin caches same queries. To bypass caching set the second param of the `fetch` action to `true`
when using the convenience method or add `bypassCache: true` to the arguments of the `dispatch()` call

```javascript
await Comment.fetch({ id: '42' }, true );
// Or
await Comment.dispatch('fetch', { filter: { id: '42' }, bypassCache: true })
```
