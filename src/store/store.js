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
        const userID = firebase.auth().currentUser.uid
        const targetUser = firebase.firestore().collection('users').doc(userID)

        // code that writes details to database. the data recorded is different depending on whether the signup is for user or club.
        if (payload.type === 'User') {
          targetUser.set({
            type: payload.type,
            email: payload.email,
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone_1: payload.phoneNumber,
            university: payload.university
          })
        } else if (payload.type === 'Club') {
          targetUser.set({
            type: payload.type,
            email: payload.email,
            title: payload.title,
            phone_1: payload.phoneNumber,
            university: payload.university
          })
        }
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  async signinUser (a = {}, payload) {
    console.log('payload: ', payload)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  async signoutUser (a = {}) {
    console.log('signedout')
    firebase.auth().signOut()
      .then(response => {
      })
      .catch(error => {
        console.log(error.message)
      })
  },

  // code that detects when the user authenticated has changed
  handleAuthStateChanged ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        const userID = firebase.auth().currentUser.uid
        const coll = firebase.firestore().collection('users')
        coll.doc(userID).get()
          .then(function (doc) {
            if (doc.exists) {
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
  },

  async resetPassword (a = {}, payload) {
    this.errorMsg = ''
    console.log(payload.email)
    try {
      await firebase.auth().sendPasswordResetEmail(payload.email)
      this.showSuccess = true
    } catch (err) {
      this.errorMsg = err.message
      console.log(err.message)
      if (err.message === 'The email address is badly formatted.') {
        return 'bad_format'
      } else {
        return 'test'
      }
    }
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
