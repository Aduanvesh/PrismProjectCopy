import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from 'firebase'
import SocietyDashboard from "../views/Society";
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
            const targetClub = firebase.firestore().collection('memberships').doc()

            // code that writes details to database. the data recorded is different depending on whether the signup is for user or club.
            if (payload.type === 'User') {
            targetUser.set({
                type: payload.type,
                email: payload.email,
                first_name: payload.firstName,
                last_name: payload.lastName,
                phone_1: payload.phoneNumber,
                university: payload.university,
                memberships: [],
                membership_types: [],
                payments: [],
                events: []
            })
            } else if (payload.type === 'Club') {
            targetUser.set({
                type: payload.type,
                email: payload.email,
                title: payload.title,
                phone_1: payload.phoneNumber,
                university: payload.university,
                membershiplink: targetClub.id
            })
            targetClub.set({
              name: payload.title,
              userlink: userID,
              members: [],
              membership_types: [],
              events:[],
              details: '',
              description: ''
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
          router.push('/')
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
                      type: 'User',
                      firstName: doc.data().first_name,
                      lastName: doc.data().last_name,
                      id: userID
                    })
                  if (router.currentRoute.fullPath !== '/dashboard/user/'+userID 
                  && !router.currentRoute.fullPath.includes('profile') 
                  && !router.currentRoute.fullPath.includes('event')
                  ) {
                    router.push('/dashboard/user/'+userID)
                  }
                } else {
                  commit('setUserDetails', {
                    email: doc.data().email,
                    title: doc.data().title,
                    linkid: doc.data().membershiplink,
                    type: 'Club',
                    id: userID
                  })
                  if (router.currentRoute.fullPath !== '/dashboard/club/'+userID && !router.currentRoute.fullPath.includes('profile') && !router.currentRoute.fullPath.includes('event') && !router.currentRoute.fullPath.includes('upload')) {
                    router.push('/dashboard/club/'+userID)
                  }
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

      async getClubDetails (a = {}, payload) {
        const snapshot = await firebase.firestore().collection('users').doc(payload).get()
          .then(doc => {
            console.log('check', doc.data().membershiplink)
            return doc.data().membershiplink
          })
          const club = await firebase.firestore().collection('memberships').doc(snapshot).get()
          .then(doc => {
            console.log('supercheck', doc.data())
            return doc.data()
          })
          return club
      },

      async getMemberships () {
        const userID = firebase.auth().currentUser.uid
        const targetUser = firebase.firestore().collection('users').doc(userID)
        const targetArray = await targetUser.get()
          .then(doc => {
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
    
    async getEvents () {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetArray = await targetUser.get()
        .then(doc => {
          console.log('check', doc.data().memberships)
          return doc.data().memberships
        })
      const memberArray = []
      for (var i = 0; i < targetArray.length; i++) {
        const snapshot = await firebase.firestore().collection('memberships').doc(targetArray[i]).get()
          .then(doc => {
            return doc.data().events
          })
        if (snapshot !== undefined){
          console.log('chock:', snapshot)
          for (var i = 0; i < snapshot.length; i++){
            memberArray.push(snapshot[i])
          }
        }
      }
      console.log('chock2:', memberArray)
      const finalArray = []
      for (var i = 0; i < memberArray.length; i++) {
        console.log(memberArray[i])
        const snapshot = await firebase.firestore().collection('events').doc(memberArray[i]).get()
          .then(doc => {
            return doc.data()
          })
            finalArray.push(snapshot)
      }
      console.log('final array events:', finalArray)
      for (var i = 0; i < finalArray.length - 1; i++) {
        console.log('lololol', finalArray[i])
          for (var j = i + 1; j < finalArray.length; j++) {
              if (finalArray[i].date_created < finalArray[j].date_created) { 
                  let temp = finalArray[i]; 
                  finalArray[i] = finalArray[j]; 
                  finalArray[j] = temp; 
              } 
          }
      }
      console.log('final array events2:', finalArray)
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
    },

    async getMembershipTypes (a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const FinalArray = []
      const targetMem = await club.collection('membership_types').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            FinalArray.push(doc.data())
          })
        })
      return FinalArray
    }, 

    async createMembershipType (a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const targetMem = club.collection('membership_types').doc()
      targetMem.set({
        members: [],
        price: 0,
        name: payload.title,
        origin: this.state.userDetails.linkid
      })
    }, 

    async updateMembershipType (a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const targetMem = club.collection('membership_types').doc(payload.id)
      targetMem.update({
        price: payload.price,
        name: payload.title,
        origin: this.state.userDetails.linkid
      })
    }, 

    async deleteMembershipType (a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const targetMem = club.collection('membership_types').doc(payload)
      targetMem.delete().then(function() {
        console.log("Document successfully deleted!")
      }).catch(function(error) {
        console.error("Error removing document: ", error)
      })
    },


    async getEventTickets () {
      const finalArray = []
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetArray = await targetUser.get()
        .then(doc => {
          console.log('checktickets', doc.data().events)
          return doc.data().events
        })
        for (var i = 0; i < targetArray.length; i++) {
          const snapshot = await firebase.firestore().collection('events').doc(targetArray[i]).get()
            .then(doc => {
              return doc.data()
            })
          finalArray.push(snapshot)
        }
        console.log('final arrayticketos:', finalArray)
        return finalArray
    },


    async getMembershipsTypesUser (a = {}, payload) {
      const finalArray = []
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetArray = await targetUser.get()
        .then(doc => {
          console.log('check', doc.data().membership_types)
          return doc.data().membership_types
        })
        for (var i = 0; i < targetArray.length; i++) {
          const snapshot = await firebase.firestore().collection('memberships').doc(targetArray[i]).get()
            .then(doc => {
              return doc.data()
            })
          finalArray.push(snapshot)
        }
        console.log('final arraymembos:', finalArray)
        return finalArray
    }, 

    async joinMembershipsTypesUser (a = {}, payload) {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      targetUser.update({
        membership_types: firebase.firestore.FieldValue.arrayUnion(payload)
      })
    },


    async getClubEvents () {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const snapshot = await club.get()
        .then(doc => {
          if (doc.exists){
            return doc.data().events 
          }
        })
      const finalArray = []
      for (var i = 0; i < snapshot.length; i++) {
        console.log(snapshot[i])
        const snapshotev = await firebase.firestore().collection('events').doc(snapshot[i]).get()
          .then(doc => {
            return doc.data()
          })
            finalArray.push(snapshotev)
      }
      console.log(finalArray)
      return finalArray
    },

    async createEvent (a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const targetEvent = firebase.firestore().collection('events').doc()
      console.log('INSIDE THE CREATE EVENT', payload)
      targetEvent.set({
        date_created: new Date(),
        event_description: payload.description,
        location: payload.location,
        date: payload.dates,
        startTime: payload.startTime,
        endTime: payload.endTime,
        event_name: payload.event_name,
        price: payload.price,
        catering: payload.extras.catering,
        membersOnly: payload.extras.membersOnly,
        capacity: payload.capacity,
        id: targetEvent.id,
        linked_account: this.state.userDetails.linkid
      })
      club.update({
        events: firebase.firestore.FieldValue.arrayUnion(targetEvent.id)
      })
    }, 

    async deleteEvent (a = {}, payload) {
      console.log('delete:', payload)
      const targetEvent = firebase.firestore().collection('events').doc(payload)
      const snapshot = await targetEvent.get()
          .then(doc => {
            if (doc.exists){
              return doc.data() 
            }
          })
          console.log('delete2:', snapshot.linked_account)
      const targetMembership = firebase.firestore().collection('memberships').doc(snapshot.linked_account)
      targetMembership.update({
        events: firebase.firestore.FieldValue.arrayRemove(payload)
      })
    },

    async updateEvent (a = {}, payload) {
      const targetEvent = firebase.firestore().collection('events').doc(payload.id)
      console.log('eventsdata:', payload)
      if (payload.title != undefined){
        targetEvent.update({
          event_name: payload.title,
        })
      }
      if (payload.event_description != undefined){
        targetEvent.update({
          event_description: payload.description,
        })
      }
      if (payload.location != undefined){
        targetEvent.update({
          location: payload.location,
        })
      }
      if (payload.times != undefined){
        targetEvent.update({
          date: payload.times,
        })
      }
      if (payload.price != undefined && payload.price != -1){
        targetEvent.update({
          price: payload.price,
        })
      }
      if (payload.capacity != undefined){
        targetEvent.update({
          capacity: payload.capacity
        })
      }
    },

    async joinEvent (a = {}, payload) {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetEvent = firebase.firestore().collection('events').doc(payload)
      targetUser.update({
        events: firebase.firestore.FieldValue.arrayUnion(payload)
      })
      targetEvent.update ({
        members: firebase.firestore.FieldValue.arrayUnion(userID)
      })
    },

    async getClubMembers (a = {}, payload) {
      const user = await firebase.firestore().collection('users').doc(payload)
        const clubthing = await user.get()
        .then(doc => {
          return doc.data().membershiplink
        })
        console.log('thickem', clubthing)
      const club = await firebase.firestore().collection('memberships').doc(clubthing)
      const targetArray = await club.get()
        .then(doc => {
          console.log(doc.data(), payload)
          return doc.data().members
        })
        
      const memberArray = []
      for (var i = 0; i < targetArray.length; i++) {
        const snapshot = await firebase.firestore().collection('users').doc(targetArray[i]).get()
          .then(doc => {
            return doc.data()
          })
        if (snapshot !== undefined){
            memberArray.push(snapshot)
        }
      }
      console.log('memberdata:', memberArray)
      return memberArray
    },

    

  },
  getters: {
    getMessage: state => state.message

  },
})
