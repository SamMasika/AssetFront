import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import section from './items/section'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loader:false
  },
  getters: {
  },
  mutations: {
    LOADER(state,payload){
      state.loader=payload
    }
  },
  actions: {
  },
  modules: {
    auth,
    section
  }
})
