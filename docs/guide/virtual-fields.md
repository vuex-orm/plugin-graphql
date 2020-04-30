# Virtual Fields

[[toc]]

It may happen that you want fields in your Vuex-ORM model, which are not in the respective GraphQL Type.
We call these "virtual fields" because they are only known to the Vuex-ORM and not to your backend or database.

This plugin will automatically detect which fields are not included in the schema and will not query them at all.

Let's assume we have a product model with the field `parsedMarkdownContent` which is not known to our GraphQL server:

```javascript{4}
export default class Product extends Model {
    static entity = 'products';

    static fields () {
        return {
            id: this.uid(),
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

As you see the `parsedMarkdownContent` field is not queried due to the fact that it's not in the GraphQL Schema.
