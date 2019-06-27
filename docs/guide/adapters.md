# Adapters

[[toc]]

There is not single true way to design a GraphQL schema and thus there are 
some small differences between the implementations, however this plugin has to automatically
generate GraphQL queries, has to parse the schema and de-/serialize the data. Thus we needed a way
to customize how this plugin should behave and communicate with the API. For this we implemented an
adapter pattern, which allows you to setup your own adapter and customize it.


## Basics

Every adapter has to implement the `Adapter` interface (when your're working with TypeScript).
However it's easier to just inherit from the DefaultAdapter:

`data/custom-adapter.js`:
```javascript
import { DefaultAdapter, ConnectionMode } from '@vuex-orm/plugin-graphql';

export default class CustomAdapter extends DefaultAdapter {
  // Your code here
  
  // Example
  getConnectionMode() {
    return ConnectionMode.PLAIN
  }
}
``` 

Then register this adapter when setting up the plugin:

`data/store.js`:
```javascript
import CustomAdapter from './custom-adapter.ts'; 

// ...

VuexORM.use(VuexORMGraphQL, {
  database,
  adapter: new CustomAdapter,
});
```


That's it. In the next sections you can read what and how you can customize the adapter.


## Methods

Each Adapter has to implement a bunch of methods. Here is the list of the currently supported
method signatures and their value in the default adapter:

- `getRootQueryName(): string;`
    - Returns the name of the type all query types inherit.
    - Default adapter value: `Query`

- `getRootMutationName(): string;`
    - Returns the name of the type all mutation types inherit.
    - Default adapter value: `Mutation`

- `getNameForPersist(model: Model): string;`
    - Returns the mutation name for persisting (creating) a record.
    - Default adapter value example: `createPost`
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    
- `getNameForPush(model: Model): string;`
    - Returns the mutation name for pushing (updating) a record.
    - Default adapter value example: `updatePost`
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
   
- `getNameForDestroy(model: Model): string;`
    - Returns the mutation name for destroying a record.
    - Default adapter value example: `deletePost`
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
   
- `getNameForFetch(model: Model, plural: boolean): string;`
    - Returns the query field for fetching a record.
    - Default adapter value example: `posts` or `post`
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    - `plural` tells if one or multiple records (connection) are fetched.

- `getConnectionMode(): ConnectionMode;`
    - Returns the [ConnectionMode](connection-mode.md).
    - Default adapter value: `AUTO`

- `getArgumentMode(): ArgumentMode;`
    - Returns the ArgumentMode for filtering and inputs (push, persist).
    - Default adapter value: `TYPE`

- `getFilterTypeName(model: Model): string;`
    - Returns the name of the filter type for a model.
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    - Default adapter value example: `PostFilter`
    
- `getInputTypeName(model: Model, action?: string): string;`
    - Returns the name of the input type for a model.
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    - Default adapter value example: `PostInput`


## ArgumentMode

The `getArgumentMode()` methods determines the ArgumentMode, which knows to options: `LIST` and `TYPE`.
It tells the plugin how arguments should be passed to queries and mutations.


### `TYPE`

`TYPE` is the value in the default adapter and causes the plugin to use a `Input` or `Filter` type:

For `$persist()`:
```
mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
    ...
  }
}
```

For `fetch()`:
```
query Posts($title: String!) {
  posts(filter: {title: $title}) {
    ...
  }
}
```


### `LIST`

`LIST` causes the plugin to use plain lists:

For `$persist()`:
```
mutation CreatePost($id: ID!, $authorId: ID!, $title: String!, $content: String!) {
  createPost(id: $id, authorId: $authorId, title: $title, content: $content) {
    ...
  }
}
```

For `fetch()`:
```
query Posts($title: String!) {
  posts(title: $title) {
    ...
  }
}
```
