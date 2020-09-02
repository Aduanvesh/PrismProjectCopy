<template>
  <div class="q-pa-md">
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
          <q-tab name="registerUser" label="Register User" @click="resetTabs" />
          <q-tab name="registerClub" label="Register Club" @click="resetTabs" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="registerUser">
                <div>
                    <q-form @submit= "signUpUser" class= "q-gutter-md">
                        <q-input filled v-model="signupForm.firstName" type = 'text' label="First Name" :dense="false" :rules="[val => !!val || 'Field is required']"/>
                        <q-input filled v-model="signupForm.lastName" type = 'text' label="Last Name" :dense="false" :rules="[val => !!val || 'Field is required']"/>
                        <q-input filled v-model="signupForm.email" type = 'email' label="Email" :dense="false"
                        :rules="[val => !!val || 'Field is required', val => val.includes('@') || 'Not a valid email address']" />
                        <q-input filled v-model="signupForm.password" type = 'password'  label="Password" :dense="false"
                        :rules="[val => !!val || 'Field is required', val => val.search('.?[0-9].?') || 'Password must include atleast one number',
                        val => val.length >= 10 || 'Passwords must be 10 characters or longer']"/>
                        <q-input filled v-model="signupForm.phoneNumber" type = 'text' label="Phone Number" :dense="false" :rules="[val => !!val || 'Field is required',
                          val => val.search('\D') || 'Phone Number can only include numbers']"/>
                        <!--  <q-input filled v-model="signupForm.university" type = 'text' label="University" :dense="false" /> -->
                        <q-select filled v-model="signupForm.university" :options="options" label="University" :rules="[val => !!val || 'Field is required']" />
                          <p class="error"> {{messageError}} </p>
                        <q-btn color="primary" label="Sign Up" type="submit" />
                    </q-form>
                </div>
            </q-tab-panel>

            <q-tab-panel name="registerClub">
                <div>
                    <q-form @submit= "signUpClub" class= "q-gutter-md">
                        <q-input filled v-model="signupClubForm.title" type = 'text' label="Club/Society Name" :dense="false" :rules="[val => !!val || 'Field is required']"/>
                        <q-input filled v-model="signupClubForm.email" type = 'email' label="Email" :dense="false"
                        :rules="[val => !!val || 'Field is required', val => val.includes('@') || 'Not a valid email address']"/>
                        <q-input filled v-model="signupClubForm.password" type = 'password'  label="Password" :dense="false" :rules="[val => !!val || 'Field is required']"/>
                        <q-input filled v-model="signupClubForm.phoneNumber" type = 'text' label="Phone Number" :dense="false" :rules="[val => !!val || 'Field is required',
                          val => val.search('\D') || 'Phone Number can only include numbers']"/>
                        <!-- <q-input filled v-model="signupClubForm.university" type = 'text' label="University" :dense="false" /> -->
                        <q-select filled v-model="signupClubForm.university" :options="options" label="University" :rules="[val => !!val || 'Field is required']"/>
                          <p class="error"> {{messageError}} </p>
                        <q-btn color="primary" label="Sign Up" type="submit" />
                    </q-form>
                </div>
            </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions('store', ['signupUser', 'getUniversities']),

    // TODO: potentially changing the actions for user and club registration. right now they dont do anything differently, just different forms.
    // TODO: managing of signup errors
    async signUpUser () {
      let errorType = ''
      const error = this.signupUser(this.signupForm)
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
      const stuff = await this.getUniversities()
        .then(function (data) {
          return data
        })
      this.options = stuff
    }
  },
  created () {
    this.getUni()
  }
}
</script>
