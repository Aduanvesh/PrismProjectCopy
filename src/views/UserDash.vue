<template>
    <div class="section section-shaped section-lg my-0" id="userdashboardbgdiv">
    <div class="shape shape-style-1 bg-gradient-default" id="userdashboardbg"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
           <h1 class="h1 pl-sm-3 pl-3" style="color: white;"> Hi, {{this.user}} </h1>
                <div class="col-12 offset-10">
                    <tabs :fill="false" circle>
                        <tab-pane>
                            <span slot="title" class="nav-link-icon d-block"><i class="ni ni-atom"></i></span>
                        </tab-pane>
                        <tab-pane>
                            <span slot="title" class="nav-link-icon d-block"><i class="fa fa-keyboard-o"></i></span>
                        </tab-pane>

                    </tabs>
                </div>
           <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{activeTabIndex}" class="p-xl-5 p-lg-5 p-md-4 p-sm-3">
                      <tab-pane key="tab1">
                        <template slot="title"> 
                            <i class="fa fa-university mr-2"></i>Clubs and Societies
                        </template>
                        <div class="row">
                        <div class="col-auto mr-auto mb-3">Following</div>
                        </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in following" v-bind:key="element.uid">
                                            <!-- <card class="card-options--hover shadow" :link="element.recentEvent.url" img="/img/theme/lcard.png" :name="element.recentEvent.name"> -->
                                                <card class="card-options--hover shadow" img="/img/theme/lcard.png"> 
                                                <template slot="header">
                                                    {{element.title}}
                                                </template>
                                                <template slot="footer">
                                                    <div class="d-flex flex-row">
                                                       <i> {{element.caption}} </i>
                                                    </div>
                                                    <div class="d-flex flex-row-reverse">
                                                   <!-- <p> Most Recent Event: 
                                                        <base-button outline @click="goTo(element.recentEvent.url)">   
                                                        {{element.recentEvent.name}} </base-button></p> -->
                                                    </div>
                                                </template>
                                            </card>
                                    </div>
                        </div>
                        <div class="d-flex flex-row-reverse">
                            <div class="col-auto pt-5">
                                <modal></modal>
                            </div>
                        </div>
                    </tab-pane> 

                <tab-pane key="tab2">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Events
                        </template>
                            <div class="row">
                           <div class="col-auto mr-auto mb-3">Upcoming for my Membership</div>
                            </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in subscribed" v-bind:key="element.id">
                                            <card class="card-lift--hover shadow" :link="element.url" img="/img/theme/lcard.png" :name="element.name">
                                                <template slot="header">
                                                    {{element.event.name}}
                                                </template>
                                            </card>
                                    </div>
                                </div>
                            <div class="row">
                            <div class="col-auto mr-auto mt-3 mb-3">Following</div>
                            </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in events" v-bind:key="element.id">
                                            <card class="card-lift--hover shadow" :link="element.url" img="/img/theme/lcard.png" :name="element.name">
                                                <template slot="header">
                                                    {{element.name}}
                                                </template>
                                            </card>
                                    </div>
                            </div>
                    </tab-pane> 

                   <tab-pane key="tab3">
                        <template slot="title">
                            <i class="ni ni-money-coins mr-2"></i>Payments
                        </template>
                        <div class="row">
                        <div class="col-auto mr-auto mb-3">Payments</div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <table class="col-12">
                                            <tr>
                                                <th>Payment ID</th>
                                                <th>Status</th>
                                                <th>Payee</th>
                                                <th>Date Submitted</th>
                                                <th>Date Paid</th>
                                                <th>Payment</th>
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
                            </div>
                        </div>
                    </tab-pane>
                    <tab-pane key="tab4">
                        <template slot="title">
                            <i class="fa fa-qrcode mr-2"></i>Tickets
                        </template>
                            <div class="row">
                            <div class="col-auto mr-auto mt-3 mb-3">My Premium Memberships</div>
                            </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in memberships" v-bind:key="element.title">
                                            <card class="card-lift--hover shadow" img="/img/theme/lcard.png" :name="element.title">
                                                <template slot="header">
                                                    {{element.title}}
                                                </template>
                                            </card>
                                    </div>
                            </div>
                            <div class="row">
                            <div class="col-auto mr-auto mt-3 mb-3">My Tickets</div>
                            </div> 
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in tickets" v-bind:key="element.title">
                                            <card class="card-lift--hover shadow" img="/img/theme/lcard.png" :name="element.title">
                                                <template slot="header">
                                                    {{element.title}}
                                                </template>
                                            </card>
                                    </div>
                            </div>
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

]

  export default {
    components: {
        Modal
    },
    data () {
        return {
            user: '...',
            cardsLinks: cardsData,
            // cardsEventsLinks: cardsEventData, 
            
            payments: [
            
            ],

            events: [
                
            ],

            memberships: {
               
            },

            following: [

            ],
            
            tickets: {
                
            }
        }
    },
    methods: {

        goTo(url)
        {   
            window.location.href = url
        },

        async retrieveMembership () {
        this.user = this.$store.state.userDetails.firstName
        const cards = this.$store.dispatch('getMemberships')
            .then(function (data) {
            const cardsData = []
            for (var i = 0; i < data.length; i++) {
                
                const card = {
                title: '',
                caption: '',
                details: '',
                link: ''
            }
                card.title = data[i].name
                card.caption = data[i].details
            card.url = '/profile/' + data[i].userlink
            cardsData.push(card)
            }
                return cardsData
            })
        this.following = await cards
        
        console.log('cardscheckfollowing:', this.following)
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

        console.log('paymentcheck:', this.payments)
        },
        
        async retrieveMembershipTypes () {
            const cards = this.$store.dispatch('getMembershipsTypesUser')
            .then(function (data) {
            const cardsData = []
            for (var i = 0; i < data.length; i++) {
                
                const card = {
                title: '',
                caption: '',
                details: '',
                link: ''
            }
                card.title = data[i].name
                card.caption = data[i].type
            card.url = '/profile/' + data[i].userlink
            cardsData.push(card)
            }
                return cardsData
            })
        this.memberships = await cards
        console.log('cardscheckmembos:', this.memberships)
        },


        async goLoad () {
            console.log('loading:', this.$store.state.userDetails.email)
            if (this.$store.state.userDetails.email === undefined){
                  setTimeout(() => this.goLoad(), 50) 
            } else {
                this.retrieveMembership()
                this.retrieveMembershipTypes()
                this.retrieveEvents()
                this.retrieveEventsTickets()
                this.retrievePayments()
            } 
        },

        async retrieveEventsTickets () {
            const cards = this.$store.dispatch('getEventTickets')
            .then(function (data) {
            const cardsData = []
            for (var i = 0; i < data.length; i++) {
                
                const card = {
                title: '',
                caption: '',
                details: '',
                link: ''
            }
                card.title = data[i].event_name
                card.caption = data[i].type
            card.url = '/profile/' + data[i].userlink
            cardsData.push(card)
            }
                return cardsData
            })
        this.tickets = await cards
        console.log('cardschecktickets:', this.tickets)
        },

        // 1. Get following club events
        // 2. Get subscribed club memberships
        // 3. Get tickets owned by user
        // 4. Get following club profile pages.

    async retrieveEvents () {
            const eventsarray = this.$store.dispatch('getEvents')
            .then(function (data) {
                
                const ArEvents = []
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i].details)
                    const card = {
                        id: '',
                        name: '',
                        date: '',
                        event_description: ''
                    }
                card.id = data[i].id
                card.name = data[i].event_name
                card.date = new Date(data[i].date_created.seconds * 1000)
                card.event_description = data[i].event_description
                card.url = '/event/' + data[i].id
                ArEvents.push(card)
                }
                    return ArEvents
                })
            this.events = await eventsarray
        },

    },
    created() {
       this.goLoad()
    }
  }
</script>

<style>
#userdashboardbg {
    background: linear-gradient(180deg, rgba(36,37,70,1) 0%, rgba(112,79,112,1) 59%, rgba(205,104,64,1) 100%) !important;
}
#userdashboardbgdiv{
    height: 100vh;
}
</style>
