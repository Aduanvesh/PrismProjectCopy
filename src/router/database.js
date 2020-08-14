import Vue from 'vue'

//import Vuex from 'vuex'
import VueRouter from 'vue-router'

import * as db from '../firebase'
import router from '../router/index'

//Vue.use(Vuex)
Vue.use(VueRouter)

export default new VueRouter({
  state: {
    userProfile:{}
  },
  mutations: {
    setUserProfile(state, val){
      state.userProfile=val
    }
  },
  actions: {
    async login ({dispatch}, form){
      //sign user in
      const {user} = await db.auth.signInWithEmailAndPassword(form.email, form.password)

      //fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile ({commit}, user){
      //fetch user profile
      const userProfile = await db.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())

      // change route to user
      router.push('/user')
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await db.auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // create user profile object in userCollections
      await db.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })
    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    }
  },
  modules: {
  }
})
