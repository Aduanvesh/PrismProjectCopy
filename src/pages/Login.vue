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
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div>
              <q-form @submit= "login" class= "q-gutter-md">

                <!--The code for the login inputs and button-->
                <q-input filled v-model="loginForm.email" type = 'email' label="Email" :dense="false" />
                <q-input filled v-model="loginForm.password"  type = 'password'  label="Password" :dense="false" />
                <q-btn color="primary" label="Login" type="submit" />

              </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import PasswordReset from '../components/PasswordReset'
import { mapActions } from 'vuex'

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
      showPasswordReset: false
    }
  },
  methods: {
    ...mapActions('store', ['signinUser']),

    // TODO: to be implemented for password reset
    togglePasswordReset () {
      this.showPasswordReset = !this.showPasswordReset
    },

    // TODO: managing of login errors
    login () {
      this.signinUser(this.loginForm)
    }
  }
}
</script>
