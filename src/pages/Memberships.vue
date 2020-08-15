<template>
  <!-- Grid layout needs major adjustment. -->
  <q-page class="flex">
      <div class="row q-pa-md">
        <div class="col full-width">
          <Cards
          v-for="link in cardsLinks"
          :key="link.title"
          v-bind="link"
          class=""
          />
        </div>
        <div class="col full-width" align="center">
        <q-btn
          size="35px"
          round
          color="primary"
          icon="add"
          class="q-mt-md"
          target="_blank"
          @click="layout = true"
        />
        </div>
      </div>

    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" />
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white">
          <q-toolbar inset>
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>

        <q-drawer bordered v-model="drawer" :width="200" :breakpoint="600" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-drawer side="right" bordered v-model="drawerR" :width="200" :breakpoint="300" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-page-container>
          <q-page padding>
            <p v-for="n in contentSize" :key="n">
              {{ lorem }}
            </p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
// Usually the import statement below is placed in a layouts vue, rather than a page.
import Cards from 'components/Cards.vue'
// import Modal from 'components/Modal.vue'
const cardsData = [
  {
    title: 'QUT Code Network',
    caption: 'Standard Membership',
    details: '132 members',
    icon: 'edit',
    link: '/edit'
  }
]

export default {
  name: 'Memberships',
  components: { Cards },
  data () {
    return {
      cardsLinks: cardsData,
      layout: false,
      moreContent: true,
      drawer: false,
      drawerR: false,
      lorem: 'hello, this is a test'
    }
  },

  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },

  methods: {
    go (href) {
      console.log(href)
      alert('Hey')
    }
  }
}
</script>

<style lang="css">
  @import '../css/effects.css';
</style>
