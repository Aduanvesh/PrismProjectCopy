<template>
    <div class="section section-shaped section-lg my-0">
         <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="profile-page">
           <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{activeTabIndex}">
                    <tab-pane key="tab1">
                        <template slot="title">
                            <i class="ni ni-cloud-upload-96 mr-2"></i>Clubs and Societies
                        </template>
                    
                    <li v-for="cards in cardsLinks" v-bind:key="cards.title"> {{cards.title}} ({{cards.details}}) </li>
                      
                    </tab-pane>

                    <tab-pane key="tab2">
                        <template slot="title">
                            <i class="ni ni-bell-55 mr-2"></i>Events
                        </template>

                        <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex
                            squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                            american apparel, butcher voluptate nisi qui.</p>
                    </tab-pane>

                    <tab-pane key="tab3">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Payments
                        </template>

                        <p class="description">Raw denim you probably haven't heard of them jean shorts
                            Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                            cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                            keffiyeh dreamcatcher synth.</p>
                    </tab-pane>
                    <tab-pane key="tab4">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Tickets
                        </template>

                        <p class="description">Raws denim you probably haven't heard of them jean shorts
                            Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                            cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                            keffiyeh dreamcatcher synth.</p>
                    </tab-pane>
                </card>
            </tabs>
        </div>
    </div>
</template>

<script>
import Cards from '../views/components/Cards.vue'
import store from 'main'

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
    components: {

    },
    data () {
        return {
        cardsLinks: cardsData,
        first: true,
        second: true,
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
    methods: {
        async retrieveMembership () {
        const cards = this.$store.dispatch('getCards')
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
        this.cardsData = await cards
        this.cardsLinks = this.cardsData
        console.log('cardscheck:', this.cardsData)
        }
        
    },
    created() {
        this.retrieveMembership()
    }
  }
</script>

<style></style>
