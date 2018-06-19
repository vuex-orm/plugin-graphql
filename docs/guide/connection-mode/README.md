# Connection Mode

[[toc]]

It seems that there are several standards within the GraphQL community how connections (fields that returns multiple
records) are designed. Some do this via a `nodes` field, some via a `edges { nodes }` query and some do neither of them.
Vuex-ORM-GraphQL tries to be flexible and supports all of them, but the example queries in the documentation work with
the `nodes` query, don't be irritated.


## Automatic detection

The plugin will try to detect automatically which mode should be used by analyzing the GraphQL Schema. In the best
case you don't have to bother with this at all.


## Manual setting

In rare cases the automatic detection might fail or report the wrong mode. In this case, you can manually set the
`connectionQueryMode` config param to either `auto` (default), `nodes`, `edges`, `plain`. The modes and the resulting
queries are explained in the next sections.


## Mode 1: `nodes`

This is the preferred mode and used for the example queries in this documentation. Setting the connection mode to
`nodes` (or letting the plugin auto detect this mode) will lead to the following query when calling `User.fetch()`:

```
query Users {
  users {
    nodes {
      id
      email
      name
    }
  }
}
```

 
## Mode 2: `edges` 

This mode uses a `edges` not to query the edge an then query the `node` within that edge:

```
query Users {
  users {
    edges {
      node {
        id
        email
        name
      }
    }
  }
}
```


## Mode 3: `plain` 

The third mode is the less preferred one due to the lack of meta information. In this case we just plain pass the field
queries:

```
query Users {
  users {
    id
    email
    name
  }
}
```
