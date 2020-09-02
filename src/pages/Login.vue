<template>
  <div class="q-pa-md">
    <!-- <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset> -->
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
          <q-tab name="login" label="Login" @click="resetTabs" />
          <q-tab name="reset" label="Reset Password" @click="resetTabs"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated ref="tabs">
          <q-tab-panel name="login">
            <div>
              <q-form @submit= "login" class= "q-gutter-md">

                <!--The code for the login inputs and button-->
                <q-input filled v-model="loginForm.email" type = 'email' label="Email" :dense="false"
                :rules="[val => !!val || 'Field is required', val => val.includes('@') || 'Not a valid email address']" />
                <q-input filled v-model="loginForm.password"  type = 'password'  label="Password" :dense="false" :rules="[val => !!val || 'Field is required']" />

                <div class="extras">
                  <p class="error"> {{messageError}} </p>
                  <a @click="togglePasswordReset">Forgot Password</a> |
                  <a @click="$router.push('/register')">Create an Account</a>
                </div>
                <q-btn color="primary" label="Login" type="submit" />

              </q-form>
            </div>

          </q-tab-panel>
          <q-tab-panel name="reset">
            <div>
              <q-form @submit= "resetPasswordMethod" class= "q-gutter-md">
                <q-input filled v-model="resetForm.email" type = 'email' ref="passReset" label="Email"
                :dense="false" :rules="[val => !!val || 'Email address is required', val => val.includes('@') || 'Not a valid email address']" />
                <div
                v-if="!showPasswordReset">
                  <p class="error"> {{messageError}} </p>
                  <q-btn color="primary" label="Send Recovery Email" type="submit" />
                </div>
                <div
                v-else>
                  <p class="confirmed"> {{messageError}} </p>
                  <q-btn color="primary" label="Back to Login" @click = "backLogin"  />
                </div>
              </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
// import PasswordReset from '../components/PasswordReset'
import { mapActions } from 'vuex'

export default {
  components: {
    // PasswordReset
  },
  data () {
    return {
      tab: 'login',
      loginForm: {
        email: '',
        password: ''
      },
      resetForm: {
        email: ''
      },
      showPasswordReset: false,
      view: false,
      messageError: ' '
    }
  },
  methods: {
    ...mapActions('store', ['signinUser', 'resetPassword']),

    // TODO: to be implemented for password reset
    togglePasswordReset () {
      this.tab = 'reset'
    },

    // TODO: managing of login errors
    async login () {
      let errorType = ''
      const error = this.signinUser(this.loginForm)
      this.messageError = await error.then(function (defs, messageError) {
        errorType = defs
        if (errorType === undefined) {
          console.log('cappa')
          return ' '
        } else if (errorType === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          return 'The entered username or password is incorrect'
        } else if (errorType === 'The password is invalid or the user does not have a password.') {
          return 'The entered username or password is incorrect'
        }
      })
      console.log('loginmessageerror(ignore if blank):', this.messageError)
    },

    backLogin () {
      console.log(this.tab)
      this.tab = 'login'
      this.resetTabs()
    },

    resetTabs () {
      this.showPasswordReset = false
      this.messageError = ' '
    },

    async resetPasswordMethod () {
      let errorType = ''
      console.log('testing1', this.messageError)
      const error = this.resetPassword(this.resetForm)
      this.messageError = ' '
      this.messageError = await error.then(function (defs, messageError) {
        console.log('the error is', defs)
        errorType = defs
        if (errorType === undefined) {
          return 'An email has been sent to change your password'
        } else if (errorType === 'The email address is badly formatted.') {
          return 'Not a valid email address'
        } else if (errorType === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          return 'Email address not found'
        } else if (errorType === 'We have blocked all requests from this device due to unusual activity. Try again later.') {
          return 'Can not connect to servers right now. Please try again later'
        } else {
          return 'An unexpected error has occurred. Please try again later'
        }
      })
      console.log('resetmessageerror(ignore if blank):', this.messageError)
      if (this.messageError === 'An email has been sent to change your password') {
        this.showPasswordReset = true
      }
    }
  } /*
  computed: {
    errorMessage () {
      this.messageError = ' '
    }
  } */
}
</script>

<style>
.error {
  color:#c10015;
  font-size: 12px;
  padding-left: 12px;
}
.confirmed {
  color:#007728;
  font-size: 12px;
  padding-left: 12px;
}
</style>
