/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import store from './store'
import firebase from "firebase/app";
import router from "./router";
import Argon from "./plugins/argon-kit";
import ArgonDashboard from './plugins/argon-dashboard';
import './registerServiceWorker'

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


Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(ArgonDashboard);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
