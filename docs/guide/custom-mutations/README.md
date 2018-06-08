# Custom Mutations

[[toc]]


Along with the CRUD mutations you may want to send custom GraphQL mutations. We support this via the `mutate` action:

```javascript
const post = Post.query().first();
await post.$mutate({ mutation: 'upvotePost' });

// is the same as
await Post.mutate({ mutation: 'upvotePost', id: post.id });

// or
await Post.dispatch('mutate', { mutation: 'upvotePost', id: post.id });
```

As you can see you have to provide the mutation name and any further arguments you want to pass. In this case we send
the post id, but this could be anything else. Please also notice that `record.$mutate` automatically adds the id
of the record into the arguments list. The plugin automatically determines if there are multiple records or a single
record is requests by looking in the arguments hash if there is a `id` field and respectively setups the query.

A custom mutation is always tied to the model, so the plugin expects the return value of the custom query is of the
model type. In this example that means, that Vuex-ORM-Apollo expects that the `upvotePost` mutation is of type `Post`.

This generates the following query:


```graphql
mutation UpvotePost($id: ID!) {
  upvotePost(post: $id) {
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
