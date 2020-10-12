import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from 'firebase'
// import VueRouter from 'vue-router'

// import VueRouter from 'vue-router'
// import router from '../router/index''

Vue.use(Vuex)
// Vue.use(VueRouter)
export default new Vuex.Store({
  state: {
    message: 'hellotest',
    userDetails: {}
  },
  mutations: {
    setMessage(state, payload) {
        state.message = payload
    },
    setUserDetails (state, payload) {
        state.userDetails = payload
        console.log('ubersuccess:', state.userDetails.firstName)
    },
    getUniversityNames (state, payload) {
        state.universities = payload
    }
  },
  actions: {
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
            router.push('/dashboard')
        } catch (err) {
            this.errorMsg = err.message
            console.log(err.message)
            return err.message
        }
        },

    async signinUser (a = {}, payload) {
        console.log('payload: ', payload.email)
        try {
          await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          router.push('/dashboard')
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
                if (doc.data().type === 'User') {
                    commit('setUserDetails', {
                    email: doc.data().email,
                    firstName: doc.data().first_name,
                    lastName: doc.data().last_name,
                    id: userID
                    })
                } else {
                    commit('setUserDetails', {
                        email: doc.data().email,
                        title: doc.data().title,
                        id: userID
                        })
                }
                // TODO: add one for societies
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

    async getUniversities (a = {}) {
        const col = firebase.firestore().collection('site_data')
        const query = col.doc('universities')
        const data = query.get()
          .then(doc => {
            console.log('university check:', doc.data().university_name)
            return doc.data().university_name
          })
        return data
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
        const finalArray = []
        for (var i = 0; i < targetArray.length; i++) {
          const snapshot = await firebase.firestore().collection('memberships').doc(targetArray[i]).get()
            .then(doc => {
              return doc.data()
            })
          finalArray.push(snapshot)
        }
        console.log('final array:', finalArray)
        return finalArray
      },

    async getPayments () {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetArray = await targetUser.get()
          .then(doc => {
            console.log('check', doc.data().payments)
            return doc.data().payments
          })
        const finalArray = []
        for (var i = 0; i < targetArray.length; i++) {
          const snapshot = await firebase.firestore().collection('payments').doc(targetArray[i]).get()
            .then(doc => {
              return doc.data()
            })
          finalArray.push(snapshot)
        }
      console.log('final array:', finalArray)
      return finalArray
    },

    async makePayment (a = {}, payload) {
      console.log('doco:',':', payload)
      console.log(payload)
      const snapshot = await firebase.firestore().collection('payments').doc(payload).update({
        status: 'paid'
      })
    },

    async checkUser (a = {}, payload) {
        const userID = firebase.auth().currentUser.uid
        console.log(userID)
        if (payload === userID) {
          return 'in'
        } else {
          return 'out'
        }
    },

    async joinClubCode (a = {}, payload) {
      console.log('attempt:', payload)
      try {
        const club = await firebase.firestore().collection('memberships').doc(payload)
        
        const snapshot = await club.get()
          .then(doc => {
            if (doc.exists){
              return doc.data() 
            } else {
              return undefined
            }
          })
        if (snapshot !== undefined){
          const userID = firebase.auth().currentUser.uid
          const targetUser = firebase.firestore().collection('users').doc(userID)
          club.update({
            members: firebase.firestore.FieldValue.arrayUnion(userID)
          })
          targetUser.update({
            memberships: firebase.firestore.FieldValue.arrayUnion(club.id)
          })
          return 'success'
        } else {
          return 'missing'
        }
      } catch (err) {
        this.errorMsg = err.message
          console.log('error:', err.message)
          return err.message
      }
     
    }

  },
  getters: {
    getMessage: state => state.message

  },
})
