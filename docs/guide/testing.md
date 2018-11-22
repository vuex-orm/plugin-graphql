# Testing

[[toc]]

## Unit Testing

To unit test vue components which use the persistence actions of this plugin, you need to mock
the results of the GraphQL queries. The GraphQL plugin offers some utils to do this.

First we have to import the mock method from the test utils via

```js
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
import { setupTestUtils, mock } from '@vuex-orm/plugin-graphql/lib/test-utils';
```

After that we have to setup the test utils, this is very easy, just pass the imported VuexORMGraphQL
plugin like this:

```
setupTestUtils(VuexORMGraphQL);
```

Now we're ready to go. In the next step we can setup mocks via

```js
mock('fetch').for(User).andReturn({ id: 1, name: 'Charlie Brown' });
```

This means: Whenever `User.fetch()` is called, insert `{ id: 1, name: 'Charlie Brown' }` in the Vuex-ORM
store.

The mock method also accepts a second param which allows to match specific calls. Only those
properties which are within the given object are considered while matching. Example:

```js
// Will only trigger when `User.fetch(17)` is called 
mock('fetch', { filter: { id: 17 } }).for(User).andReturn({ id: 17, name: 'Charlie Brown' });

// Will only trigger when `User.fetch({ filter: { active: true }})` is called
mock('fetch', { filter: { active: true } }).for(User).andReturn([
  { id: 17, name: 'Charlie Brown' },
  { id: 18, name: 'Snoopy' }
]);
``` 

Additionally the argument of `andReturn` can be a function, which will be called each time the mock
is triggered.

The following examples describe how each action type can be mocked.


### Fetch

```js
// This mock call
mock('fetch', { filter: { id: 42 }}).for(User).andReturn(userData);

// will be triggerd by
User.fetch(42);
```

### Persist

```js
// This mock call
mock('persist', { id: 17 }).for(User).andReturn({ id: 17, name: 'Charlie Brown' });

// will be triggerd by
user.$persist();
```

### Push

```js
// This mock call
mock('push', { data: { ... } }).for(User).andReturn({ id: 17, name: 'Charlie Brown' });

// will be triggerd by
user.$push();
```

### Destroy

```js
// This mock call
mock('destroy', { id: 17 }).for(User).andReturn({ id: 17, name: 'Charlie Brown' });

// will be triggerd by
user.$destroy();
```

### Custom query

```js
// This mock call
mock('query', { name: 'status' }).for(Post).andReturn({ ... });

// will be triggerd by
Post.customQuery({ name: 'status' });
```


### Mutate

```js
// This mock call
mock('mutate', { name: 'upvote', args: { id: 4 }}).for(Post).andReturn({ ... });

// will be triggerd by
post.$mutate({ name: 'upvote' });
```

### Simple Query

Mocking simple queries works slightly different then the other actions, because these are not model
related. Thus we have to mock these globally by omiting the model (`for`):

```js
// This mock call
mock('simpleQuery', { name: 'example' }).andReturn({ success: true });

// will be triggered by
store.dispatch('entities/simpleQuery', { query: 'query example { success }' });
```

### Simple Mutation

Works just like the simple queries:

```js
// This mock call
mock('simpleMutation', {
  name: 'SendSms',
  variables: { to: '+4912345678', text: 'GraphQL is awesome!' }
}).andReturn({ sendSms: { delivered: true }});

// will be triggered by
const query = `
mutation SendSms($to: string!, $text: string!) {
  sendSms(to: $to, text: $text) {
    delivered
  }
}`;

const result = await store.dispatch('entities/simpleMutation', {
  query,
  variables: { to: '+4912345678', text: 'GraphQL is awesome!' }
});
```


### Resetting a mock

::: warning
Support for resetting a mock is currently work in progress and will be added soon.

See https://github.com/vuex-orm/plugin-graphql/issues/61
:::


## Misc

The testing utils also provide some other useful functions, which are listed here:

- `async clearORMStore()`: Will remove all records from the Vuex-ORM store to clean up while testing.


## Integration Testing

::: warning
Support for integration testing is currently work in progress and will be added soon.

See https://github.com/vuex-orm/plugin-graphql/issues/59
:::
