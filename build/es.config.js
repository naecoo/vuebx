import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/vuebx.es.js',
    format: 'es',
    name: 'vuebx',
    globals: {
      'vue': 'Vue',
      'lodash': 'lodash'
    }
  },
  external: ['vue', 'lodash'],
  plugins: [
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