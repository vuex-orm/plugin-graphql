# destroy

[[toc]]

Last thing you can do with a record is to delete it on the server after deleting (`delete` action) it on the client via
Vuex-ORM. For this use case we have the `destroy` action.

Via calling

```javascript
Post.dispatch('destroy', { id: post.id });
```

the following GraphQL query is generated:


```graphql
mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
```

Variables:

```json
{
  "id": 42
}
```


::: danger
**TODO**

- Example code
:::

