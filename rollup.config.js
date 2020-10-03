import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const configs = [
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.esm.js', format: 'es', browser: true, env: 'development' },
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.esm.prod.js', format: 'es', browser: true, env: 'production' },
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.esm-bundler.js', format: 'es', env: 'development' },
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.global.js', format: 'iife', env: 'development' },
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.global.prod.js', format: 'iife', minify: true, env: 'production' },
  { input: 'src/index.ts', file: 'dist/vuex-orm-graphql.cjs.js', format: 'cjs', env: 'development' }
]

function createEntries() {
  return configs.map((c) => createEntry(c))
}

function createEntry(config) {
  const c = {
    input: config.input,
    plugins: [],
    output: {
      file: config.file,
      format: config.format,
      globals: {
        vue: 'Vue'
      }
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  if (config.format === 'iife') {
    c.output.name = 'VuexORMGraphQLPlugin'
  }

  c.plugins.push(resolve())
  c.plugins.push( commonjs({
    exclude: ['node_modules/symbol-observable/es/*.js'],
  }))

  c.plugins.push(ts({
    check: config.format === 'es' && config.browser && config.env === 'development',
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: config.format === 'es' && config.browser && config.env === 'development',
        target: config.format === 'iife' || config.format === 'cjs' ? 'es5' : 'es2018'
      },
      exclude: ['test']
    }
  }))

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }))
  }

  return c
}

export default createEntries()
