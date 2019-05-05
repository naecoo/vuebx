# Vuebx ![size](https://img.shields.io/github/languages/code-size/naecoo/vuebx.svg?style=flat-square)
a lightweight state management library for vuejs


## Example
```javascript
// store/index.js
import vuebx from 'vuebx'

const state = {
  count: 1
}
const [getter, setter] = vuebx(state)
export default {
  getter,
  setter
}

// Counter.vue
<template>
  <p>{{ count }}<p>
  <p>
    <button v-on:click="increment">-</button>
    <button v-on:click="decrement">+</button>
  </p>
</template>
<script>
  import { getter, setter } from './store'
  export default {
    name: 'Counter',
    computed: {
      ...getter(['count'])
    },
    methods: {
      increment () {
        setter((state) => {
          return {
            count: state.count + 1
          }
        })
      },
      decrement () {
        setter((state) => {
          return {
            count: state.count - 1
          }
        })
      }
    }
  }
</script>
```

## Install
```bash
npm install vuebx --save
```

## Usage 
Vuebx is a simple library

## License
[MIT](https://github.com/naecoo/vuebx/blob/master/LICENSE)