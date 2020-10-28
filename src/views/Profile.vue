<template>
  <div class="profile-page">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-primary"
      style="
        min-height: 600px;
        background-image: url(/img/theme/img-2-1200x1000.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
    </base-header>
    <div class="container">
      <card shadow class="card-profile mt--300" no-body>
        <div class="px-4">
          <div class="row justify-content-center">
            <div class="col-lg-3">
              <div class="card-profile-image">
                <a href="#">
                  <img
                    :src="profilePic"
                    class="avatar-xl rounded-circle"
                  />
                </a>
              </div>
            </div>
            <!-- <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center col-12 col-sm-6 col-sm">
                                <div class="card-profile-actions py-4 mt-lg-0"> -->
            <div class="container pt-5">
              <div class="row justify-content-between">
                <div class="col-auto mr-auto">
                  <base-button
                    type="default"
                    size="sm"
                    class="btn btn-1 btn-primary"
                    @click="addToClub"
                    >Follow</base-button
                  >
                  <ShareNetwork
                    network="facebook"
                    url="https://sociit.web.app"
                    :title="society_name"
                    :description="bio"
                    :quote="bio"
                    :hashtags="'sociit,' + society_name"
                  >
                  <base-button
                    type="blue"
                    size="sm"
                    class="btn btn-1 btn-primary"
                    >Facebook</base-button
                  >
                </ShareNetwork>
                </div>
                <div class="col-auto">
                  <base-button
                    type="default"
                    size="sm"
                    class="btn btn-1 btn-primary"
                    @click="scrollPage('events')"
                    >View Events</base-button
                  >
                </div>
              </div>
            </div>
            <!-- </div>
                            </div> -->
            <div class="col-lg-4 order-lg-1 pt-lg-5 pt-4 pt-md-3">
              <div class="card-profile-stats d-flex justify-content-center">
                <div>
                  <span class="heading">{{ memberlist.length }}</span>
                  <span class="description">Followers</span>
                </div>
                <div>
                  <span class="heading">{{ up_coming_events }}</span>
                  <span class="description">Events</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-2">
            <h3>
              {{ society_name }}
              <span class="font-weight-light"></span>
            </h3>
            <div class="h6 mt-4">
              <i class="ni business_briefcase-24 mr-2"></i>{{ subtitle }}
            </div>
            <div><i class="ni education_hat mr-2"></i>{{ university }}</div>
            <div><i class="fade"></i>#{{ $route.params.id }}</div>
          </div>
          <div class="mt-5 py-5 border-top text-center">
            <div class="h6">Description</div>
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <p>{{ bio }}</p>
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
            <div class="h6 mb-4 mb-lg-5" id="events">Events</div>
            <div class="row justify-content-center">
              <div
                class="col-md-6 mb-3"
                v-for="cards in eventData"
                v-bind:key="cards.title"
                @click="goToEvent(cards.link)"
              >
                <card
                  class="card-options--hover shadow"
                  :link="cards.link"
                  :img="cards.image"
                >
                  <template slot="header">
                    {{ cards.title }}
                  </template>
                </card>
              </div>
            </div>
          </div>
          <!-- Vue-if statement. Are there memberships to display for this society that are available for purchase? -->
          <div class="mt-5 py-5 border-top text-center">
            <div class="h6 mb-4 mb-lg-5">Memberships</div>
            <div class="row justify-content-center">
              <div class="row">
                <div class="col-md-6 mb-5 mb-md-3"></div>
              </div>
              <div
                class="col-md-6 mb-3"
                v-for="cards in membershipData"
                v-bind:key="cards.title"
              >
                <modal :link="cards.link">
                  <template slot="modal-button-wrapper">
                    <card
                      class="card-options--hover shadow"
                      :link="cards.link"
                      :img="cards.image"
                    >
                      <template slot="header">
                        {{ cards.title }}
                      </template>
                    </card>
                  </template>
                </modal>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import VueSocialSharing from 'vue-social-sharing';
import Modal from "./components/JavascriptComponents/Purchase.vue";
import store from "main";
import router from "../router";
import axios from "axios";
const Stripe = require("stripe");

var stripe = Stripe(
  "pk_test_51HXhlkFstnSXI8cOMPrnlik0YSKVWKFf6AsDEp4EkVHicnxJ1yrvfcSAMgsF1yjgSEFWzobOLxbgt4JwLiAPe5VB00qt7OnWrF"
);

export default {
  name: "components",
  components: {
    Modal,
  },
  data() {
    return {
      sessionId: "",
      followers: 0,
      up_coming_events: 0,
      society_name: '',
      subtitle: '',
      profilePic: '/img/theme/profile.jpg',
      university: "Queensland University of Technology",
      bio:
        "An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
      memberlist: [],
      eventData: [
        {
          title: "Event Title 1",
          image: "/img/theme/lcard.png",
          link: "/event/",
        },
        {
          title: "Event Title 2",
          image: "/img/theme/lcard.png",
          link: "/event/",
        },
      ],

      membershipData: [
        {
          title: "Membership Title 1",
          image: "/img/theme/lcard.png",
          id: "1231245",
        },
      ],
    };
    // need to pass data 'down the tree'
    // card image, card title, etc --> modal (Purchase.vue)
  },
  methods: {
    scrollPage(div) {
      window.location.href = "#" + div;
    },

    async goToEvent(url) {
      this.$router.push(url);
    },

    async addToClub() {
      if ((this.$store.state.userDetails.type = "user")) {
        const check = this.$store.dispatch(
          "joinClubCode",
          this.$route.params.id
        );
        const result = await check.then(function (defs, messageError) {
          return defs;
        });
        console.log(result);
      }
    },

    async goLoad() {
      console.log("loading:", this.$store.state.userDetails.email);
      if (this.$store.state.userDetails.email === undefined) {
        setTimeout(() => this.goLoad(), 50);
      } else {
         
      }
    },

    async getDetails() {
      const clubDetails = await this.$store
        .dispatch("getClubDetails", this.$route.params.id)
        .then(function (data) {
          return data;
        });
      this.society_name, this.society_name = clubDetails.name;
      console.log(this.$store.state.userDetails.profile_img);
      this.profilePic = this.$store.state.userDetails.profile_img;
      this.subtitle, this.subtitle = clubDetails.details;
      this.up_coming_events = clubDetails.events.length;
      this.bio = clubDetails.description;
      console.log("lolma", this.society_name);
      this.$forceUpdate();
    },

    async getMembers() {
         console.log('break:', this.$route.params.id)
      const clubMembers = await this.$store.dispatch(
        "getClubMembers",
        this.$route.params.id
      );
      this.memberlist = clubMembers;
      console.log("membercheck:", this.memberlist);
    },

    async retrieveMemberships() {
      const cards = this.$store
        .dispatch("getMembershipTypes", this.$route.params.id)
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
                return cardsData*/ console;
          const cardsData = [];
          const card = {};
          card.title = data.name;
          card.caption = data.description;
          card.price = data.price;
          card.members = data.members;
          card.image = "/img/theme/lcard.png";
          card.link = data.link;
          cardsData.push(card);
          return cardsData;
        });
      this.membershipData = await cards;

      console.log("cardscheckmembers:", this.membershipData);
    },

    async retrieveEvents() {
       
      const eventCards = await this.$store
        .dispatch("getClubEvents", this.$route.params.id)
        .then(function (data) {
          const cardsData = [];
          for (var i = 0; i < data.length; i++) {
            const card = {
              capacity: "",
              date: "",
              date_created: "",
              dietr: false,
              endTime: "",
              event_description: "",
              event_name: "",
              id: "",
              location: "",
              memberonly: false,
              price: "",
              startTime: "",
              url: "",
            };
            if (
              data[i].event_name === undefined ||
              data[i].event_name === "" ||
              data[i].event_name === null
            ) {
              card.title = "Untitled Event";
            } else {
              card.title = data[i].event_name;
            }
            card.event_description = data[i].event_description;
            card.link = "/event/" + data[i].id;
            card.id = data[i].id;
            card.image = "/img/theme/lcard.png";
            card.date_created = data[i].date_created;
            cardsData.push(card);
          }
          return cardsData;
        });
      this.eventData = await eventCards;
      console.log("eventcardscheck:", this.eventData);
    },

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
      return (
        this.$store.state.userDetails.firstName +
        " " +
        this.$store.state.userDetails.lastName
      );
    },

     isUser () {
          if (this.$store.state.userDetails.type === 'club') {
              return false
          } else {
              return true
          }
          
      }

  },
  created() {
     this.getMembers();
        this.getDetails();
        this.retrieveMemberships();
        this.retrieveEvents();
    /*axios.post('')
        .then(response => {
            this.sessionId = response.data
            console.log('Response:', response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        })*/
  },
};
</script>
<style>
</style>
