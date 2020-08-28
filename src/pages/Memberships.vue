<template>
  <!-- Grid layout needs major adjustment. -->
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
        <q-drawer bordered v-model="drawer" :width="200" :breakpoint="600" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-drawer side="right" bordered v-model="drawerR" :width="200" :breakpoint="300" content-class="bg-grey-3 q-pa-sm">
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>
          <q-page-container>
          <q-page padding>
          <q-form @submit= "createNewCard" class= "q-gutter-md">
            <template>
                  <q-input
                    filled
                    v-model="createNewCardForm.colour"
                    class="my-input"
                    label="Card Colour"
                  >
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-color v-model="createNewCardForm.colour" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
            </template>
              <q-field outlined label="Card Name" type="text" stack-label class="q-pa-sm" v-model="createNewCardForm.cardName">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0"> Name </div>
                </template>
              </q-field>
              <q-field outlined label="Type" stack-label class='q-pl-sm q-pr-sm q-pb-sm' v-model="createNewCardForm.cardType">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0"> Type </div>
                </template>
              </q-field>
              <q-field outlined label="Price" stack-label class='q-pl-sm q-pr-sm q-pb-sm' v-model="createNewCardForm.cardPrice">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0"> Price </div>
                </template>
              </q-field>
              <q-field outlined label="Details" stack-label class='q-pl-sm q-pr-sm q-pb-sm' v-model="createNewCardForm.cardDetails">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0"> Details </div>
                </template>
              </q-field>
                <div align="absolute-bottom-right">
                  <q-toggle
                    v-model="createNewCardForm.cardSendAlerts"
                    icon="alarm"
                    label="Send Alerts"
                  />
                  <q-toggle
                    v-model="createNewCardForm.cardVisibility"
                    color="green"
                    icon="credit_card"
                    label="Card is Visible"
                  />
                </div>
            <q-footer class="bg-grey-3 text-black">
              <q-toolbar>
              <q-btn flat v-close-popup type="submit" round icon="check_circle" class="float-right" />
              </q-toolbar>
            </q-footer>
          </q-form>
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
  }
]

export default {
  name: 'Memberships',
  components: { Cards },
  data () {
    return {
      createNewCardForm: {
        colour: '#ffffff',
        cardName: '',
        cardType: '',
        cardPrice: '',
        cardSendAlerts: true,
        cardVisibility: true
      },
      cardsLinks: cardsData,
      layout: false,
      moreContent: true,
      drawer: false,
      drawerR: false,
      lorem: 'hello, this is a test',
      color: '#FF00FF',
      secondColor: '#027be3'
    }
  },

  computed: {
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },

  methods: {
    ...mapActions('store', ['createNewCard']),
    go (href) {
      console.log(href)
      alert('Hey')
    },
    createNewCard () {
      this.createNewCard(this.createNewCardForm)
    }
  }
}
</script>

<style lang="css">
  @import '../css/effects.css';
</style>
