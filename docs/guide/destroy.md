# destroy

[[toc]]


## $destroy()

Last thing you can do with a record is to delete it on the server after deleting (`delete` action) it on the client via
Vuex-ORM. For this use case we have the `destroy` action.

Via calling

```javascript
await post.$destroy();
// or
await post.$dispatch('destroy', { id: post.id });
```

the following GraphQL query is generated:


```graphql
mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    id
    title
    content
    
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

## $deleteAndDestroy()

You can also use the `$deleteAndDestroy()` action to delete the record from the store and from the server. It's just a
short convenience method for `$delete()` and `$destroy()`.
