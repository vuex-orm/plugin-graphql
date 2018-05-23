# persist

[[toc]]


After creating a new record via Vuex-ORM you may want to save it to your server via GraphQL. For this use case we have
the `persist` action.

Via calling

```javascript
Post.dispatch('persist', { id: post.id });
```

the post record is send to the GraphQL by generating the following query:


```graphql
mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
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
  "post": {
    "id": 42,
    "userId": 15,
    "content": "Lorem Ipsum dolor sit amet",
    "title": "Example Post",
    "user": {
      "id": 15,
      "email": "example@example.com"
    }
  }
}
```

Like when pushing, all records which are returned replace the respective existing records in the Vuex-ORM database.


::: danger
**TODO**

- Example code
:::
