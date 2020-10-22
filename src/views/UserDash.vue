<template>
    <div class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
           <p class="h1" style="color: white;"> Hi, {{this.user}} </p>
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
                        <div class="col-auto mr-auto mt-3 mb-3">Following</div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in following" v-bind:key="element.uid">
                                            <!-- <card class="card-options--hover shadow" :link="element.recentEvent.url" img="/img/theme/lcard.png" :name="element.recentEvent.name"> -->
                                                <card class="card-options--hover shadow" img="/img/theme/lcard.png"> 
                                                <template slot="header">
                                                    {{element.name}}
                                                </template>
                                                <template slot="footer">
                                                    <div class="d-flex flex-row">
                                                        {{element.caption}}
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
                        <h5> Payments</h5>
                        <div class="row">
                            <div class="col-3">
                                <card>Item 1</card>
                                <card>Item 2</card>
                                <card>Item 3</card>
                                <card>Item 4</card>
                        </div>
                        <div class="col-9">
                                <card style="height: 100%;">
                                <card>Law Ball Ticket: $100</card>
                                <card>Refund: $50</card>
                                </card>
                        </div>
                        </div>
                    </tab-pane>
                    <tab-pane key="tab4">
                        <template slot="title">
                            <i class="fa fa-qrcode mr-2"></i>Tickets
                        </template>
                            <div class="row">
                            <div class="col-auto mr-auto mt-3 mb-3">My Memberships</div>
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
        Modal
    },
    data () {
        return {
            user: '...',
            cardsLinks: cardsData,
            // cardsEventsLinks: cardsEventData, 
            
            events: [
                {
                    name: 'Law Ball',
                    url: '/event',
                    id: '123'        
                }
            ],

            memberships: {
                membership: {
                    name: 'L Card',
                    type: '',
                    price: '',
                    details: ''
                },
            },

            following: [
                 {
                    name: 'QUTLS',
                    id: '123',
                    recentEvent: 
                    {
                        name: 'Law Ball',
                        url: '/event'
                    }
                },
                {
                    name: 'Code Network',
                    id: '234',
                    recentEvent: 
                    {
                        name: 'Code Network Evening',
                        url: '/event'
                    }
                }
            ],
            //Subscribed means: has membership to
            subscribed: {
                club: {
                    name: 'QUTLS',
                    url: '/',
                    event: {
                            name: 'My rad event',
                            date: '15/11/20',
                            url: '/'
                    }
                }
            },

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
                console.log('lol:', data)
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
            if (data[i].memberCount === 1) {
                card.details = '1 member'
            } else {
                card.details = data[i].memberCount + ' members'
            }
            card.url = '/profile/' + data[i].userlink
            cardsData.push(card)
            }
                return cardsData
            })
        this.following = await cards
        
        console.log('cardscheck:', this.following)
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
            } 
        },

        async retrieveEventsTickets () {
            const cards = this.$store.dispatch('getEventTickets')
            .then(function (data) {
            console.log('lolt234234234:', data)
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

<style></style>
