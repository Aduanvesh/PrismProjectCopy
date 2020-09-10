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
          university: payload.university,
          memberships: [
            'iMuo2bRED9JChlIAolK8']
        })
      } else if (payload.type === 'Club') {
        targetUser.set({
          type: payload.type,
          email: payload.email,
          title: payload.title,
          phone_1: payload.phoneNumber,
          university: payload.university,
          memberships: [
            'iMuo2bRED9JChlIAolK8']
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
      const targetDoc = firebase.firestore().collection('memberships').doc()

      // code that stores the card in the memberships collection.
      targetDoc.set({
        name: payload.name,
        type: payload.type,
        price: payload.price,
        details: payload.details,
        memberCount: 1
      })

      // stores the id of the membership in the users collection.
      const targetUser = firebase.firestore().collection('users').doc(userID)
      targetUser.update({
        memberships: firebase.firestore.FieldValue.arrayUnion(targetDoc.id)
      })
    } catch (err) {
      this.errorMsg = err.message
      console.log(err.message)
      return err.message
    }
  },

  async getCards () {
    const userID = firebase.auth().currentUser.uid
    const targetUser = firebase.firestore().collection('users').doc(userID)
    const targetArray = await targetUser.get()
      .then(doc => {
        console.log('check', doc.data().memberships)
        return doc.data().memberships
      })
    console.log(targetArray)

    // PLEASE FIND IF THERE IS A BETTER WAY TO DO THIS, I DID THIS QUICKLY
    const finalArray = []
    for (var i = 0; i < targetArray.length; i++) {
      const snapshot = await firebase.firestore().collection('memberships').doc(targetArray[i]).get()
        .then(doc => {
          return doc.data()
        })
      finalArray.push(snapshot)
    }
    console.log('exo:', finalArray)
    return finalArray
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
