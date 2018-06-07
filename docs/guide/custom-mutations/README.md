# Custom Mutations

[[toc]]


Along with the CRUD mutations you may want to send custom GraphQL mutations. We support this via the `mutate` action:

```javascript
Post.dispatch('mutate', { mutation: 'upvotePost', id: post.id });
```

As you can see you have to privide the mutation name and any further arguments you want to pass. In this case we send
the post id, but this could be anything. This generates the following query:


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
