<template>
  <div class="profile-page">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-primary"
      style="
        min-height: 600px;
        background-image: url(/img/theme/cloudland.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
    </base-header>
    <div class="container">
      <card shadow class="card-profile mt-300" no-body>
        <div class="px-4">
          <div class="text-center pt-5">
            <h3>
              {{ event_name }}
              <span class="font-weight-light"></span>
            </h3>
            <div class="h6 font-weight-300">
              <i class="ni location_pin mr-2"></i>{{ location }}
            </div>
            <div class="h6 mt-4">
              <i class="ni business_briefcase-24 mr-2"></i>{{ society_name }}
            </div>
            <div><i class="ni education_hat mr-2"></i>{{ university }}</div>
            <div><i class="fade"></i>#{{ $route.params.id }}</div>
          </div>
          <div class="mt-5 py-5 border-top text-center">
            <div class="h6">Description</div>
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <p>{{ description }}</p>
              </div>
            </div>
            <div class="h6">Location: <p>{{ location }}</p> </div>
            <div class="h6">Date: <p>{{ date }}</p> </div>
            <div class="h6">Time: <p>{{ start_time }} - {{ end_time }}</p> </div>
          </div>
          <!-- To do:
                            - Turn cards into a component
                            - Make cards all the same size/dimensions in CSS
                            - Validate the images people upload and scale etc so that they're within the card and ticket dimensions
                            - Create a colour/image generator for blank cards (where a user has provided no image)
                            - Ability to remove add sections
                         -->
          <div class="mt-5 py-5 border-top text-center">
            <div class="h6">Tickets</div>
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <div class="container container-lg">
                  <div class="row">
                    <div class="col-md-6 mb-5 mb-md-0">
                      <div class="card shadow border-0">
                        <modal></modal>
                      </div>
                    </div>
                    <div class="col-md-6 mb-5 mb-lg-0">
                      <div class="card card-lift--hover shadow border-0">
                        <img v-lazy="'/img/theme/lcard.png'" class="card-img" />
                        <!-- <router-link to="/profile" title="Profile Page">
                                                        
                                                    </router-link>   -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import Modal from "./components/JavascriptComponents/Purchase.vue";
import store from "main";
import router from "../router";

export default {
  name: "components",
  components: {
    Modal,
  },
  data() {
    return {
      event_name: "Law Ball",
      society_name: "QUT Law Society",
      location: "Brisbane, Queensland",
      university: "Queensland University of Technology",
      price: 100,
      capacity: 50,
      catering: false,
      membersOnly: false,
      date: '',
      start_time: '',
      end_time: '',
      description:
        "An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
    };
    // need to pass data 'down the tree'
    // card image, card title, etc --> modal (Purchase.vue)
  },
  methods: {
    async getEventDetails() {
      const event = await this.$store.dispatch(
        "getEventDetails",
        this.$route.params.id
      )
      .then(function (data) {
          return data;
        });
      this.description = event.event_description;
      this.event_name = event.event_name;
      this.location = event.location;
      this.price = event.price;
      this.capacity = event.capacity
      this.catering = event.catering
      this.date = event.date
      this.date_created = event.date_created
      this.start_time = event.startTime
      this.end_time = event.endTime
      this.membersOnly = event.membersOnly
      this.club = event.linked_account
      console.log("lolma", this.society_name);
    },
  },
  computed: {
    fullname() {
      return (
        this.$store.state.userDetails.firstName +
        " " +
        this.$store.state.userDetails.lastName
      );
    },
  },
  created() {
    console.log("events");
    this.getEventDetails()
  },
};
</script>
<style>
</style>
