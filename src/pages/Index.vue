<template>
  <q-page class="flex flex-center">
    <div id="buttons" class="q-gutter-sm">
    <q-btn color="primary" label="Memberships" @click = "toMemberships"  />
    <q-btn color="primary" label="Profile" @click = "toProfile"  />
      <div id="nav">
        Landing Page!
      </div>
    </div>
    <!--
    <q-item
      v-for="item in user_data"
      :key="item.id"
    >
      {{'Hi, ' + item.first_name
      }}
      <br>
      {{'Your password is: ' + item.pass
      }}
      <br>
      {{'Your account was created: ' + item.date_created
      }}
      <br>
      {{'You live at: ' + item.street_address + ' ' + item.suburb
      }}

    </q-item> -->
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
    }
  },
  created () {
    this.$bind('user_data', this.$firestore.collection('users'))
  }
}
</script>
