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
                    <modal>
                    </modal>
                    <li v-for="cards in cardsLinks" v-bind:key="cards.title"> {{cards.title}} ({{cards.details}}) </li>
                      
                    </tab-pane>

                    <tab-pane key="tab2">
                        <template slot="title">
                            <i class="ni ni-bell-55 mr-2"></i>Events
                        </template>

                        <h1>Upcoming Events:</h1>
                    </tab-pane>

                    <tab-pane key="tab3">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Payments
                        </template>
                        <h1>Payments:</h1>
                        <div>
                                <template>
                                <table style="width:75%">
                                    <tr>
                                        <th>Payment ID</th>
                                        <th>Status</th>
                                        <th>Payee</th>
                                        <th>Date submitted</th>
                                        <th>Date paid</th>
                                        <th>-</th>
                                    </tr>
                                    <tr v-for="payment in payments" v-bind:key="payment.id">
                                        <th>{{payment.id}}</th>
                                        <th>{{payment.status}}</th>
                                        <th>{{payment.payee}}</th>
                                        <th>{{payment.date1}}</th>
                                        <th>{{payment.date2}}</th>
                                        <th><button class="btn btn-1 btn-success" v-if="payment.status==='unpaid'" @click="paymentMake(payment.id)">Pay</button></th>
                                    </tr>
                                    </table>
                                </template>
                            </div>
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
import Modal from '../views/SearchClub.vue'

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
        Modal,
    },
    data () {
        return {
        cardsLinks: cardsData,
        showSearch: false,
        payments: [
        ],
        events: [
            {
                id: '12398',
                payee: 'Upcoming event',
                date: '01/08/2020',
                description: 'This is an example event'
            },
            {
                id: '12398',
                payee: 'Upcoming event',
                date: '01/08/2020',
                description: 'This is an example event'
            },
        ],
        tickets: [
            {
                id: '12398',
                payee: 'Upcoming event',
                date: '01/08/2020',
                description: 'This is an example event'
            },
            {
                id: '12398',
                payee: 'Upcoming event',
                date: '01/08/2020',
                description: 'This is an example event'
            },
        ],
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
        },
        search: '',
        }
    },

    methods: {
        async retrieveMembership () {
        const cards = this.$store.dispatch('getCards')
            .then(function (data) {
            const cardsData = []
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].details)
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
        },

        async paymentMake (pid) {
            this.$store.dispatch('makePayment', pid.substring(0))

        },



        async retrievePayments () {
            const pays = this.$store.dispatch('getPayments')
            .then(function (data) {
            const Arpayments = []
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].details)
                const card = {
                id: '',
                status: '',
                payee: '',
                date1: '',
                date2: '',
            }
                
                card.id = data[i].id
                card.status = data[i].status
                card.payee = data[i].payee
                card.date1 = data[i].date1
                card.date2 = data[i].date2

            Arpayments.push(card)
            }
                return Arpayments
            })
        this.payments = await pays

        console.log('cardscheck:', this.payments)
        }
        
    },
    created() {
        setTimeout(() => this.retrieveMembership(), 5000)
        setTimeout(() => this.retrievePayments(), 5000)
    }
  }
</script>

<style>
.table, th, td {
    border: 1px solid rgb(51, 51, 51);    
}
</style>
