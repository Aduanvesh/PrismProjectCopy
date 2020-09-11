<template>
  <!-- Grid layout needs major adjustment.
  https://quasar.dev/layout/grid/flex-playground-->
  <q-page class="flex">
      <div class="row q-pa-md" align="center">
        <div class="col full-width">
          <Cards
          v-for="link in cardsLinks"
          :key="link.title"
          v-bind="link"
          class=""
          />
        </div>
        <div class="col full-width">
        <q-btn
          size="35px"
          round
          flat
          color="grey-9"
          icon="add_circle_outline"
          class="q-mt-md"
          target="_blank"
          @click="layout = true"
        />
        </div>
      </div>

    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-grey-3">
            <q-img src="https://images.fiftyfootshadows.net/2019/06/grotta_desktops.jpg" basic>
            <q-btn flat round dense icon="cloud_upload" class="absolute-center" size="xl" />
            <div class="absolute-bottom text-h6"> Add Membership </div>
            <q-btn flat v-close-popup round dense icon="close" class="float-left" />
            </q-img>
        </q-header>

        <q-footer class="bg-grey-3 text-black">
          <q-toolbar>
          <q-btn flat v-close-popup round icon="check_circle" class="float-right" @click="submitMembership" />
          </q-toolbar>
        </q-footer>

        <q-drawer bordered v-model="drawer" :width="200" :breakpoint="600" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-drawer side="right" bordered v-model="drawerR" :width="200" :breakpoint="300" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-page-container>
          <!-- <q-page padding>
            <p v-for="n in contentSize" :key="n">
              {{ lorem }}
            </p>
          </q-page> -->
        <q-page padding>
          <q-input filled v-model="membership.name" outlined label="Name" stack-label class='q-pl-sm q-pr-sm q-pb-sm' q-input/>
          <q-input filled v-model="membership.type" outlined label="Type" stack-label class='q-pl-sm q-pr-sm q-pb-sm' q-input/>
          <q-input filled v-model="membership.price" outlined label="Price" stack-label class='q-pl-sm q-pr-sm q-pb-sm' q-input/>
          <q-input filled v-model="membership.details" outlined label="Details" stack-label class='q-pl-sm q-pr-sm q-pb-sm' q-input/>
            <div align="absolute-bottom-right">
              <q-toggle
                v-model="first"
                icon="alarm"
                label="Send Alerts"
              />
              <q-toggle
                v-model="second"
                color="green"
                icon="credit_card"
                label="Card is Visible"
              />
            </div>
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
import { mapActions } from 'vuex'
// import Modal from 'components/Modal.vue'
const cardsData = [
  {
    title: 'QUT Code Network',
    caption: 'Standard Membership',
    details: '132 members',
    link: '/code-network-membership'
  },
  {
    title: 'QUT NotCode Network',
    caption: 'Standard Membership',
    details: '132 members',
    link: '/code-network-membership'
  }
]

export default {
  name: 'Memberships',
  components: { Cards },
  data () {
    return {
      first: true,
      second: true,
      cardsLinks: cardsData,
      layout: false,
      moreContent: true,
      drawer: false,
      drawerR: false,
      lorem: 'hello, this is a test',
      membership: {
        name: '',
        type: '',
        price: '',
        details: ''
      }
    }
  },

  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },

  methods: {
    ...mapActions('store', ['addCard', 'getCards']),

    go (href) {
      console.log(href)
      alert('Hey')
    },

    submitMembership () {
      console.log('hola')
      this.addCard(this.membership)
      this.retrieveMembership()
    },

    async retrieveMembership () {
      const cards = await this.getCards()
        .then(function (data) {
          const cardsData = []
          for (var i = 0; i < data.length; i++) {
            console.log(data[i].details)
            const card = {
              title: '',
              caption: '',
              details: '',
              link: ''
            }
            card.title = data[i].name
            card.caption = data[i].type
            if (data[i].memberCount === 1) {
              card.details = '1 member'
            } else {
              card.details = data[i].memberCount + ' members'
            }
            card.link = '/code-network-membership'
            cardsData.push(card)
          }
          return cardsData
        })
      this.cardsData = cards
      this.cardsLinks = this.cardsData
      console.log(this.cardsData)
    }
  },
  created () {
    this.retrieveMembership()
  }
}
</script>

<style lang="css">
  @import '../css/effects.css';
</style>
