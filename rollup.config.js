import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

function createConfig({ format, file }) {
  const config = {
    input: 'src/index.js',
    output: {
      file,
      format,
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
      })
    ]
  }
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    }))
  }

  return config
}

const formats = [
  {
    format: 'umd',
    file: 'dist/index.js'
  },
  {
    format: 'es',
    file: 'dist/index.esm.js'
  }
]

export default formats.map(format => createConfig(format))