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
          <q-tab name="registerUser" label="Register User" />
          <q-tab name="registerClub" label="Register Club" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="registerUser">
                <div>
                    <q-form @submit= "signUpUser" class= "q-gutter-md">
                        <q-input filled v-model="signupForm.firstName" type = 'text' label="First Name" :dense="false" />
                        <q-input filled v-model="signupForm.lastName" type = 'text' label="Last Name" :dense="false" />
                        <q-input filled v-model="signupForm.email" type = 'email' label="Email" :dense="false" />
                        <q-input filled v-model="signupForm.password" type = 'password'  label="Password" :dense="false" />
                        <q-input filled v-model="signupForm.phoneNumber" type = 'text' label="Phone Number" :dense="false" />
                        <q-input filled v-model="signupForm.university" type = 'text' label="University" :dense="false" />
                        <q-btn color="primary" label="Sign Up" type="submit" />
                    </q-form>
                </div>
            </q-tab-panel>

            <q-tab-panel name="registerClub">
                <div>
                    <q-form @submit= "signUpClub" class= "q-gutter-md">
                        <q-input filled v-model="signupClubForm.title" type = 'text' label="Club/Society Name" :dense="false" />
                        <q-input filled v-model="signupClubForm.email" type = 'email' label="Email" :dense="false" />
                        <q-input filled v-model="signupClubForm.password" type = 'password'  label="Password" :dense="false" />
                        <q-input filled v-model="signupClubForm.phoneNumber" type = 'text' label="Phone Number" :dense="false" />
                        <q-input filled v-model="signupClubForm.university" type = 'text' label="University" :dense="false" />
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
      }
    }
  },
  methods: {
    ...mapActions('store', ['signupUser']),

    // TODO: potentially changing the actions for user and club registration. right now they dont do anything differently, just different forms.
    // TODO: managing of signup errors
    signUpUser () {
      this.signupUser(this.signupForm)
    },
    signUpClub () {
      this.signupUser(this.signupClubForm)
    }
  }
}
</script>
