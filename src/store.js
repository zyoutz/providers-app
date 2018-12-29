import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('setUser', user)
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (result) {
      })
    },
    signOut () {
      firebase.auth().signOut()
    }
  }
})
