<template>
  <q-page class="flex flex-center">
    <div id="buttons" class="q-gutter-sm">
    <q-btn color="primary" label="Memberships" @click = "toMemberships"  />
    <q-btn color="primary" label="Profile" @click = "toProfile"  />
    <q-btn color="primary" label="Settings" @click = "toSettings"  />
      <div id="nav">
        Landing Page!
        <br>
        <b>To do: add dashboard</b>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      user_data: []
    }
  },
  methods: {
    toMemberships () {
      this.$router.push('/memberships')
    },
    toProfile () {
      this.$router.push('/profile')
    },
    toSettings () {
      this.$router.push('/settings')
    }
  },
  created () {
    this.$bind('user_data', this.$firestore.collection('users'))
  }
}
</script>
