# Custom Queries and Mutations

[[toc]]

With custom mutations and custom queries we distinguish between model related and model unrelated (simple) custom
quries/mutations. The difference is that model related queries/mutations always are tied to a model, so Vuex-ORM-GraphQL
expected that the query/mutation type is the same as the model. A model related custom mutation `upvotePost` is expected
to be of type `Post`. To make this even clearer, all model related queries and mutations are called on a specific Model
or a record of this model.

A simple query or simple mutation is not tied to a model. And so Vuex-ORM-GraphQL doesn't expect the result to be of a
specific type. Also the return value is not automatically inserted in the Vuex store.


::: warning
It's not a clean and good solution that the simple queries are also triggered via Vuex action, but currently the only
way. This might be changed in the future, when we find a better solution. 
:::


## Model related custom query

You may sometimes want to send custom GraphQL query. We support this via the `query` action. However please notice that
the convenienceMethods here are named `customMutation` and `$customMutation` due to a name conflict with the `query()`
method Vuex-ORM.

```javascript
const post = Post.query().first();
await post.$customQuery({ name: 'example' });

// is the same as
await Post.customQuery({ name: 'example', filter: { id: post.id } });

// or
await Post.dispatch('query', { name: 'example', filter: { id: post.id } });
```

As you can see you have to provide the query name and any further arguments you want to pass. In this case we send
the post id, but this could be anything else. Please also notice that `record.$customQuery` automatically adds the id
of the record into the arguments list. The plugin automatically determines if there are multiple records or a single
record is requests by looking in the arguments hash if there is a `id` field and respectively setups the query.

A model related custom query is always tied to the model, so the plugin expects the return value of the custom query
is of the model type. In this example that means, that Vuex-ORM-GraphQL expects that the `example` query is of type `Post`. 

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

Following fields are allowed:

- `name`: Required. The name of the query.
- `multiple`: Whether the query is of a connection type (multiple records are returned) or not (single record is returned).
- `filter`: Hash map with filters. These are passed as a filter typed variable like in fetch.
- `bypassCache`: Whether to bypass the caching.


## Model unrelated simple query

There might be cases when you just want to send a plan graphql query without having this plugin doing magic things.

Simple Queries allow to do that. Let's assume we do have a `status` query in our GraphQL API which let ask for the
status of all subsystems:

```javascript
const query = `
query status {
  backend
  smsGateway
  paypalIntegration
}`;

const result = store.dispatch('entities/simpleQuery', { query, variables: {}, bypassCache: true });
```

The result contains a hash which is shaped like the request:

```javascript
{
  backend: true,
  smsGateway: false,
  paypalIntegration: true
}
```

Nothing is inserted in the Vuex store.

Following fields are allowed:

- `query`: Required. The GraphQL query.
- `variables`: Variables to pass
- `bypassCache`: Whether to bypass the caching.


## Model related custom mutation

Along with the CRUD mutations you may want to send custom GraphQL mutations. We support this via the `mutate` action:

```javascript
const post = Post.query().first();
await post.$mutate({ name: 'upvotePost' });

// is the same as
await Post.mutate({ name: 'upvotePost', args: { id: post.id } });

// or
await Post.dispatch('mutate', { name: 'upvotePost', args: { id: post.id } });
```

As you can see you have to provide the mutation name and any further arguments you want to pass. In this case we send
the post id, but this could be anything else. Please also notice that `record.$mutate` automatically adds the id
of the record into the arguments list. The plugin automatically determines if there are multiple records or a single
record is requests by looking in the arguments hash if there is a `id` field and respectively setups the query.

A model related custom mutation is always tied to the model, so the plugin expects the return value of the custom query
is of the model type. In this example that means, that Vuex-ORM-GraphQL expects that the `upvotePost` mutation is of type
`Post`.

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


Following fields are allowed:

- `name`: Required. The name of the mutation.
- `multiple`: Whether the mutation is of a connection type (multiple records are returned) or not (single record is returned).
- `args`: Hash map with arguments (variables).


## Model unrelated simple mutation

Like simple custom queries, you can also send simple custom mutations. The action (`simpleQuery`) stays the same.
Let's assume we do have a `sendSms` mutation (this is a bad example, never setup your app like this please!) in our
GraphQL API which let us send a SMS.

```javascript
const query = `
mutation SendSms($to: string!, $text: string!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}`;

const result = store.dispatch('entities/simpleQuery', {
  query,
  variables: { to: '+4912345678', text: 'GraphQL is awesome!' }
});
```

The result contains a hash which is shaped like the request:

```javascript
{
  sendSms: {
    delivered: true
  }
}
```

Nothing is inserted in the Vuex store.

Following fields are allowed:

- `query`: Required. The GraphQL mutation query.
- `variables`: Hash map with variables to pass.


## Multiple or single record

Vuex-ORM-GraphQL tries to determine automatically if a  single record or a connection (multiple records) is returned by
a query/mutation via checking if a `id` field is set in the filter/args/variables. But sometimes you have a
query/mutation without ID but it still returns a single record or vice versa. For this case you can manually set the
`multiple` field to tell the plugin how the result is shaped:

```javascript
await Post.customQuery({ name: 'example', multiple: true, filter: { id: post.id } });
```

In future versions of this project this might be obsolete because it could consume and analyze the schema to know
how the queries and mutations are shaped.
