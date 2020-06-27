<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/blob/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: GraphQL</h1>

<h3 align="center">This project is powered by <a href="https://www.i22.de/" target="_blank">i22 Digitalagentur GmbH</a></h3>

<p align="center">
  <a href="https://travis-ci.org/vuex-orm/plugin-graphql">
    <img src="https://travis-ci.org/vuex-orm/plugin-graphql.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide">
  </a>
  <a href="https://github.com/vuex-orm/plugin-graphql/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@vuex-orm/core.svg" alt="License">
  </a>
</p>

Vuex-ORM-GraphQL is a plugin for the amazing [Vuex-ORM](https://github.com/vuex-orm/vuex-orm), which brings
Object-Relational Mapping access to the Vuex Store. Vuex-ORM-GraphQL enhances Vuex-ORM to let you sync your Vuex state
via the Vuex-ORM models with your server via a [GraphQL API](http://graphql.org/).

The plugin will automatically generate GraphQL queries and mutations based on your model definitions and by
reading your and GraphQL schema from your server. Thus it hides the specifics of Network Communication, GraphQL,
Caching, De- and Serialization of your Data and so on from the developer. Getting a record of a model from the server
is as easy as calling `Product.fetch()`. This allows you to write sophisticated Single-Page Applications fast and
efficient without worrying about GraphQL.


## Documentation

You can find the complete documentation at https://vuex-orm.github.io/plugin-graphql/.


## Questions & Discussions

Join us on our [Slack Channel](https://join.slack.com/t/vuex-orm/shared_invite/enQtNDQ0NjE3NTgyOTY2LTc1YTI2N2FjMGRlNGNmMzBkMGZlMmYxOTgzYzkzZDM2OTQ3OGExZDRkN2FmMGQ1MGJlOWM1NjU0MmRiN2VhYzQ) for any questions and discussions.

While there is the Slack Channel, do not hesitate to open an issue for any question you might have.
We're always more than happy to hear any feedback, and we don't care what kind of form they are.


## Donations

Support this project by sending a small donation to the developer.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MF6ST3SXPC4G8)


## License

Vuex ORM GraphQL is open-sourced software licensed under the [MIT license](https://github.com/phortx/plugin-graphql/blob/master/LICENSE.md).
