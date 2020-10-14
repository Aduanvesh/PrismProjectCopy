<template>
    <div class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
           <p class="h1" style="color: white;"> Hi, {{user}} </p>
                <div class="col-12 offset-10">
                    <tabs :fill="false" circle>
                        <tab-pane>
                            <a href="/profile/undefined">Go to profile</a>
                            <span slot="title" class="nav-link-icon d-block"><i class="ni ni-atom"></i></span>
                        </tab-pane>
                        <tab-pane>
                            <a href="/kiosk/undefined/">Go to Kiosk Mode</a>
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
                            <p> Needs to display a card for each item in database for which the user follows </p>
                            <li v-for="cards in cardsLinks" v-bind:key="cards.title"> {{cards.title}} ({{cards.details}}) </li>
                    </tab-pane>

                    <tab-pane key="tab2">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Events
                        </template>
                            <div class="row">
                                            <div class="col-auto mr-auto">Upcoming</div>
                                            <!-- <div class="col-auto mb-3"> -->
                                                <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-edit"></base-button>
                                                <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-plus"></base-button>
                                            <!-- </div> -->
                                            </div>
                            <div class="row">
                                    <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                            </div>
                            <div class="row pt-5">
                                <p> Following </p>
                                <div class="col-md-6 mb-5 mb-md-0"></div>
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
                                        <!-- Card Element (V-for each) -->
                                        <div class="col-md-6 mb-3">
                                            <div class="card card-lift--hover shadow border-0">
                                            <router-link to="/profile" title="Profile Page">
                                                <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                            </router-link>   
                                            </div>
                                        </div>
                                        <!-- End card element -->
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
                                            <div class="col-auto mr-auto">My Tickets</div>
                                            <!-- <div class="col-auto mb-3"> -->
                                                <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-edit"></base-button>
                                            <!-- </div> -->
                                        </div>
                                        <div class="row">
                                            <!-- Card Element (V-for each) -->
                                            <div class="col-md-6 mb-3">
                                                <div class="card card-lift--hover shadow border-0">
                                                <router-link to="/profile" title="Profile Page">
                                                    <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                </router-link>   
                                                </div>
                                            </div>
                                            <!-- End card element -->
                                            <!-- Card Element (V-for each) -->
                                            <div class="col-md-6 mb-3">
                                                <div class="card card-lift--hover shadow border-0">
                                                <router-link to="/profile" title="Profile Page">
                                                    <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                </router-link>   
                                                </div>
                                            </div>
                                            <!-- End card element -->
                                            <!-- Card Element (V-for each) -->
                                            <div class="col-md-6 mb-3">
                                                <div class="card card-lift--hover shadow border-0">
                                                <router-link to="/profile" title="Profile Page">
                                                    <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                </router-link>   
                                                </div>
                                            </div>
                                            <!-- End card element -->
                                        </div>
                                            <div class="row pt-5">
                                                <p class="col-md-6 mb-5 mb-md-3"> My Tickets </p>
                                            </div>
                                                <div class="row">
                                                <!-- Card Element (V-for each) -->
                                                <div class="col-md-6 mb-3">
                                                    <div class="card card-lift--hover shadow border-0">
                                                    <router-link to="/profile" title="Profile Page">
                                                        <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                    </router-link>   
                                                    </div>
                                                </div>
                                                <!-- End card element -->
                                                <!-- Card Element (V-for each) -->
                                                <div class="col-md-6 mb-3">
                                                    <div class="card card-lift--hover shadow border-0">
                                                    <router-link to="/profile" title="Profile Page">
                                                        <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                    </router-link>   
                                                    </div>
                                                </div>
                                                <!-- End card element -->
                                        </div>
                    </tab-pane>
                    <tab-pane key="tab5">
                        <template slot="title">
                            <i class="fa fa-users mr-2"></i>Membership list
                        </template>
                        <h5> Membership List</h5>
                               <div class="container-fluid mt--7">
                                    <div class="row">
                                        <div class="col">
                                            <projects-table title="Light Table"></projects-table>
                                        </div>
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
import ProjectsTable from './Tables/ProjectsTable'

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
    name: 'tables',
    components: {
      ProjectsTable
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
