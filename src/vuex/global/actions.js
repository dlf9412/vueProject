import * as types from './mutations_types'

export default {
  SHOW_LOADING: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING)
      resolve()
    })
  },

  HIDE_LOADING: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LOADING)
      resolve()
    })
  }
}
