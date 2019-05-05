const test = require('tape')
const Vue = require('vue')
const Vuebx = require('../dist/vuebx.umd.js')

test('running in vue instance', (t) => {
  const [getter, updater] = Vuebx({
    count: 1
  })
  const vm = new Vue({
    computed: {
      ...getter(['count'])
    },
    methods: {
      increment () {
        updater({
          count: this.count + 1
        })
      },
      decrement () {
        updater({
          count: this.count - 1
        })
      }
    }
  })

  t.equal(1, vm.count)

  vm.increment()
  t.equal(2, vm.count)

  vm.decrement()
  t.equal(1, vm.count)

  updater({
    count: 2
  })
  t.equal(2, vm.count)

  updater({
    count: 1
  })
  t.equal(1, vm.count)

  t.end()
})