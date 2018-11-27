// @ts-ignore
import resolve from 'rollup-plugin-node-resolve';

// @ts-ignore
import commonjs from 'rollup-plugin-commonjs';

// @ts-ignore
import sourceMaps from 'rollup-plugin-sourcemaps';

// @ts-ignore
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';

// @ts-ignore
import json from 'rollup-plugin-json';

// @ts-ignore
import uglify from 'rollup-plugin-uglify';

// @ts-ignore
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

const libraryName = 'vuex-orm-graphql';

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),

    uglify(),

    // Resolve source maps to the original source
    sourceMaps(),
  ]
};
