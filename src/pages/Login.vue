<template>
  <div class="q-pa-md">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div>
              <q-form @submit= "login" class= "q-gutter-md">
              <q-input filled v-model="loginForm.email" type = 'email' label="Email" :dense="false" />
              <q-input filled v-model="loginForm.password"  type = 'password'  label="Password" :dense="false" />
              <q-btn color="primary" label="Login" type="submit" />
              </q-form>
              <q-btn @click="signout" color="secondary" label="logout" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div>
              <q-form @submit= "signup" class= "q-gutter-md">
              <q-input filled v-model="signupForm.email" type = 'email' label="Email" :dense="false" />
              <q-input filled v-model="signupForm.password"  type = 'password'  label="Password" :dense="false" />
              <q-btn color="primary" label="Sign Up" type="submit" />
              </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<!-- <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>Login Page</h1>
        <p>Enter details below</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
            />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a> |
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
          </div>
           <div>
            <label for="country">Country</label>
            <input v-model.trim="signupForm.country" type="text" placeholder="Australia" id="country" />
          </div>
           <div>
            <label for="city">City</label>
            <input v-model.trim="signupForm.city" type="text" placeholder="Brisbane" id="city" />
          </div>
           <div>
            <label for="university">University</label>
            <input v-model.trim="signupForm.university" type="text" placeholder="QUT" id="university" />
          </div>
          <div>
            <label for="suburb">Suburb</label>
            <input v-model.trim="signupForm.suburb" type="text" placeholder="someSuburb" id="suburb" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
            />
          </div>
          <div>
            <label for="password2">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
            />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template> -->

<script>
import PasswordReset from '../components/PasswordReset'
// import * as firebase from 'firebase'
import { mapActions } from 'vuex'
// import router from 'vue-router'
// import store from '../store/store.js'

export default {
  components: {
    PasswordReset
  },
  data () {
    return {
      tab: 'login',
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    ...mapActions('store', ['signupUser', 'signinUser', 'signoutUser']),
    toggleForm () {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset () {
      this.showPasswordReset = !this.showPasswordReset
    },
    login () {
      this.signinUser(this.loginForm)
    },
    signup () {
      this.signupUser(this.signupForm)
    },
    signout () {
      this.signoutUser()
    }
  }
}
</script>
