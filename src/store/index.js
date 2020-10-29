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
    setUserDetails(state, payload) {
      state.userDetails = payload
      console.log('ubersuccess:', state.userDetails.firstName)
    },
    setColour(state, payload) {
      state.userDetails.colour = payload
    },
    setImage() {
      state.userDetails.profile_img = payload
    },
    getUniversityNames(state, payload) {
      state.universities = payload
    }
  },
  actions: {
    async signupUser(a = {}, payload) {
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
            events: [],
            attending: [],
            address: '',
            subtitle: '',
            username: '',
            zipCode: '',
            country: '',
            city: '',
            colour: 'success'
          })
        } else if (payload.type === 'Club') {
          targetUser.set({
            type: payload.type,
            email: payload.email,
            title: payload.title,
            phone_1: payload.phoneNumber,
            university: payload.university,
            membershiplink: targetClub.id,
            address: '',
            subtitle: '',
            zipCode: '',
            country: '',
            city: '',
            username: '',
            first_name: '',
            last_name: '',
            colour: 'success'
          })
          targetClub.set({
            name: payload.title,
            userlink: userID,
            members: [],
            membership_types: [],
            events: [],
            payments: [],
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

    async signinUser(a = {}, payload) {
      console.log('payload: ', payload.email)
      try {
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      } catch (err) {
        this.errorMsg = err.message
        console.log(err.message)
        return err.message
      }
    },

    async signoutUser(a = {}) {
      console.log('signedout')
      firebase.auth().signOut()
        .then(response => {
        })
        .catch(error => {
          console.log(error.message)
        })
      router.push('/')
    },

    handleAuthStateChanged({ commit }) {
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
                    id: userID,
                    colour: doc.data().colour,
                    profile_img: doc.data().profile_img
                  })
                  if (router.currentRoute.fullPath !== '/dashboard/user/' + userID
                    && !router.currentRoute.fullPath.includes('profile')
                    && !router.currentRoute.fullPath.includes('event')
                    && !router.currentRoute.fullPath.includes('upload')
                    && !router.currentRoute.fullPath.includes('settings')
                    && !router.currentRoute.fullPath.includes('join')
                    && !router.currentRoute.fullPath.includes('kiosk')
                  ) {
                    router.push('/dashboard/user/' + userID)
                  }
                } else {
                  commit('setUserDetails', {
                    email: doc.data().email,
                    title: doc.data().title,
                    linkid: doc.data().membershiplink,
                    type: 'Club',
                    id: userID,
                    profile_img: doc.data().profile_img
                  })
                  if (router.currentRoute.fullPath !== '/dashboard/club/' + userID
                    && !router.currentRoute.fullPath.includes('profile')
                    && !router.currentRoute.fullPath.includes('event')
                    && !router.currentRoute.fullPath.includes('upload')
                    && !router.currentRoute.fullPath.includes('settings')
                    && !router.currentRoute.fullPath.includes('join')
                    && !router.currentRoute.fullPath.includes('kiosk')
                  ) {
                    router.push('/dashboard/club/' + userID)
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

    async getUniversities(a = {}) {
      const col = firebase.firestore().collection('site_data')
      const query = col.doc('universities')
      const data = query.get()
        .then(doc => {
          console.log('university check:', doc.data().university_name)
          return doc.data().university_name
        })
      return data
    },

    async resetPassword(a = {}, payload) {
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

    async addMemberEvent(a = {}, payload) {
      const club = firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const clubmembers = await club.get()
        .then(doc => {
          return doc.data().members
        })
      console.log('plz2', clubmembers)
      var userIDf = ''
      for (var i = 0; i < clubmembers.length; i++) {
        const user = await firebase.firestore().collection('users').doc(clubmembers[i]).get()
          .then(doc => {
            return doc.data()
          })
        console.log(user)
        if (user.email === payload.memberEmail) {
          userIDf = clubmembers[i]
        }
      }
      console.log('plz', userIDf, payload.cash)
      if (userIDf !== '') {
        const targetUser = await firebase.firestore().collection('users').doc(userIDf)
        const check = await targetUser.get()
          .then(doc => {
            return doc.data()
          })
        if (check.events.includes(payload.eventid)) {
          console.log('already have this purchased')
          return 'already have this purchased'
        }
        const event = await firebase.firestore().collection('events').doc(payload.eventid)
        const eventdata = await event.get()
          .then(doc => {
            return doc.data()
          })
        console.log('purchasing2:', eventdata)
        const membership = await firebase.firestore().collection('memberships').doc(eventdata.linked_account)
        const membershipdata = await membership.get()
          .then(doc => {
            return doc.data()
          })
        event.update({
          members: firebase.firestore.FieldValue.arrayUnion(userIDf)
        })
        if (payload.cash) {
          const paras = {}
          paras.date1 = new Date()
          paras.date2 = new Date()
          paras.payee = membershipdata.name
          paras.payer = check.first_name + ' ' + check.last_name
          paras.info = 'Ticket Purchase (Cash): ' + eventdata.event_name
          paras.payeeid = eventdata.linked_account
          paras.payerid = userIDf
          paras.status = 'paid'
          paras.amount = eventdata.price

          console.log('checkor:', paras)
          const targetpayment = await firebase.firestore().collection('payments').doc()
          targetpayment.set({
            date1: paras.date1,
            date2: paras.date2,
            id: targetpayment.id,
            payee: paras.payee,
            info: paras.info,
            payer: paras.payer,
            payeeid: paras.payeeid,
            payerid: paras.payerid,
            status: paras.status,
            amount: paras.amount
          })
          targetUser.update({
            events: firebase.firestore.FieldValue.arrayUnion(payload.eventid),
            payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
          })
          const clubs = await firebase.firestore().collection('memberships').doc(eventdata.linked_account)
          clubs.update({
            payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
          })

        } else {
          targetUser.update({
            events: firebase.firestore.FieldValue.arrayUnion(payload.eventid)
          })
        }
      }


    },

    async addCard(a = {}, payload) {
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

    async getColor() {
      const colour = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid).get()
        .then(doc => {
          console.log('check', doc.data().membershiplink)
          return doc.data().colour
        })
      console.log('dashboardcolor:', colour)
      return colour
    },

    async getClubDetails(a = {}, payload) {
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

    async removeFromEvent(a = {}, payload) {
      console.log(payload)
      const snapshot = await firebase.firestore().collection('events').doc(payload.eventid)
      snapshot.update({
        members: firebase.firestore.FieldValue.arrayRemove(payload.memberid)
      })
      const user = await firebase.firestore().collection('users').doc(payload.memberid)
      user.update({
        attending: firebase.firestore.FieldValue.arrayRemove(payload.eventid),
        events: firebase.firestore.FieldValue.arrayRemove(payload.eventid)
      })
    },

    async updateAttendance(a = {}, payload) {
      console.log(payload)
      const snapshot = await firebase.firestore().collection('users').doc(payload.id)
      if (payload.attending) {
        snapshot.update({
          attending: firebase.firestore.FieldValue.arrayUnion(payload.eventid)
        })
      } else {
        snapshot.update({
          attending: firebase.firestore.FieldValue.arrayRemove(payload.eventid)
        })
      }
    },

    async getClubMembersEvents(a = {}, payload) {
      const snapshot = await firebase.firestore().collection('events').doc(payload).get()
        .then(doc => {
          console.log('check', doc.data())
          return doc.data()
        })
      const finalArray = []
      for (var i = 0; i < snapshot.members.length; i++) {
        const userdata = await firebase.firestore().collection('users').doc(snapshot.members[i]).get()
          .then(doc => {
            return doc.data()
          })
        userdata.id = snapshot.members[i]
        userdata.eventid = payload
        finalArray.push(userdata)
      }
      console.log(finalArray)
      return finalArray
    },

    async getEventDetails(a = {}, payload) {
      const snapshot = await firebase.firestore().collection('events').doc(payload).get()
        .then(doc => {
          console.log('supercheckevents', doc.data())
          return doc.data()
        })
      return snapshot
    },

    async getClubEventDetails(a = {}, payload) {
      const snapshot = await firebase.firestore().collection('memberships').doc(payload).get()
        .then(doc => {
          return doc.data().userlink
        })
      const clubdata = await firebase.firestore().collection('users').doc(snapshot).get()
        .then(doc => {
          return doc.data()
        })
      return clubdata
    },

    async getMemberships() {
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

    async getEvents() {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetArray = await targetUser.get()
        .then(doc => {
          return doc.data().memberships
        })
      const memberArray = []
      console.log('checkeve', targetArray)
      for (var i = 0; i < targetArray.length; i++) {
        const snapshot = await firebase.firestore().collection('memberships').doc(targetArray[i]).get()
          .then(doc => {
            return doc.data().events
          })
        if (snapshot !== undefined) {
          console.log('chock:', snapshot)
          for (var i = 0; i < snapshot.length; i++) {
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

    async getPayments() {
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

    async getClubPayments() {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
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
      console.log('final array club pay:', finalArray)
      return finalArray
    },

    async makePayment(a = {}, payload) {
      console.log('doco:', ':', payload)
      console.log(payload)
      const snapshot = await firebase.firestore().collection('payments').doc(payload).update({
        status: 'paid'
      })
    },

    async checkUser(a = {}, payload) {
      const userID = firebase.auth().currentUser.uid
      console.log(userID)
      if (payload === userID) {
        return 'in'
      } else {
        return 'out'
      }
    },

    async gotolink(a = {}, payload) {
      router.push(payload)
      router.go()
    },

    async markAttendanceEvent(a = {}, payload){
      const userID = firebase.auth().currentUser.uid
      try {
        const user = firebase.firestore().collection('users').doc(userID)
        const userdata = await user.get()
        .then(doc => {
          return doc.data()
        })
        if (userdata.attending.includes(payload)){
          return 'success'
        }else {
          user.update({
            attending: firebase.firestore.FieldValue.arrayUnion(payload)
          })
          return 'success'
        }
      } catch (err) {
        this.errorMsg = err.message
        console.log('error:', err.message)
        return err.message
      }
    },

    async joinClubCode(a = {}, payload) {
      console.log('attempt:', payload)
      try {
        const clubid = await firebase.firestore().collection('users').doc(payload).get()
          .then(doc => {
            return doc.data().membershiplink
          })
        const club = await firebase.firestore().collection('memberships').doc(clubid)
        const snapshot = await club.get()
          .then(doc => {
            if (doc.exists) {
              return doc.data()
            } else {
              return undefined
            }
          })
        if (snapshot !== undefined) {
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

    async purchaseMembershipTypes(a = {}, payload) {
      console.log('purchasing:', payload)
      const userID = firebase.auth().currentUser.uid
      if (this.state.userDetails.type === 'Club') {
        console.log('failed because clubs cannot purchase this')
        return 'failed because clubs cannot purchase this'
      } else {
        const targetUser = await firebase.firestore().collection('users').doc(userID)
        const check = await targetUser.get()
          .then(doc => {
            return doc.data().membership_types
          })
        const membership = await firebase.firestore().collection('membership_types').doc(payload)
        const membershipclubid = await membership.get()
          .then(doc => {
            return doc.data()
          })
        if (check.includes(membershipclubid.membershiplink)) {
          console.log('already have this purchased')
          return 'already have this purchased'
        }
        const club = await firebase.firestore().collection('memberships').doc(membershipclubid.membershiplink).get()
          .then(doc => {
            return doc.data()
          })
        membership.update({
          members: firebase.firestore.FieldValue.arrayUnion(userID)
        })

        const paras = {}
        paras.date1 = new Date()
        paras.date2 = new Date()
        paras.payee = club.name
        paras.payer = this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName
        paras.info = 'Membership: ' + await membershipclubid.name
        console.log(paras.info)
        paras.payeeid = membershipclubid
        paras.payerid = userID
        paras.status = 'paid'
        paras.amount = membershipclubid.price
        //this.createPayment(paras)

        console.log('checkor:', paras)
        const targetpayment = await firebase.firestore().collection('payments').doc()
        targetpayment.set({
          date1: paras.date1,
          date2: paras.date2,
          id: targetpayment.id,
          payee: paras.payee,
          info: paras.info,
          payer: paras.payer,
          payeeid: paras.payeeid,
          payerid: paras.payerid,
          status: paras.status,
          amount: paras.amount
        })
        targetUser.update({
          membership_types: firebase.firestore.FieldValue.arrayUnion(membershipclubid.membershiplink),
          payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
        })
        const clubs = await firebase.firestore().collection('memberships').doc(membershipclubid.membershiplink)
        clubs.update({
          payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
        })

      }
    },

    async purchaseEventTicket(a = {}, payload) {
      console.log('purchasing:', payload)
      const userID = firebase.auth().currentUser.uid
      if (this.state.userDetails.type === 'Club') {
        return 'failed because clubs cannot purchase this'
      } else {
        const targetUser = await firebase.firestore().collection('users').doc(userID)
        const check = await targetUser.get()
          .then(doc => {
            return doc.data().events
          })
        if (check.includes(payload)) {
          console.log('already have this purchased')
          return 'already have this purchased'
        }
        const event = await firebase.firestore().collection('events').doc(payload)
        const eventdata = await event.get()
          .then(doc => {
            return doc.data()
          })
        console.log('purchasing2:', eventdata)
        const membership = await firebase.firestore().collection('memberships').doc(eventdata.linked_account)
        const membershipdata = await membership.get()
          .then(doc => {
            return doc.data()
          })
        event.update({
          members: firebase.firestore.FieldValue.arrayUnion(userID)
        })
        const paras = {}
        paras.date1 = new Date()
        paras.date2 = new Date()
        paras.payee = membershipdata.name
        paras.payer = this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName
        paras.info = 'Ticket Purchase: ' + await eventdata.event_name
        paras.payeeid = eventdata.linked_account
        paras.payerid = userID
        paras.status = 'paid'
        paras.amount = eventdata.price

        console.log('checkor:', paras)
        const targetpayment = await firebase.firestore().collection('payments').doc()
        targetpayment.set({
          date1: paras.date1,
          date2: paras.date2,
          id: targetpayment.id,
          payee: paras.payee,
          info: paras.info,
          payer: paras.payer,
          payeeid: paras.payeeid,
          payerid: paras.payerid,
          status: paras.status,
          amount: paras.amount
        })
        targetUser.update({
          events: firebase.firestore.FieldValue.arrayUnion(payload),
          payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
        })
        const clubs = await firebase.firestore().collection('memberships').doc(eventdata.linked_account)
        clubs.update({
          payments: firebase.firestore.FieldValue.arrayUnion(targetpayment.id)
        })

      }
    },

    async createPayment(a = {}, payload) {
      const targetpayment = await firebase.firestore().collection('payments').doc()
      targetpayment.set({
        date1: payload.date1,
        date2: payload.date2,
        id: targetpayment.id,
        payee: payload.payee,
        payeeid: payload.payeeid,
        payerid: payload.payerid,
        status: payload.status,
        amount: payload.amount
      })
    },

    async getMembershipTypes(a = {}, payload) {
      var memid = ''
      if (payload === undefined) {
        memid = this.state.userDetails.linkid
      } else {
        memid = await firebase.firestore().collection('users').doc(payload).get()
          .then(doc => {
            return doc.data().membershiplink
          })
      }
      const id = await memid
      const club = await firebase.firestore().collection('memberships').doc(id)
      const FinalArray = []
      const targetMem = await club.get()
        .then(doc => {
          return doc.data().membership_types
        })
      const membership = await firebase.firestore().collection('membership_types').doc(targetMem[0]).get()
        .then(doc => {
          return doc.data()
        })
      membership.link = targetMem[0]
      console.log('overhere:', membership)
      return membership
    },

    async getClubEvents(a = {}, payload) {
      var memid = ''
      if (payload === undefined) {
        memid = this.state.userDetails.linkid
      } else {
        memid = await firebase.firestore().collection('users').doc(payload).get()
          .then(doc => {
            return doc.data().membershiplink
          })
      }
      const id = await memid
      const club = await firebase.firestore().collection('memberships').doc(id)
      const snapshot = await club.get()
        .then(doc => {
          if (doc.exists) {
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
      console.log('Events', finalArray)
      return finalArray
    },

    async createMembershipType(a = {}, payload) {
      console.log('casdaj:', payload)
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const clubdata = await club.get()
        .then(doc => {
          return doc.data().membership_types
        })
      if (clubdata.length != 0) {
        console.log('club already exists')
      } else {
        console.log('away we go')
        const membership = await firebase.firestore().collection('membership_types').doc()
        membership.set({
          members: [],
          description: payload.description,
          membershiplink: this.state.userDetails.linkid,
          name: payload.name,
          imgURL: payload.imgURL,
          price: payload.price
        })
        club.update({
          membership_types: firebase.firestore.FieldValue.arrayUnion(membership.id)
        })
      }

      /*const targetMem = club.collection('membership_types').doc()
      targetMem.set({
        members: [],
        price: 0,
        name: payload.title,
        origin: this.state.userDetails.linkid
      })*/
    },

    async UpdateProfile(a = {}, payload) {
      this.commit('setColour', payload.colour)
      console.log(payload)
      const userID = await firebase.auth().currentUser.uid
      console.log(userID)
      const targetUser = await firebase.firestore().collection('users').doc(userID)
      targetUser.update({
        address: payload.address,
        subtitle: payload.subtitle,
        description: payload.about,
        username: payload.username,
        last_name: payload.lastName,
        first_name: payload.firstName,
        zipCode: payload.zipCode,
        country: payload.country,
        colour: payload.colour,
        city: payload.city,
      })
      if (this.state.userDetails.type === 'Club') {
        const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
        club.update({
          details: payload.subtitle,
          description: payload.about,
        })
      }

      if (this.state.userDetails.type === "User") {
        router.push(
          "/dashboard/user/" + this.state.userDetails.id
        );
      } else {
        router.push(
          "/dashboard/club/" + this.state.userDetails.id
        );
      }

    },

    async updateMembershipType(a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const clubdata = await club.get()
        .then(doc => {
          return doc.data().membership_types
        })
      const membership = await firebase.firestore().collection('membership_types').doc(clubdata[0])
      membership.update({
        description: payload.description,
        name: payload.name,
        price: payload.price
      })

    },

    async deleteMembershipType(a = {}, payload) {
      const club = await firebase.firestore().collection('memberships').doc(this.state.userDetails.linkid)
      const targetMem = club.collection('membership_types').doc(payload)
      targetMem.delete().then(function () {
        console.log("Document successfully deleted!")
      }).catch(function (error) {
        console.error("Error removing document: ", error)
      })
    },

    async getEventTickets() {
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

    async getMembershipsTypesUser(a = {}, payload) {
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

    async joinMembershipsTypesUser(a = {}, payload) {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      targetUser.update({
        membership_types: firebase.firestore.FieldValue.arrayUnion(payload)
      })
    },

    async createEvent(a = {}, payload) {
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
        linked_account: this.state.userDetails.linkid,
        members: []
      })
      club.update({
        events: firebase.firestore.FieldValue.arrayUnion(targetEvent.id)
      })
    },

    async deleteEvent(a = {}, payload) {
      console.log('delete:', payload)
      const targetEvent = firebase.firestore().collection('events').doc(payload)
      const snapshot = await targetEvent.get()
        .then(doc => {
          if (doc.exists) {
            return doc.data()
          }
        })
      console.log('delete2:', snapshot.linked_account)
      const targetMembership = firebase.firestore().collection('memberships').doc(snapshot.linked_account)
      targetMembership.update({
        events: firebase.firestore.FieldValue.arrayRemove(payload)
      })
    },

    async updateEvent(a = {}, payload) {
      const targetEvent = firebase.firestore().collection('events').doc(payload.id)
      console.log('eventsdata:', payload)
      targetEvent.update({
        event_name: payload.title,
        catering: payload.extras.catering,
        membersOnly: payload.extras.membersOnly,
      })
      if (payload.event_description != undefined) {
        targetEvent.update({
          event_description: payload.description,
        })
      }
      if (payload.location != undefined) {
        targetEvent.update({
          location: payload.location,
        })
      }
      if (payload.times != undefined) {
        targetEvent.update({
          date: payload.times,
        })
      }
      if (payload.price != undefined && payload.price != -1) {
        targetEvent.update({
          price: payload.price,
        })
      }
      if (payload.capacity != undefined) {
        targetEvent.update({
          capacity: payload.capacity
        })
      }
    },

    async joinEvent(a = {}, payload) {
      const userID = firebase.auth().currentUser.uid
      const targetUser = firebase.firestore().collection('users').doc(userID)
      const targetEvent = firebase.firestore().collection('events').doc(payload)
      targetUser.update({
        events: firebase.firestore.FieldValue.arrayUnion(payload)
      })
      targetEvent.update({
        members: firebase.firestore.FieldValue.arrayUnion(userID)
      })
    },

    async getSettings(a = {}) {
      const userID = firebase.auth().currentUser.uid
      const user = await firebase.firestore().collection('users').doc(userID)
      const clubthing = await user.get()
        .then(doc => {
          return doc.data()
        })
      return clubthing
    },

    async getClubMembers(a = {}, payload) {
      console.log('thickem', payload)
      const user = await firebase.firestore().collection('users').doc(payload)
      const clubthing = await user.get()
        .then(doc => {
          return doc.data().membershiplink
        })

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
        if (snapshot !== undefined) {
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
