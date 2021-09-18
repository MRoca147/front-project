import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    auth: false
  },
  mutations: {
    setAuth(state, status){
      state.auth = status
    },
  },
  getters: {
    getAuth: state => {
      return state.auth
    }
  }
})