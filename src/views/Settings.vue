<template>
    <div class="profile-page">
        <div class="shape shape-style-1 bg-secondary">
            <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-gradient-default"
                     style="min-height: 600px; background-size: cover; background-position: center top;">
            </base-header>
            <div class="container">
                <card shadow class="card-profile mt--300 mb-5 pb-5" type="secondary" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'/img/theme/QUTLS 2020.png'" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                                <div class="container pt-5">
                                    <div class="row justify-content-between">
                                        <div class="col-auto mr-auto">
                                            <base-button type="default" size="sm" class="btn btn-1 btn-primary">Change Banner</base-button>
                                        </div>
                                    </div>
                                </div>
                            <div class="col-lg-4 order-lg-1 pt-lg-5 pt-4 pt-md-3">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{memberlist.length}}</span>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{up_coming_events}}</span>
                                        <span class="description">Events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-2 mb-4">
                            <h3>{{society_name}}
                                <span class="font-weight-light"></span>
                            </h3>
                            <div class="pl-lg-4">
                            <base-input alternative=""
                                        label="Subtitle"
                                        :placeholder="subtitle"
                                        input-classes="form-control-alternative"
                                        v-model="model.subtitle"
                                        class="p-1"
                            />
                            </div>
                            <div class="pl-lg-4">
                                <base-input alternative=""
                                            label="University"
                                            placeholder="University"
                                            input-classes="form-control-alternative"
                                            v-model="model.university"
                                            class="p-1"
                                />
                            </div>
                        </div>
                                    <div class="pl-lg-4 text-center">
                                        <base-input alternative=""
                                                    class="p-1"
                                                    label="Bio"
                                                    >
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ..."></textarea>
                                        </base-input>
                                    </div>
                    </div>
                    <!-- INSERTION -->
                </card>
                <div class="">
                    <card shadow type="secondary">
                        <div slot="header" class=" border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Account Settings</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted">Sociit Settings</h6>
                                <div class="pb-4">
                                    <label> Theme Colour </label>
                                    <div class="row">
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-primary text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-info text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-success text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-warning text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-danger text-white" icon="" rounded icon-only></base-button>
                                        </div> 
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" class="bg-gradient-gray text-white" icon="" rounded icon-only></base-button>
                                        </div>                                         
                                    </div>
                                </div>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.firstName"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.lastName"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="" />
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Home Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.city"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Country"
                                                        placeholder="Country"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.country"
                                                        class="p-1"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                                        class="p-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="" />
                                <!-- Description -->
                                <base-button type="default" class="btn btn-1 btn-primary">Save Changes</base-button>
                                <base-button type="secondary" class="btn btn-1 btn-primary">Cancel</base-button>
                                <p> CHANGES ARE NOT SHOWING Up!!!!!! </p>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Modal from "./components/JavascriptComponents/Purchase.vue";
import store from 'main'
import router from '../router'
// import axios from 'axios'
// const Stripe = require('stripe')

export default {
name: "components",
components: {
    Modal,
},
data() {
    return {
        sessionId:'',
        followers: 0,
        up_coming_events: 0,
        society_name: "QUT Law Society",
        subtitle: "Law Society",
        university: "Queensland University of Technology",
        bio: "",
        memberlist: [],
        model: {
          username: '',
          university: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
          subtitle: '',
        }
    };
},
methods: {

    async addToClub () {
        if (this.$store.userDetails.type = 'user'){
            const check = this.$store.dispatch('joinClubCode', this.$route.params.id)
            const result = await check.then(function (defs, messageError) {
                return defs
            })
            console.log(result)
        }
    },

     async goLoad () {
            console.log('loading:', this.$store.state.userDetails.email)
            if (this.$store.state.userDetails.email === undefined){
                  setTimeout(() => this.goLoad(), 50) 
            } else {
                
            } 
        },

    async getDetails () {
        const clubDetails = await this.$store.dispatch('getClubDetails', this.$route.params.id)
            .then(function (data) { 
                return data
            })
        this.society_name = clubDetails.name
        this.subtitle = clubDetails.details
        this.up_coming_events = clubDetails.events.length
        this.bio = clubDetails.description
        console.log('lolma', this.society_name)
    },

    async getMembers () {
        const clubMembers = await this.$store.dispatch('getClubMembers', this.$route.params.id)
        this.memberlist = clubMembers
        console.log('membercheck:', this.memberlist)
    },

    async retrieveMemberships () {
    const cards = this.$store.dispatch('getMembershipTypes', this.$route.params.id)
        .then(function (data) {
                /*const cardsData = []
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].details)
                    const card = {
                        title: '',
                        caption: '',
                        price: '',
                        members: []
                    }
                    card.title = data[i].name
                    card.caption = data[i].description
                    card.price = data[i].price
                    card.members = data[i].members
                    cardsData.push(card)
                }
                return cardsData*/console
                const cardsData = []
                const card = {}
                card.title = data.name
                card.caption = data.description
                card.price = data.price
                card.members = data.members
                card.image = '/img/theme/lcard.png'
                card.link = data.link
                cardsData.push(card)
                return cardsData
            })
    this.membershipData = await cards
    
    console.log('cardscheckmembers:', this.membershipData)
    },
    
    async retrieveEvents () {
            const eventCards = this.$store.dispatch('getClubEvents', this.$route.params.id)
                .then(function (data) {
                const cardsData = []
                for (var i = 0; i < data.length; i++) {
                    const card = {
                        capacity: '',
                        date: '',
                        date_created: '',
                        dietr: false,
                        endTime: '',
                        event_description: '',
                        event_name: '',
                        id: '',
                        location: '',
                        memberonly: false,
                        price: '',
                        startTime: '',
                        url: ''
                    }
                    if (data[i].event_name === undefined || data[i].event_name === '' || data[i].event_name === null) {card.title = 'Untitled Event'}
                    else {card.title = data[i].event_name}
                    card.event_description = data[i].event_description
                    card.link = '/event/' + data[i].id
                    card.id = data[i].id
                    card.image = '/img/theme/lcard.png'
                    card.date_created = data[i].date_created                
                cardsData.push(card)
                }
                    return cardsData
                })
        this.eventData = await eventCards
        console.log('eventcardscheck:', this.eventData) 
    }

    /*async pay () {
        
        stripe.redirectToCheckout({ sessionId: this.sessionId })
            .then(function(result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using `error.message`.
            if (result.error) {
                alert(result.error.message);
            }
            })
            .catch(function(error) {
                console.error('Error:', error);
         });
    }*/
  },
  computed: {
      fullname() {
          return this.$store.state.userDetails.firstName + ' ' + this.$store.state.userDetails.lastName
      }
  },
    created () {
    this.getMembers()
    this.getDetails()
    this.retrieveMemberships()
    this.retrieveEvents()
    /*axios.post('')
        .then(response => {
            this.sessionId = response.data
            console.log('Response:', response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        })*/
  }
}
</script>
<style>
</style>
