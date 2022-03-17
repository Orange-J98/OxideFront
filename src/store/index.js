import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerForHist: false,
    global: {
      me: null,
    },
    mapScope:'china',
  },
  mutations: {
    changeMapScope(state,data) {
      state.mapScope = data;
    },
    globalLogin(state,data) {
      state.global.me = data;
    },
    globalLogout(state) {
      state.global.me = null;
    },
    changeDarawer(state) {
      state.drawerForHist = true;
    },
    closeDarawer(state) {
      state.drawerForHist = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
