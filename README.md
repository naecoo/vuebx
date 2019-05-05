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
vuebx receive default state and return two functions
```javascript
const defaultState = {
  count1: 1,
  count2: 2
}
const [getter, setter] = vuebx(defaultState)
```
- getter 

Getter is the same as [mapGetters](https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper) that provided by [vuex](https://vuex.vuejs.org), it can simply maps store getters to local computed properties.
```javascript
export default {
  // ...
  computed: {
    ...getter(['count1', 'count2'])
  }
}
```
if you want to map a getter to a different name:
```javascript
export default {
  // ...
  computed: {
    ...getter({
      count_1: 'count1',
      count_2: 'count2'
    })
  }
}
```
- setter

If you've used React before, You will be familiar with the function because it very similar to [setState](https://reactjs.org/docs/react-component.html#setstate) api.
```javascript
// setter receive a new state object
setter(newState)

// or a function that will return a state object
setter((state) => {
  return {
    ...state,
    count: state.count + 1
  }
})

// setter will return a promise
setter(newState).then(() => {
  // as same as Vue.nextTick(() => {})
  // keep your state up to date
}) 
```
## License
[MIT](https://github.com/naecoo/vuebx/blob/master/LICENSE)