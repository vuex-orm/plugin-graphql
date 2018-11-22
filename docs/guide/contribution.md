# Contribution

[[toc]]

To test this plugin in your existing project, you can use `yarn link` functionality. Run `yarn link`
in your local plugin-graphql directory and run `yarn link @vuex-orm/plugin-graphql` in your project dir.

Remember to run `yarn build` in your plugin-graphql directory and then again `yarn link` in your project after you have
made changes to the plugin code. You probably have also to restart your webpack server.


```bash
$ yarn build
```

Compile files and generate bundles in dist directory.

```bash
$ yarn lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn test
```

Run the test using Jest and prints a coverage report.


```bash
yarn build:docs
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
