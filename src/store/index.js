import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Router from '../router/index.js'
// import api from '../api/api.js'
import { Message } from 'element-ui'
Vue.use(Vuex)
const state = {
  userId: '',
  username: '',
  isLogin: false
}
const mutations = {
  userInfo (state, params) {
    state.userId = params.userId
    state.username = params.userName
    state.isLogin = params.isLogin
  },
  updateUserName (state, params) {
    state.username = params
  },
  removeInfo (state, params) {
    state.isLogin = params.isLogin
  }
}
const actions = {
  /* checkLogin ({ commit }, params) {
    api('/checkLogin').then(res => {
      if (res.code === '200') {
        commit('userInfo', {userName: res.data.userName, isLogin: true})
      } else {
        Message.error(res.message)
      }
    }).catch(err => {
      Message.error(err.message)
    })
  },
  logout ({commit}, params) {
    api('/logout').then(res => {
      if (res.code === '200') {
        Message.success(res.message)
        localStorage.removeItem('userInfo')
        Router.push({name: 'Movies'})
        commit('removeInfo', {isLogin: false})
      } else {
        Message.error(res.message)
      }
    }).catch(err => {
      Message.error(err.message)
    })
  } */

}
const getters = {

}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({
    key: 'vueNodeExpressMongooseLearnVuex'
  })]
})
