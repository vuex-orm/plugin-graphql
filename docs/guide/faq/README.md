# Frequently Asked Questions

[[toc]]

## WTF?

Good question, glad you asked! Maybe [this article](https://dev.to/phortx/vue-3-graphql-kj6) helps you. If not, feel
free to join us on our [Slack Channel](https://join.slack.com/t/vuex-orm/shared_invite/enQtMzY5MzczMzI2OTgyLTAwOWEwOGRjOTFmMzZlYzdmZTJhZGU2NGFiY2U2NzBjOWE4Y2FiMWJkMjYxMTAzZDk0ZjAxNTgzZjZhY2VkZDQ) 
for any questions and discussions.


## Does Vuex-ORM-GraphQL know my GraphQL Schema?

Yes, it does! Before the first query is sent, the plugin loads the schema from the GraphQL server and extracts different
information like the types of the fields to use, which fields to ignore, because they're not in the schema and whether
custom queries and mutations return a connection or a record.

Further it detects differences between the Vuex-ORM model definitions and the schema.

In the future there will probably be more smart consulting of your GraphQL schema, we're open for suggestions. 


## Is this plugin nativescript-vue compatible?

Yes, since version `0.0.38`.


## What is `await`?

It's a nice way to work with promises. See https://javascript.info/async-await.
