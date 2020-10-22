<template>
    <div class="profile-page">
        <!-- <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section> -->
        <section class="section-profile-cover section-shaped my-0">
        <img v-lazy="'/img/theme/qutlscover.jpg'" class="col-12"/>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'/img/theme/QUTLS 2020.png'" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <button type="default" size="sm" class="btn btn-1 btn-primary" @click="addToClub">Follow</button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{followers}}</span>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{up_coming_events}}</span>
                                        <span class="description">Events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{society_name}}
                                <span class="font-weight-light"></span>
                            </h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{location}}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{subtitle}}</div>
                            <div><i class="ni education_hat mr-2"></i>{{university}}</div>
                            <div><i class="fade"></i>#{{$route.params.id}}</div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Bio </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p>{{bio}}</p>
                                    <a href="#">Show more</a>
                                    
                                </div>
                            </div>
                        </div>
                        <!-- To do:
                            - Turn cards into a component
                            - Make cards all the same size/dimensions in CSS
                            - Validate the images people upload and scale etc so that they're within the card and ticket dimensions
                            - Create a colour/image generator for blank cards (where a user has provided no image)
                            - Ability to remove add sections
                         -->
                        <!-- Vue-if statement. Are there tickets to display for this society that are available for purchase? -->
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Events </div>
                            <div class="row justify-content-center">
                                    <div class="col-md-6 mb-3" v-for="cards in eventData" v-bind:key="cards.title">
                                        <card class="card-options--hover shadow" :link="cards.link" :img="cards.image">
                                            <template slot="header">
                                                {{cards.title}}
                                            </template>
                                        </card>
                                    </div>
                                    <button @click="pay">pay</button>
                            </div>
                        </div>
                        <!-- Vue-if statement. Are there memberships to display for this society that are available for purchase? -->
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Memberships </div>
                            <div class="row justify-content-center">
                                    <div class="container container-lg">
                                        <div class="row">
                                            <div class="col-md-6 mb-5 mb-md-3">         
                                                
                                                    
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 mb-3" v-for="cards in membershipData" v-bind:key="cards.title">
                                                <modal>
                                                    <template slot="modal-button-wrapper">
                                                        <card class="card-options--hover shadow" :link="cards.link" :img="cards.image">
                                                            <template slot="header">
                                                                {{cards.title}}
                                                            </template>
                                                        </card>
                                                    </template>
                                                </modal>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import Modal from "./components/JavascriptComponents/Purchase.vue";
import store from 'main'
import router from '../router'
import axios from 'axios'
const Stripe = require('stripe')

var stripe = Stripe('pk_test_51HXhlkFstnSXI8cOMPrnlik0YSKVWKFf6AsDEp4EkVHicnxJ1yrvfcSAMgsF1yjgSEFWzobOLxbgt4JwLiAPe5VB00qt7OnWrF')

export default {
name: "components",
components: {
    Modal,
},
data() {
    return {
        sessionId:'',
        followers: 22,
        up_coming_events: 10,
        society_name: "QUT Law Society",
        subtitle: "Law Society",
        location: "Brisbane, Queensland",
        university: "Queensland University of Technology",
        bio: "An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
    
        eventData: 
            [
          {
            title: 'Event Title 1',
            image: '/img/theme/lcard.png',
            link: '/event/',
          },
          {
            title: 'Event Title 2',
            image: '/img/theme/lcard.png',
            link: '/event/',
          },
        ],

        membershipData: 
            [
          {
            title: 'Membership Title 1',
            image: '/img/theme/lcard.png',
            link: '/event/',
          },
        ],
    };
// need to pass data 'down the tree' 
// card image, card title, etc --> modal (Purchase.vue)
},
methods: {

    async checkUserPage () {
      const check = await this.$store.dispatch('checkUser', this.$route.params.id)
      if (check !== 'in') {
        router.push('/')
      } else {
        this.name = this.fullname
      }
    },

    async addToClub () {
        if (this.$store.userDetails.type = 'user'){
            const check = this.$store.dispatch('joinClubCode', this.$route.params.id)
            const result = await check.then(function (defs, messageError) {
                return defs
            })
            console.log(result)
        }
    },

    async pay () {
        
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
    }
  },
  computed: {
      fullname() {
          return this.$store.state.userDetails.firstName + ' ' + this.$store.state.userDetails.lastName
      }
  },
    created () {
    //this.checkUserPage()
    console.log('profile')
    axios.post('')
        .then(response => {
            this.sessionId = response.data
            console.log('Response:', response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        })
  }
}
</script>
<style>
</style>
