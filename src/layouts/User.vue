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
          {{title}}
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
export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true,
      title: 'Society Profile',
      subtitle: 'A subtitle',
      textarea: 'Needs to be bound to a bio in the server.'
    }
  }
}
</script>
