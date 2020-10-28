<template>
    <section class="section section-shaped section-lg my-0" id="loginpage">
        <div class="shape shape-style-1 bg-gradient-default" id="loginbackgroundimg">
            <img src="img/theme/loginwallpaper.jpg" class="img-fluid animated" alt="">         
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
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral" class="mb-3">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                             <div v-if="messageError != ' '" class="error">
                                {{messageError}}
                            </div>
                            <form role="form" @submit.prevent="login">
                                <div class = "login">
                                    <input type="email"
                                                class="form-control"
                                                placeholder="Email"
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
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <button type="submit" class="my-4">Sign In</button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="/password-reset" class="text-light">
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
import router from "../router";

export default {
  components: {
    // PasswordReset
  },
  data () {
    return {
      tab: 'login',
    }
  },
  methods: {
    //...mapActions('store', ['signinUser', 'resetPassword']),
    // TODO: to be implemented for password reset
    testing () {
      
    },
    
  },
  created () {
      console.log(this.$route.params.id)
  }, 
  /*computed: {
    errorMessage () {
      return store.state.message
    }
  } */
}
</script>
<style>
</style>
