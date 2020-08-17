// import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from 'firebase'

const state = {
  userDetails: {}
}
const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  }
}
const actions = {
  async signupUser (a = {}, payload) {
    console.log('payload: ', payload)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
        const userID = firebase.auth().currentUser.uid
        firebase.firestore().collection('users').doc(userID).set({
          email: payload.email
        })
      })
      .catch(error => {
        console.log(error.message)
      })

    this.$router.push('/')
  },
  async signinUser (a = {}, payload) {
    console.log('payload: ', payload)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        // console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })

    this.$router.push('/')
  },
  async signoutUser (a = {}) {
    console.log('signedout')
    firebase.auth().signOut()
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })

    this.$router.push('/')
  },
  handleAuthStateChanged ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        const userID = firebase.auth().currentUser.uid
        const coll = firebase.firestore().collection('users')
        coll.doc(userID).get()
          .then(function (doc) {
            if (doc.exists) {
              console.log('Document Data:', doc.data())
              commit('setUserDetails', {
                email: doc.data().email
              })
            } else {
              console.log('doc not found')
            }
          })
      } else {
        console.log('logged out')
        commit('setUserDetails', {})
      }
    })
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
