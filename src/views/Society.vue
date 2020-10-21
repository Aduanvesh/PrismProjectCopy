<template>
    <div class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
           <p class="h1" style="color: white;"> Hi, {{user}} </p>
                <div class="col-12 offset-10">
                    <tabs :fill="false" circle>
                        <tab-pane>
                            <a @click="goProfile">Go to profile</a>
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
                            <i class="fa fa-university mr-2"></i>{{user}}
                        </template>
                                <div class="row">
                                    <!-- <base-switch v-model="switches.membershipsVisible"></base-switch> -->
                                    <div class="col-auto mr-auto mb-3">Edit Page</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <router-link to="/profile/cPcBCPXhnVPTonoVOQtyrCF0MNh1">
                                        <card class="card-options--hover shadow" link="/profile/cPcBCPXhnVPTonoVOQtyrCF0MNh1" img="/img/theme/qutlscover.jpg">
                                            <template slot="footer">
                                                {{user}} Page
                                            </template>
                                        </card>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="row">
                                    <!-- <base-switch v-model="switches.membershipsVisible"></base-switch> -->
                                    <div class="col-auto mr-auto mt-3">Active Memberships</div>
                                        <base-button outline class="btn-2 col-auto mb-3 mt-3" type="primary" icon="fa fa-plus"></base-button>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="cards in cardsLinks" v-bind:key="cards.title">
                                        <card class="card-options--hover shadow" options="true" :link="cards.link" :img="cards.image">
                                            <template slot="header">
                                                {{cards.title}}
                                            </template>
                                        </card>
                                    </div>
                                </div>
                    </tab-pane>

                    <tab-pane key="tab2">
                        <template slot="title">
                            <i class="ni ni-calendar-grid-58 mr-2"></i>Events
                        </template>
                                <!-- TITLE row controls: i.e. 'Tickets' ... 'Edit/Add/Delete' -->
                                <div class="row">
                                    <div class="col-auto mr-auto">Active Events</div>
                                    <!-- <div class="col-auto mb-3"> -->
                                        <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-plus"></base-button>
                                    <!-- </div> -->
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="cards in cardsLinks" v-bind:key="cards.title">
                                        <card class="card-options--hover shadow" options="true" :link="cards.link" :img="cards.image">
                                            <template slot="header">
                                                {{cards.title}}
                                            </template>
                                        </card>
                                    </div>
                                </div>
                                    <div class="row pt-5">
                                        <div class="col-md-6 mb-5 mb-md-3"> Past Events </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <card class="card-options--hover shadow" options="true" link="/event/undefined" img="/img/theme/lcard.png">
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
                   <!-- <tab-pane key="tab4">
                        <template slot="title">
                            <i class="fa fa-qrcode mr-2"></i>Tickets
                        </template>
                                        TITLE row controls: i.e. 'Tickets' ... 'Edit/Add/Delete'
                                        <div class="row">
                                            <div class="col-auto mr-auto">Active Tickets</div>
                                            <div class="col-auto mb-3"> 
                                                <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-plus"></base-button>
                                            </div> 
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3" v-for="cards in cardsLinks" v-bind:key="cards.title">
                                                <card class="card-options--hover shadow" options="true" :link="cards.link" :img="cards.image">
                                                    <template slot="header">
                                                        {{cards.title}}
                                                    </template>
                                                </card>
                                            </div>
                                        </div>
                                            <div class="row pt-5">
                                                <div class="col-md-6 mb-5 mb-md-3"> Past Tickets </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-3">
                                                    <card class="card-options--hover shadow" options="true" link="/event/undefined" img="/img/theme/lcard.png">
                                                    </card>
                                                </div>
                                            </div>
                    </tab-pane> -->
                    <tab-pane key="tab5">
                        <template slot="title">
                            <i class="fa fa-users mr-2"></i>Membership list
                        </template>
                        <h5> Membership List</h5>
                               <div>
                                   <table style="width:75%">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>University</th>
                                    </tr>
                                    <tr v-for="member in memberlist" v-bind:key="member.id">
                                        <th>{{member.first_name}} {{member.last_name}} &nbsp;</th>
                                        <th>{{member.email}}&nbsp;</th>
                                        <th>{{member.phone_1}}&nbsp;</th>
                                        <th>{{member.university}}</th>
                                    </tr>
                                    </table>
                                   <!-- <div class="row">
                                        <div class="col">
                                            <projects-table title="Light Table"
                                            img="String"
                                            first_name="TESTTTEST"
                                            budget="String"
                                            status="String"
                                            statusType="String"
                                            completion= "String"
                                            ></projects-table>
                                        </div>
                                    </div> -->
                               </div>
                    </tab-pane>
                </card>
            </tabs>
        </div>
    </div>  
</template>

<script>
// import cards has been replaced with a new 'SocietyCard' component made by me.
// import Cards from '../views/components/Cards.vue'
import SocietyCard from '../components/SocietyCard.vue'
import store from 'main'
//import ProjectsTable from './Tables/ProjectsTable'
import router from '../router'


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
      //ProjectsTable
    },

    data () {
        return {
        user: 'Code Network', //return actual user's name i.e. 'QUTLS'
        cardsLinks: cardsData,
        memberlist: 
            [
          {
            img: '/img/theme/bootstrap.jpg',
            first_name: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
        ],

        switches: {
            membershipsVisible: false,
            
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
        },
        
        async getMembers () {
            const clubMembers = await this.$store.dispatch('getClubMembers')
            this.memberlist = clubMembers
            console.log('membercheck:', this.memberlist)
            
        },

        async goProfile () {
            console.log('test123')
            this.$router.push("/profile/" + this.$store.state.userDetails.id)
        }
    },
    created() {
        //setTimeout(() => this.retrieveMembership(), 5000)
        setTimeout(() => this.getMembers(), 5000) 
    }
  }
  
</script>

<style></style>
