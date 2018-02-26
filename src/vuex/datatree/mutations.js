import * as types from './mutations_types'

// import { store } from 'utils/'

export default {
  [types.ENTITYKEY_CHANGE] (state, payload) {
    state.entitykey = payload.data.entitykey;
    if (payload.data.entitytype === 12) {
      state.entityData = payload.data;
    }
  },

  [types.CHASTATE_CHANGE] (state, payload) {
    state.entityState = payload.state
  },

  [types.DATATREE_CHANGE] (state, payload) {
    state.treeMenu = payload.treeMenu || [];
    state.treeArr = payload.treeArr || [];
  },

  [types.CURRENTID_CHANGE] (state, payload) {
    state.currentId = payload.curren;
  },

  [types.SHOW_DATA_TREE_LOADING] (state) {
    state.dataTreeLoading = true
  },

  [types.HIDE_DATA_TREE_LOADING] (state) {
    state.dataTreeLoading = false
  },

  [types.START_TIME] (state, payload) {
    state.startTime = payload.startTime;
  },

  [types.CHILDENTITYS_CHANGE] (state, payload) {
    state.childEntitys = payload.childEntitys;
  },
}
