<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Header -->
    <!-- When placing icons and static resources (images), you should read the docs.
        Images won't work if they're placed in "assets". They should be placed in public.
        The path is relative to public, also.-->
    <div class="col-12">
    <!-- BANNER for the User Page -->
    <div class="row-3">
        <q-img
            src="https://placeimg.com/500/300/nature"
            style="height: 400px;"
        ></q-img>
    </div>
    <!-- USER toolbar -->
    <q-toolbar class="q-pt-xl q-pl-xl">
        <q-toolbar-title>
          {{name}}
          <div class = "greyout">
          #{{$route.params.id}}
          </div>
        </q-toolbar-title>
    </q-toolbar>
    </div>
    <!-- TABS requires if-binding -->
      <q-tabs>
        <q-route-tab
          icon="local_activity"
          to="/your/route"
          replace
          label="Tickets"
        />
        <q-route-tab
          icon="credit_card"
          to="/some/other/route"
          replace
          label="Memberships"
        />
        <q-tab
          icon="edit"
          aria-label="Edit"
          replace
          label="Edit"
        />
      </q-tabs>
    <!-- END USER toolbar -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- TITLE for User Page -->
      <div>
      <div class="row q-pt-md q-pl-xl">
        <div class="text-h5 text-bold"> {{title}} </div>
      </div>
      <div class="row q-pl-xl">
        <div class="text-h6"> {{subtitle}} </div>
      </div>
      </div>
      <!-- BODY CONTENT for User Page -->
      <div class="row">
        <div class="col 12">
          <div class="q-pl-xl q-pt-lg">
            <div class="row">
              {{textarea}}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col 12">
          <div class="q-pl-xl q-pt-lg">
            <div class="row">
              {{textarea}}
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </q-page-container>
  <q-footer>
    Some footer?
  </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true,
      name: 'Member',
      title: 'Society Profile',
      subtitle: 'A subtitle',
      textarea: 'Needs to be bound to a bio in the server.'
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  methods: {
    ...mapActions('store', ['checkUser']),

    async checkUserPage () {
      const check = await this.checkUser(this.$route.params.id)
      if (check !== 'in') {
        this.$router.push('/')
      } else {
        this.name = this.userDetails.firstName + ' ' + this.userDetails.lastName
        console.log(this.firstName)
      }
    }
  },
  created () {
    this.checkUserPage()
  }
}
</script>

<style>
.greyout {
  color:#747474;
  font-size: 13px;
  font-style: italic;
}
</style>
