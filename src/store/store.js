// import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from 'firebase'

const state = {
  userDetails: {}
}
const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  },
  getUniversityNames (state, payload) {
    state.universities = payload
  }
}
const actions = {
  async signupUser (a = {}, payload) {
    console.log('payload: ', payload)
    try {
      await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
    } catch (err) {
      this.errorMsg = err.message
      console.log(err.message)
      return err.message
    }
  },
  async signinUser (a = {}, payload) {
    console.log('payload: ', payload)
    try {
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      this.$router.push('/')
    } catch (err) {
      this.errorMsg = err.message
      console.log(err.message)
      return err.message
    }
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
      return err.message
    }
  },

  async getUniversities (a = {}) {
    const col = firebase.firestore().collection('site_data')
    const query = col.doc('universities')
    const data = query.get()
      .then(doc => {
        console.log('check', doc.data().university_name)
        return doc.data().university_name
      })
    return data
  },

  async addCard (a = {}, payload) {
    try {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('memberships').doc(userID)
      const newCard = targetUser.collection('cards').doc()

      console.log(newCard.id)
      // code that writes details to database. the data recorded is different depending on whether the signup is for user or club.
      newCard.set({
        name: payload.name,
        type: payload.type,
        price: payload.price,
        details: payload.details
      })
    } catch (err) {
      this.errorMsg = err.message
      console.log(err.message)
      return err.message
    }
  },

  async getCards () {
    const userID = firebase.auth().currentUser.uid
    const snapshot = await firebase.firestore().collection('memberships').doc(userID).collection('cards').get()

    return snapshot.docs.map(doc => doc.data())
    /*
    const col = firebase.firestore().collection('memberships').doc(userID)
    const query = col.collection('cards')
    const data = query.get()
      .then(doc => {
        console.log('check', doc)
        return doc
      })
    return data
    */
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
