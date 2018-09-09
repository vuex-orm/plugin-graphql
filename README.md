# Vuex ORM Plugin: GraphQl

[![Travis CI](https://travis-ci.org/vuex-orm/plugin-graphql.svg?branch=master)](https://travis-ci.org/vuex-orm/plugin-graphql)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/@vuex-orm/plugin-graphql.svg)](https://github.com/vuex-orm/plugin-graphql/blob/master/LICENSE.md)

**Documentation:** https://vuex-orm.github.io/plugin-graphql/


## Contribution

To test this plugin in your existing project, you can use `yarn link` functionality. Run `yarn link`
in your local plugin-graphql directory and run `yarn link @vuex-orm/plugin-graphql` in your project dir.

Remember to run `yarn build` in your plugin-graphql directory and then again `yarn link` in your project after you have
made changes to the plugin code. You probably have also to restart your webpack server.


```bash
$ yarn run build
```

Compile files and generate bundles in dist directory.

```bash
$ yarn run lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn run test
```

Run the test using Mocha Webpack.

```bash
$ yarn run coverage
```

Generate test coverage in coverage directory.


```bash
yarn docs:build
```

Builds the documentation.


```bash
yarn docs:dev
```

Spawns a server for the documentation.


```bash
yarn docs:depoy
```

Deploys the documentation.


## License

Vuex ORM GraphQL is open-sourced software licensed under the [MIT license](https://github.com/phortx/plugin-graphql/blob/master/LICENSE.md).
