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
                            <div class="text-center text-muted mb-4">
                                <small>Enter email address associated with your account.</small>
                            </div>
                            <div v-if="messageError != ' '" class="error">
                                {{messageError}}
                            </div>
                            <form role="form" @submit.prevent="resetPasswordMethod">
                                <div class = "login">
                                    <input type="email"
                                                class="form-control"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83"
                                                v-model="resetForm.email">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="my-4">Send Recovery Email</button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="/login" class="text-light">
                                <small>Go back to login</small>
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
      resetForm: {
        email: ''
      },
      showPasswordReset: false,
      messageError: ' ',
      message: ' '
    }
  },
  mounted() {
      this.message = this.$store.getters.getMessage
  },
  methods: {
    async resetPasswordMethod () {
      let errorType = ''
      const error = this.$store.dispatch('resetPassword', this.resetForm)
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
      console.log('started')
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
