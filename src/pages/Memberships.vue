<template>
  <!-- Grid layout needs major adjustment. -->
  <q-page class="flex">
      <div class="row q-pa-md">
        <div class="col">
          <Cards
          v-for="link in cardsLinks"
          :key="link.title"
          v-bind="link"
        />
        </div>
      </div>
  </q-page>
</template>

<script>
// Usually the import statement below is placed in a layouts vue, rather than a page.
import Cards from 'components/Cards.vue'

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
      leftDrawerOpen: false,
      cardsLinks: cardsData
    }
  }
}
</script>
