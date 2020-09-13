<template>
  <q-page class="flex flex-center">
    <div id="buttons" class="q-gutter-sm">
    <q-btn color="primary" label="Memberships" @click = "toMemberships"  />
    <q-btn color="primary" label="Profile" @click = "toProfile"  />
      <div id="nav">
        Landing Page!
        <br>
        <b>To do: add dashboard</b>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      user_data: []
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  methods: {
    // TODO: clean this up later
    toMemberships () {
      if (!this.userDetails.email) {
        this.$router.push('/login')
      } else {
        this.$router.push('/memberships')
      }
    },
    toProfile () {
      if (!this.userDetails.email) {
        this.$router.push('/login')
      } else {
        this.$router.push('/profile')
      }
    }
  },
  created () {
    this.$bind('user_data', this.$firestore.collection('users'))
  }
}
</script>
