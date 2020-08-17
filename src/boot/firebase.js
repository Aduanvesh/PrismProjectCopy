import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/performance'
import 'firebase/analytics'
import { firestorePlugin } from 'vuefire'

export default async ({ Vue }) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAHgW7HE1meejzypySKCg_c5t6tI1vFhY8',
    authDomain: 'sociit.firebaseapp.com',
    databaseURL: 'https://sociit.firebaseio.com',
    projectId: 'sociit',
    storageBucket: 'sociit.appspot.com',
    messagingSenderId: '22316803355',
    appId: '1:22316803355:web:30f6c6b3584c2ebe4b9fbe',
    measurementId: 'G-FE3JQ3F6M7'
  }

  // Initialize Firebase from settings
  firebase.initializeApp(firebaseConfig)
  // const firebaseAuth = firebaseApp.auth()
  // const firebaseDb = firebaseApp.database()

  // export { firebaseAuth, firebaseDb }

  // Initialize Vuefire
  Vue.use(firestorePlugin)

  // Add handy shortcuts to firebase functions
  Vue.prototype.$firebase = firebase
  Vue.prototype.$firestore = firebase.firestore()
  Vue.prototype.$functions = firebase.app().functions('asia-northeast1')

  firebase.performance()
  firebase.analytics()

  // This creates a handy "this.$user" object on each template!
  // Use this for things like: this.$user.id
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      let firestoreUser

      // In your database, if you have a users/<uid> document, it'll fetch that info and add it to this.$user now...
      if (user) firestoreUser = (await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()).data()

      Vue.prototype.$user = {
        ...firestoreUser,
        ...firebase.auth().currentUser
      }
      resolve()
    })
  })
}
