const test = require('tape')
const Vuebx = require('../')

test('basic 1', (t) => {
  t.plan(5)
  const getState = (getter) => getter({count: 'count'}).count()

  const [getter, updater] = Vuebx({
    count: 1,
  })
  let count = getState(getter)
  t.equal(1, count)

  updater((state) => {
    return {
      count: state.count + 1
    }
  })
  count = getState(getter)
  t.equal(2, count)

  updater(function (state) {
    return {
      count: state.count + 1
    }
  })
  count = getState(getter)
  t.equal(3, count)

  updater({
    count: count + 1
  })
  count = getState(getter)
  t.equal(4, count)


  updater({
    count: 5
  })
  count = getState(getter)
  t.equal(5, count)

  t.end()
})

test('basic 2', (t) => {
  t.plan(5)
  const getState = (getter) => getter({lists: 'lists'}).lists()

  const [getter, updater] = Vuebx({
    lists: []
  })
  let state

  state = getState(getter)
  t.same(state, [])

  updater({
    lists: ['one', 'two', 'three']
  })
  state = getState(getter)
  t.same(state, ['one', 'two', 'three'])

  updater({
    lists: ['one', 'two', ['three']]
  })
  state = getState(getter)
  t.same(state, ['one', 'two', ['three']])

  updater((state) => {
    const lists = state.lists
    lists.pop()
    return {
      lists
    }
  })
  state = getState(getter)
  t.same(state, ['one', 'two'])

  updater((state) => {
    const lists = state.lists
    lists.push({
      sub: ['one', 'two']
    })
    return {
      lists
    }
  })
  state = getState(getter)
  t.same(state, ['one', 'two', {sub: ['one', 'two']}])

  t.end()
})

// 异步功能测试