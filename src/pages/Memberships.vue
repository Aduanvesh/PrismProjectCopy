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
            @click="go('my-link')"
        />
        </div>
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
      cardsLinks: cardsData
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
