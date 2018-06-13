# Virtual Fields

[[toc]]

It may happen that you want fields in your Vuex-ORM model, which are not in the respective GraphQL Type.
We call these "virtual fields" because they are only known to the Vuex-ORM and not to your backend or database.

This plugin will automatically query all fields of the model, but when your GraphQL API doesn't know a field, it returns
an error. So we have to prevent the querying of our virtual fields. For that we have the `skipFields` field in our model:


```javascript{4}
export default class Product extends Model {
    static entity = 'products';

    static skipFields = ['parsedMarkdownContent'];

    static fields () {
        return {
            id: this.increment(),
            title: this.string(''),
            content:  this.string(''),
            parsedMarkdownContent: this.string('')
        };
    }
}
```

With this model definition, the GraphQL plugin will produce the following GraphQL Query when `fetch` is called:

```graphql
query Posts() {
    posts {
      nodes {
        id
        title
        content
      }
    }
}
```

As you see the `parsedMarkdownContent` field is not queried.
