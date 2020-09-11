<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="img:static/sociit1024x959.png"
          type="a" href="/"
        />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-center">
          Memberships
        </q-toolbar-title>
        <!-- <q-btn
          flat
          dense
          round
          icon="edit"
          aria-label="Edit"
          @click="edit_status = !edit_status"
        /> -->
        <q-btn
          flat
          dense
          round
          icon="edit"
          aria-label="Edit"
          @click="edit_status = !edit_status"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Sociit
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      edit_status: false,
      essentialLinks: linksData
    }
  }
}
</script>
