import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    auth: false,
    url: 'http://back-project.test/api/'
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