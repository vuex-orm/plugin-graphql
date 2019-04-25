# Adapters

[[toc]]

There is not single true way to design a GraphQL schema and thus there are 
some small differences between the implementations, however this plugin has to automatically
generate GraphQL queries, has to parse the schema and de-/serialize the data. Thus we needed a way
to customize how this plugin should behave and communicate with the API. For this we implemented an
adapter pattern, which allows you to setup your own adapter and customize it.

Every adapter has to implement the `Adapter` interface (when your're working with TypeScript).
However it's easier to just inherit from the DefaultAdapter:

`data/custom-adapter.js`:
```javascript
import DefaultAdapter from '@vuex-orm/plugin-graphql';

export default class CustomAdapter extends DefaultAdapter {
  // Your code here
}
``` 

Then register this adapter when setting up the plugin:

`data/store.js`:
```javascript
import CustomAdapter from './custom-adapter.ts'; 

// ...

VuexORM.use(VuexORMGraphQL, {
  database,
  adapter: CustomAdapter,
});
```


That's it. In the next sections you can read what and how you can customize the adapter.


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

- `getFilterMode(): ArgumentMode;`
    - Returns the [ArgumentMode](argument-mode.md) for filtering.
    - Default adapter value: `TYPE`

- `getInputMode(): ArgumentMode;`
   - Returns the [ArgumentMode](argument-mode.md) for inputs (persist and push).
   - Default adapter value: `TYPE`
   
- `getFilterTypeName(model: Model): string;`
    - Returns the name of the filter type for a model.
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    - Default adapter value example: `PostFilter`
    
- `getInputTypeName(model: Model, action?: string): string;`
    - Returns the name of the input type for a model.
    - `model` is a instance of [Model](https://github.com/vuex-orm/plugin-graphql/blob/master/src/orm/model.ts)
    - Default adapter value example: `PostInput`
