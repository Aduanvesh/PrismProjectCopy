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
                                    <img slot="icon" src="/img/icons/common/google.svg">
                                    Google
                                </base-button>
                                </div>
                            <div class="text-muted text-center mb-3">
                                <small>Register club account at</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <router-link slot="brand" class="btn btn-neutral btn-icon" to="/register/club">
                                    <span class="nav-link-inner--text">Club Registration</span>
                                </router-link>
                                </div>
                             <!--   <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/apple.svg">
                                    Sign in with Apple
                                </base-button> -->
                            
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Or sign up with credentials</small>
                            </div>
                             <div v-if="messageError != ' '" class="error">
                                {{messageError}}
                            </div>
                            <div v-if="this.$router.currentRoute.path=='/register/club'">
                                <form role="form" @submit.prevent="signUpClub">
                                    <div class = "title">
                                    <input class="form-control"
                                                placeholder="Club Name"
                                                addon-left-icon="ni ni-hat-3"
                                                v-model="signupClubForm.title">
                                    </div>
                                    <div class = "email">
                                    <input class="form-control"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83"
                                                v-model="signupClubForm.email">
                                    </div>
                                    <div class = "password">
                                    <input type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupClubForm.password"
                                                class="form-control">
                                    </div>
                                    <div class = "phone-number">
                                    <input placeholder="Phone Number"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupClubForm.phoneNumber"
                                                class="form-control">
                                    </div>
                                    Please select a university from the options below:
                                    <div class = "university">
                                
                                    <select id="uniselect"
                                    placeholder="University"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupClubForm.university"
                                                class="form-control">
                                    <option value = "" selected disabled hidden>Select university here</option>
                                    <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value"> {{option}} </option>
                                    </select>
                                    </div>
                                    <!-- <div class="text-muted font-italic">
                                        <small>password strength:
                                            <span class="text-success font-weight-700">{{passwordStrength}}</span>
                                        </small>
                                    </div> -->
                                    <base-checkbox v-model="checkbox">
                                        <span>I agree with the
                                            <a href="#">Privacy Policy</a>
                                        </span>
                                    </base-checkbox>
                                    <div class="text-center">
                                        <button type="submit" class="my-4">Create club account</button>
                                    </div>
                            </form>
                            </div>
                            <div v-else>
                                          <form role="form" @submit.prevent="signUpUser">
                                    <div class = "first-name">
                                    <input class="form-control"
                                                placeholder="First Name"
                                                addon-left-icon="ni ni-hat-3"
                                                v-model="signupForm.firstName">
                                    </div>
                                    <div class = "last-name">
                                    <input class="form-control"
                                                placeholder="Last Name"
                                                addon-left-icon="ni ni-hat-3"
                                                v-model="signupForm.lastName">
                                    </div>
                                    <div class = "email">
                                    <input class="form-control"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83"
                                                v-model="signupForm.email">
                                    </div>
                                    <div class = "password">
                                    <input type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupForm.password"
                                                class="form-control">
                                    </div>
                                    <div class = "phone-number">
                                    <input placeholder="Phone Number"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupForm.phoneNumber"
                                                class="form-control">
                                    </div>
                                    Please select a university from the options below:
                                    <div class = "university">
                                
                                    <select id="uniselect"
                                    placeholder="University"
                                                addon-left-icon="ni ni-lock-circle-open"
                                                v-model="signupForm.university"
                                                class="form-control">
                                    <option value = "" selected disabled hidden>Select university here</option>
                                    <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value"> {{option}} </option>
                                    </select>
                                    </div>
                                    <!-- <div class="text-muted font-italic">
                                        <small>password strength:
                                            <span class="text-success font-weight-700">{{passwordStrength}}</span>
                                        </small>
                                    </div> -->
                                    <base-checkbox v-model="checkbox">
                                        <span>I agree with the
                                            <a href="#">Privacy Policy</a>
                                        </span>
                                    </base-checkbox>
                                    <div class="text-center">
                                        <button type="submit" class="my-4">Create account</button>
                                    </div>
                                    </form>
                            </div>
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
import router from '../router'
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
      messageError: ' ',
      passwordStrength: 'none',
      checkbox: false,
      refresh: true
    }
  },
  methods: {
    //...mapActions('store', ['signupUser', 'getUniversities']),

    // TODO: potentially changing the actions for user and club registration. right now they dont do anything differently, just different forms.
    // TODO: managing of signup errors
    async signUpUser () {
        const selector = document.getElementById('uniselect')
        this.signupForm.university = selector.options[selector.selectedIndex].text
        if (this.signupForm.firstName == '' ||
        this.signupForm.lastName == '' ||
        this.signupForm.email == ''||
        this.signupForm.password == '' ||
        this.signupForm.phoneNumber == '' || 
        this.signupForm.university == 'Select university here'){
            this.messageError = "Some required fields are missing."
        } else {
            if (this.checkbox){
                let errorType = ''
                const indexNum = selector.selectedIndex
                this.signupForm.university = selector.options[indexNum].text
                const error = this.$store.dispatch('signupUser', this.signupForm)
                this.messageError = await error.then(function (defs, messageError) {
                    errorType = defs
                    selector.selectedIndex = indexNum
                    if (errorType === undefined) {
                    console.log('Signup successful')
                    return ' '
                    } else if (errorType === 'The email address is already in use by another account.') {
                    return 'Email address already in use'
                    } else if (errorType === 'The password is invalid or the user does not have a password.') {
                    return 'The entered username or password is incorrect'
                    }
                })
                
                console.log(indexNum)
            } else {
                this.messageError = "The Privacy Policy must be read and agreed with before account can be created."
            }
        }
        console.log('signupusermessageerror(ignore if blank):', this.messageError)
    },

    async signUpClub () {
        const selector = document.getElementById('uniselect')
        this.signupClubForm.university = selector.options[selector.selectedIndex].text
        if (this.signupClubForm.title == '' ||
        this.signupClubForm.email == ''||
        this.signupClubForm.password == '' ||
        this.signupClubForm.phoneNumber == '' || 
        this.signupClubForm.university == 'Select university here'){
            console.log('mistake')
            this.messageError = "Some required fields are missing."
        } else {
            if (this.checkbox){
                console.log('help')
                let errorType = ''
                const errorClub = this.$store.dispatch('signupUser', this.signupClubForm)
                this.messageError = await errorClub.then(function (defs, messageError) {
                    errorType = defs
                    if (errorType === undefined) {
                    console.log('successfully registered club')
                    return ' '
                    } else if (errorType === 'The email address is already in use by another account.') {
                    return 'Email address already in use'
                    } else if (errorType === 'The password is invalid or the user does not have a password.') {
                    return 'The entered username or password is incorrect'
                    }
                })
            } else {
                this.messageError = "The Privacy Policy must be read and agreed with before account can be created."
            }
            console.log('signupclubmessageerror(ignore if blank):', this.messageError)
        }
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
    }
  },
  created () {
    this.getUni()
    console.log('routercheck:', router.currentRoute.path)
    if (this.refresh){
        this.refresh = false
    }
  }
}
</script>
<style>
.first-name, .last-name, .email, .password, .phone-number, .university, .title {
    text-align: center;
    padding-bottom: 25px;
}

.error{
    color: white;
    font-size: 13px;
    background-color: rgb(163, 1, 1);
    border-radius: 0.25rem;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 25px;
}
</style>
