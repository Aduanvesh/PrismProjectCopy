<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Register with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral" class="mb-3">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/apple.svg">
                                    Sign in with Apple
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign up with credentials</small>
                            </div>
                            <form role="form" @submit.prevent="signUpUser">
                                <div class = "first name">
                                <input class="mb-3"
                                            placeholder="First Name"
                                            addon-left-icon="ni ni-hat-3"
                                            v-model="signupForm.firstName">
                                </div>
                                <div class = "last name">
                                <input class="mb-3"
                                            placeholder="Last Name"
                                            addon-left-icon="ni ni-hat-3"
                                            v-model="signupForm.lastName">
                                </div>
                                <div class = "email">
                                <input class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83"
                                            v-model="signupForm.email">
                                </div>
                                <div class = "password">
                                <input type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="signupForm.password">
                                </div>
                                <div class = "phone number">
                                <input placeholder="Phone Number"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="signupForm.phoneNumber">
                                </div>
                                <div class = "university">
                                <input placeholder="University"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            v-model="signupForm.university">
                                </div>
                                <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div>
                                <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox>
                                <div class="text-center">
                                    <button type="submit" class="my-4">Create account</button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from 'vuex'
import store from 'main'
// import * as firebase from 'firebase'

export default {
  data () {
    return {
      tab: 'registerUser',
      signupForm: {
        type: 'User',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        university: ''
      },
      signupClubForm: {
        type: 'Club',
        title: '',
        email: '',
        password: '',
        phoneNumber: '',
        university: ''
      },
      options: [
        'Cannot connect to the server'],
      messageError: ' '
    }
  },
  methods: {
    //...mapActions('store', ['signupUser', 'getUniversities']),

    // TODO: potentially changing the actions for user and club registration. right now they dont do anything differently, just different forms.
    // TODO: managing of signup errors
    async signUpUser () {
      let errorType = ''
      const error = this.$store.dispatch('signupUser', this.signupForm)
      this.messageError = await error.then(function (defs, messageError) {
        errorType = defs
        if (errorType === undefined) {
          console.log('cappa')
          return ' '
        } else if (errorType === 'The email address is already in use by another account.') {
          return 'Email address already in use'
        } else if (errorType === 'The password is invalid or the user does not have a password.') {
          return 'The entered username or password is incorrect'
        }
      })
      console.log('signupusermessageerror(ignore if blank):', this.messageError)
    },

    async signUpClub () {
      let errorType = ''
      const error = this.signupUser(this.signupClubForm)
      this.messageError = await error.then(function (defs, messageError) {
        errorType = defs
        if (errorType === undefined) {
          console.log('cappa')
          return ' '
        } else if (errorType === 'The email address is already in use by another account.') {
          return 'Email address already in use'
        } else if (errorType === 'The password is invalid or the user does not have a password.') {
          return 'The entered username or password is incorrect'
        }
      })
      console.log('signupclubmessageerror(ignore if blank):', this.messageError)
    },

    resetTabs () {
      this.messageError = ' '
    },

    async getUni () {
      const stuff = await this.$store.dispatch('getUniversities')
        .then(function (data) {
          return data
        })
      this.options = stuff
      console.log('unitest:', this.options)
    }
  },
  created () {
    this.getUni()
  }
}
</script>
<style>
</style>
