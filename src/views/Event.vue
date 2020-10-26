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
            <h1>
              {{ event_name }}
              <div><i class="fade"></i><p>#{{ $route.params.id }}</p></div>
              <span class="font-weight-light"></span>
            </h1>
            <div class="h6 mt-4">
              <i class="ni business_briefcase-24 mr-2"></i>{{ society_name }}
            </div>
            <div class="mb-2"><i class="ni education_hat mr-2"></i>{{ university }} University</div>
            <div class="h6 mt-4">
            <ShareNetwork
                    network="facebook"
                    url="https://sociit.web.app"
                    :title="society_name"
                    :description="description"
                    :quote="description"
                    :hashtags="'sociit,' + society_name"
                    class="text-center"
                  >
                  <base-button
                    type="primary"
                    size="sm"
                    class="btn btn-1 btn-primary text-center"
                    >Share on Facebook</base-button
                  >
              </ShareNetwork>
              </div>
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
                        <modal link="none" :cardname="event_name + ' Ticket'" :description="description" :price="'$'+ price">
                          <template slot="modal-button-wrapper">
                            <card
                              class="card-options--hover shadow"
                              link="url"
                              img="/img/theme/lcard.png"
                            >
                              <template slot="footer">
                                Get Ticket
                              </template>
                            </card>
                          </template>
                        </modal>
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
      event_name: "...",
      society_name: "Society",
      location: "Location",
      university: "University",
      price: 0,
      capacity: 0,
      catering: false,
      membersOnly: false,
      date: '',
      start_time: '',
      end_time: '',
      description:
        "",
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
      this.description= event.event_description;
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
      this.$forceUpdate();

      const club = await this.$store.dispatch(
        "getClubEventDetails",
        this.club
      )
      .then(function (data) {
          return data;
        });
        this.university = club.university
        this.society_name = club.title
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
