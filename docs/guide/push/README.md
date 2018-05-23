# push

[[toc]]

After fetching (`fetch` action) and changing (`save` action) a record via Vuex-ORM you probably want to save it back to
your server via GraphQL. For this use case we have the `push` action.

Via calling

```javascript
Post.dispatch('push', { data: post });
```

the post record is send to the GraphQL by generating the following query:


```graphql
mutation UpdatePost($id: ID!, $post: PostInput!) {
  updatePost(id: $id, post: $post) {
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
  "id": 42,
  "post": {
    "id": 42,
    "userId": 15,
    "content": "Some more exciting content!",
    "title": "Not a example post",
    "user": {
      "id": 15,
      "email": "example@example.com"
    }
  }
}
```

Like when persisting, all records which are returned replace the respective existing records in the Vuex-ORM database.


::: danger
**TODO**

- Example code
:::
