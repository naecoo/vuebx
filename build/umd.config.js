import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/vuebx.umd.js',
    format: 'umd',
    name: 'vuebx',
    globals: {
      'vue': 'Vue',
      'lodash': 'lodash'
    }
  },
  external: ['vue', 'lodash'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
}

export default config