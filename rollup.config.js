import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './lib/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'test',
  },
  watch: {
    include: 'lib/**',
  },
  plugins: [resolve(), commonjs(), uglify()],
}
