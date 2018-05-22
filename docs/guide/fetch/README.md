# fetch

::: danger
TODO
:::


## Caching

Apollo-Client caches same queries. To bypass caching set the second param of the `fetch` action to `true`:

```
User.dispatch('fetch', { filter: { id: 42 }, bypassCache: true });
```
