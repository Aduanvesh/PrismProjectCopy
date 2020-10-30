<template>
    <section class="section section-shaped section-lg my-0">
    <base-nav 
                  type="default"
                  effect="dark"
                  expand
                  title="Return to Dashboard"
                  class="mt-4"
                  to="/society"
      ></base-nav>
      <base-table>
      </base-table>
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
                                <p>Scan Ticket</p>
                            </div>
                        </template>
                        <template>
                            <form role="form" @submit.prevent="login">
                                <div class = "login">
                                    <input type="email"
                                                class="form-control"
                                                placeholder="Ticket Code"
                                                addon-left-icon="ni ni-email-83"
                                                v-model="loginForm.email">
                                </div>
                                <div class = "password">
                                    <input type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="loginForm.password"
                                                class="form-control">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="my-4">Sign In</button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="/register/user" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from 'vuex'
import store from 'main'

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
      messageError: ' ',
      message: ' '
    }
  },
  mounted() {
      this.message = this.$store.getters.getMessage
  },
  methods: {
    //...mapActions('store', ['signinUser', 'resetPassword']),
    // TODO: to be implemented for password reset
    togglePasswordReset () {
      this.tab = 'reset'
    },
    // TODO: managing of login errors
    async login () {
        console.log('emailtest:', this.loginForm.email)
        let errorType = '' 
        const error = this.$store.dispatch('signinUser', this.loginForm)
        this.messageError = await error.then(function (defs, messageError) {
            errorType = defs
            if (errorType === undefined) {
            console.log('successfully logged in')
            return 'success'
            } else if (errorType === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            return 'The entered username or password is incorrect'
            } else if (errorType === 'The password is invalid or the user does not have a password.') {
            return 'The entered username or password isrc\stores incorrect'
            }
        })
        if (this.messageError === 'success'){
          if (this.$route.params.type==='club'){
            this.clubjoin()
          } else if(this.$route.params.type==='event'){
            this.eventattend()
          }
         
        }
      console.log('loginmessageerror(ignore if blank):', this.messageError) 
    },

    async eventattend() {
      if (this.$store.state.userDetails.type === 'User'){
          console.log('search:', this.$route.params.id)
            const check = this.$store.dispatch('markAttendanceEvent', this.$route.params.id)
            const result = await check.then(function (defs, messageError) {
                return defs
            })
            if (result === 'success'){
                this.$router.push('/dashboard/user/' + this.$store.state.userDetails.id)
            }
      }
    },

    async clubjoin() {
      console.log(this.$route.params.type)
      if (this.$store.state.userDetails.type === 'User'){
          console.log('search:', this.$route.params.id)
            const check = this.$store.dispatch('joinClubCode', this.$route.params.id)
            const result = await check.then(function (defs, messageError) {
                return defs
            })
            if (result === 'success'){
                this.$router.push('/dashboard/user/' + this.$store.state.userDetails.id)
            }
      }
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
  },
  created () {
      
  }, 
  /*computed: {
    errorMessage () {
      return store.state.message
    }
  } */
}
</script>
<style>
.password, .login{
    text-align: center;
    padding-bottom: 25px;
}
</style>
