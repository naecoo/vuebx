import Vue from 'vue'
import { cloneDeep } from 'lodash'

function _updateCreator(state) {
  return (newState) => {
    if (typeof newState === 'function') {
      const oldState = cloneDeep(state)
      newState = newState.call(null, oldState)
    }
    Object.keys(newState).forEach(key => {
      if (!(key in state)) {
        throw new Error(`unknown state: ${key}`)
      }
      state[key] = newState[key]
    })
    return new Promise(resolve => {
      Vue.nextTick(() => {
        resolve(cloneDeep(state))
      })
    })
  }
}

function _mapGetters (state) {
  return (getters) => {
    const res = {}
    normalize(getters).forEach(({key, val}) => {
      res[key] = function () {
        if (! (val in state)) {
          throw new Error(`unknown state: ${val}`)
        }
        return state[val]
      }
    })  
    return res
  }
}

function normalize(map) {
  return Array.isArray(map) ?
    map.map(key => ({
      key,
      val: key
    })) :
    Object.keys(map).map(key => ({
      key,
      val: map[key]
    }))
}

function Vuebx (defaultValue = {}) {
  const state = Vue.observable(defaultValue)

  const getState = _mapGetters(state)
  const setState = _updateCreator(state)

  return [getState, setState]
}

export default Vuebx