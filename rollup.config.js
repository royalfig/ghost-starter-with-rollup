import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/js/app/index.js',
    output: {
      file: 'assets/built/app.js',
      format: 'iife',
      sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    },
    plugins: [
      resolve(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
      postcss({
        extract: true,
        plugins: [
          atImport,
          postcssPresetEnv({ features: { 'nesting-rules': true } }),
          process.env.NODE_ENV === 'production' &&
            cssnano({ preset: 'default' }),
        ],
      }),
      process.env.NODE_ENV === 'production' && terser(),
    ],
  },
];
