<template>
  <q-page class="flex flex-center">
    <q-item
      v-for="item in name"
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
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      name: []
    }
  },
  created () {
    this.$bind('name', this.$firestore.collection('users'))
  }
}
</script>
