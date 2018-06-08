# Custom Queries

[[toc]]


You may sometimes want to send custom GraphQL query. We support this via the `query` action. However please notice that
the convenienceMethods here are named `customMutation` and `$customMutation` due to a name conflict with the `query()`
method Vuex-ORM.

```javascript
const post = Post.query().first();
await post.$customQuery({ query: 'example' });

// is the same as
await Post.customQuery({ query: 'example', id: post.id });

// or
await Post.dispatch('query', { query: 'example', id: post.id });
```

As you can see you have to provide the query name and any further arguments you want to pass. In this case we send
the post id, but this could be anything else. Please also notice that `record.$customQuery` automatically adds the id
of the record into the arguments list. The plugin automatically determines if there are multiple records or a single
record is requests by looking in the arguments hash if there is a `id` field and respectively setups the query.

A custom query is always tied to the model, so the plugin expects the return value of the custom query is of the model
type. In this example that means, that Vuex-ORM-Apollo expects that the `example` query is of type `Post`. 

This generates the following query:


```graphql
mutation Example($id: ID!) {
  example(post: $id) {
    id
    userId
    content
    title

    user {
      id
      email
    }
  }
}
```

Variables:

```json
{
  "id": 42
}
```

Like for all other operations, all records which are returned replace the respective existing records in the Vuex-ORM
database.
