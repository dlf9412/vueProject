import * as types from './mutations_types'

export default {
  ENTITYKEY_CHANGE: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.ENTITYKEY_CHANGE, payload)
      resolve()
    })
  },

  CHASTATE_CHANGE: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.CHASTATE_CHANGE, payload)
      resolve()
    })
  },

  DATATREE_CHANGE: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.DATATREE_CHANGE, payload)
      resolve()
    })
  },

  CURRENTID_CHANGE: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.CURRENTID_CHANGE, payload)
      resolve()
    })
  },

  SHOW_DATA_TREE_LOADING: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_DATA_TREE_LOADING)
      resolve()
    })
  },

  HIDE_DATA_TREE_LOADING: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_DATA_TREE_LOADING)
      resolve()
    })
  },

  START_TIME: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.START_TIME, payload)
      resolve()
    })
  },

  CHILDENTITYS_CHANGE: ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.CHILDENTITYS_CHANGE, payload)
      resolve()
    })
  },
}
