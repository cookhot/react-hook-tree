import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear';
import replace from 'rollup-plugin-replace';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const env = process.env.NODE_ENV

const configs = [
  { input: 'src/main.ts', file: `lib/index.es.js`, format: 'es', env: 'development' },
  { input: 'src/main.ts', file: `lib/ks-tree-chart.umd.js`, format: 'umd', env: 'production', minify: true },
  // { input: 'src/index.ts', file: 'lib/index.cjs.js', format: 'cjs', env: 'development' },
  // { input: 'src/index.ts', file: `lib/index.prod.js`, format: 'cjs', browser: true, env: 'production' },
]

const css = {
  input: 'src/style.css',
  output: {
    file: `lib/${pkg.version}/style.css`,
  },
  plugins: [
    clear({
      targets: ['lib/style.css']
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: false,
      use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true }
      }, 
      extract: true
    })
  ]
}

function createEntry(config) {
  const c = {
    input: config.input,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
    ],
    // exports: 'named',
    output: {
      file: config.file,
      format: config.format,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
  
  if (config.format === 'umd') {
    c.output.name = 'KSTreeChart'
  }

  c.plugins.push(resolve({ browser: true }))
  c.plugins.push(commonjs())


  c.plugins.push(ts({
    check: config.format === 'es' && config.browser && config.env === 'development',
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: config.format === 'es' && config.env === 'development',
        target: config.format === 'cjs' ? 'es5' : 'esnext'
      }
    }
  }))

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }))
  }

  return c
}

function createEntries() {
  return configs.map((c) => createEntry(c))
}

const entrys = createEntries();

export default [
  css,
  ...entrys,
]