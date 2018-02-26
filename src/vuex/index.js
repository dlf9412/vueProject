import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import global from './global/'
import datatree from './datatree/'

export default new Vuex.Store({
  modules: {
    global,
    datatree
  },
  strict: process.env.NODE_ENV !== 'production'
})
