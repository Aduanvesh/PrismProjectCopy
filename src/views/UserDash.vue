<template>
    <div :class="[gradient ? `bg-gradient-${gradient}` + ' section section-shaped section-lg my-0' : '','section section-shaped section-lg my-0']" id="userdashboardbgdiv">
    <!-- Background and shading -->

            <div
                v-if="!gradient"
                class="shape shape-style-1 bg-gradient-default"
                id="userdashboardbg"
            ></div>
    <!-- Hi, Section -->
    <div :class="[gradient ? `bg-gradient-${gradient}` + 'shape shape-style-1' : '','shape shape-style-1']"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
            <div class="container-fluid mb-3 mb-l-5">
                <div class="row">
                    <div class="col-auto mr-auto my-auto">
                        <h1 class="text-white text-nowrap">Hi, {{this.user}}</h1>
                    </div>
                    <div class="col-auto my-auto">
                        <!-- <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" icon="ni ni-atom" rounded icon-only></base-button>
                        <base-button tag="a" href="/kiosk" v-on:click="goProfile" type="secondary" icon="fa fa-qrcode" rounded icon-only></base-button> -->
                    </div>
                </div>
            </div>
    <!-- Tab Flex -->
           <tabs fill class="flex-column flex-md-row">
                <card shadow class="p-xl-5 p-lg-5 p-md-4 p-sm-3">
                    <!-- Tabs begin here -->
                    <tab-pane key="tab1">
                        <template slot="title"> 
                            <i class="fa fa-university mr-2"></i>Clubs and Societies
                        </template>
                                <div class="row">
                                    <div class="col-auto mr-auto mb-3">Following</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="element in following"  @click="goToPage(element.url)" v-bind:key="element.uid">
                                        <card class="card-lift--hover shadow" img="/img/theme/lcard.png">
                                            <template slot="header">
                                                {{ element.title }}
                                            </template>
                                            <template slot="footer">
                                                <div class="d-flex flex-row">
                                                    <i> {{ element.caption }} </i>
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
                                <!-- <div class="row"> -->
                                    <!--<div class="col-auto mr-auto mb-3">Upcoming for my Membership</div>
                                    </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3" v-for="element in subscribed" v-bind:key="element.id">
                                                    <card class="card-lift--hover shadow" :link="element.url" img="/img/theme/lcard.png" :name="element.name">
                                                        <template slot="header">
                                                            {{element.event.name}}
                                                        </template>
                                                    </card>
                                            </div>
                                        </div> -->
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            Events from pages you follow
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3"
                                             v-for="element in events"
                                             v-bind:key="element.id"
                                             @click="goToPage(element.url)"
                                        >
                                            <card
                                            class="card-lift--hover shadow"
                                            :link="element.url"
                                            img="/img/theme/lcard.png"
                                            :name="element.name"
                                            >
                                                <template slot="header">
                                                    {{ element.name }}
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
                        <div class="container">
                        <div class="row">
                           <table class="col" id="paymenttable">
                                            <tr>
                                                <th>Payment ID</th>
                                                <th>Status</th>
                                                <th>Payer</th>
                                                <th>Info</th>
                                                <th>Date Submitted</th>
                                                <th>Date Paid</th>
                                                <th>Amount</th>
                                            </tr>
                                            <tr v-for="payment in payments" v-bind:key="payment.id">
                                                <td>{{payment.id}}</td>
                                                <td>{{payment.status}}</td>
                                                <td>{{payment.payee}}</td>
                                                <td>{{payment.info}}</td>
                                                <td>{{payment.date1}}</td>
                                                <td>{{payment.date2}}</td>
                                                <td>{{payment.amount}}</td>
                                            </tr> 
                                </table>
                        </div>
                        </div>
                    </tab-pane>
                    <tab-pane key="tab4">
                        <template slot="title">
                            <i class="fa fa-users mr-2"></i>Tickets
                        </template>
                        <div class="row">
                                    <div class="col-auto mr-auto mb-3">My Premium Memberships</div>
                        </div>
                               <div class="container">
                                   <div class="row">
                                        <div
                                            class="col-md-6 mb-3"
                                            v-for="element in memberships"
                                            v-bind:key="element.title"
                                        >
                                                <card
                                                class="card-lift--hover shadow"
                                                img="/img/theme/lcard.png"
                                                :name="element.title"
                                                >
                                                <template slot="header">
                                                    {{ element.title }}
                                                </template>
                                                </card>
                                            </div>
                                   </div>
                               </div>
                                   <div class="row">
                                        <div class="col-md-6 mb-3">My Event Tickets</div>
                                   </div>
                                    <div class="row">
                                        <div
                                            class="col-md-6 mb-3"
                                            v-for="element in tickets"
                                            v-bind:key="element.title">
                                                <card
                                                class="card-lift--hover shadow"
                                                img="/img/theme/lcard.png"
                                                :name="element.title"
                                                >
                                                <template slot="header">
                                                    {{ element.title }}
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
//import Cards from '../views/components/Cards.vue'
import store from "main";
import Modal from "../views/SearchClub.vue";

const cardsData = [];

export default {
  components: {
    Modal,
  },
  data() {
    return {
      user: "...",
      cardsLinks: cardsData,
      // cardsEventsLinks: cardsEventData,

      payments: [],

      events: [],

      memberships: {},

      following: [],

      tickets: {},
      gradient: 'info'
    };
  },
  methods: {
    goTo(url) {
      window.location.href = url;
    },

    async goToPage(url) {
      this.$router.push(url);
      console.log("smog");
    },

    async retrieveMembership() {
      this.user = this.$store.state.userDetails.firstName;
      const cards = this.$store
        .dispatch("getMemberships")
        .then(function (data) {
          const cardsData = [];
          for (var i = 0; i < data.length; i++) {
            const card = {
              title: "",
              caption: "",
              details: "",
              link: "",
            };
            card.title = data[i].name;
            card.caption = data[i].details;
            card.url = "/profile/" + data[i].userlink;
            cardsData.push(card);
          }
          return cardsData;
        });
      this.following = await cards;

      console.log("cardscheckfollowing:", this.following);
    },

    async retrievePayments() {
      const pays = this.$store.dispatch("getPayments").then(function (data) {
        const Arpayments = [];
        for (var i = 0; i < data.length; i++) {
          //console.log(data[i].details)
          const card = {};

          card.id = data[i].id;
          card.status = data[i].status;
          card.payee = data[i].payee;
          card.info = data[i].info
          const dateholder = new Date(data[i].date1.seconds * 1000);
          card.date1 =
            dateholder.getDate().toString() +
            "/" +
            (dateholder.getMonth() + 1).toString() +
            "/" +
            "20" +
            (dateholder.getYear() - 100).toString();
          dateholder = new Date(data[i].date2.seconds * 1000);
          card.date2 =
            dateholder.getDate().toString() +
            "/" +
            (dateholder.getMonth() + 1).toString() +
            "/" +
            "20" +
            (dateholder.getYear() - 100).toString();
          card.amount = "$" + data[i].amount.toString();
            
          Arpayments.push(card);
        }
        return Arpayments;
      });
      this.payments = await pays;

      console.log("paymentcheck:", this.payments);
    },

    async retrieveMembershipTypes() {
      const cards = this.$store
        .dispatch("getMembershipsTypesUser")
        .then(function (data) {
          const cardsData = [];
          for (var i = 0; i < data.length; i++) {
            const card = {
              title: "",
              caption: "",
              details: "",
              link: "",
            };
            card.title = data[i].name;
            card.caption = data[i].type;
            card.url = "/profile/" + data[i].userlink;
            cardsData.push(card);
          }
          return cardsData;
        });
      this.memberships = await cards;
      console.log("cardscheckmembos:", this.memberships);
    },

    async goLoad() {
      console.log("loading:", this.$store.state.userDetails.email);
      if (this.$store.state.userDetails.email === undefined) {
        setTimeout(() => this.goLoad(), 50);
      } else {
        this.retrieveMembership();
        this.retrieveMembershipTypes();
        this.retrieveEvents();
        this.retrieveEventsTickets();
        this.retrievePayments();
      }
    },

    async retrieveEventsTickets() {
      const cards = this.$store
        .dispatch("getEventTickets")
        .then(function (data) {
          const cardsData = [];
          for (var i = 0; i < data.length; i++) {
            const card = {
              title: "",
              caption: "",
              details: "",
              link: "",
            };
            card.title = data[i].event_name;
            card.caption = data[i].type;
            card.url = "/profile/" + data[i].userlink;
            cardsData.push(card);
          }
          return cardsData;
        });
      this.tickets = await cards;
      console.log("cardschecktickets:", this.tickets);
    },

    async retrieveEvents() {
      const eventsarray = this.$store
        .dispatch("getEvents")
        .then(function (data) {
          const ArEvents = [];
          for (var i = 0; i < data.length; i++) {
            //console.log(data[i].details)
            const card = {
              id: "",
              name: "",
              date: "",
              event_description: "",
            };
            card.id = data[i].id;
            if (
              data[i].event_name === undefined ||
              data[i].event_name === "" ||
              data[i].event_name === null
            ) {
              card.name = "Untitled Event";
            } else {
              card.name = data[i].event_name;
            }
            card.date = new Date(data[i].date_created.seconds * 1000);
            card.event_description = data[i].event_description;
            card.url = "/event/" + data[i].id;
            ArEvents.push(card);
          }
          return ArEvents;
        });
      this.events = await eventsarray;
    },
  },
  created() {
    this.goLoad();
  },
};
</script>

<style>
#userdashboardbg {
  background: linear-gradient(
    180deg,
    rgba(36, 37, 70, 1) 0%,
    rgba(112, 79, 112, 1) 59%,
    rgba(205, 104, 64, 1) 100%
  ) !important;
}
#userdashboardbgdiv {
  /* height: 100vh; */
}
#paymenttable{
    border: 1px solid #ddd;
    border-collapse: collapse;
    width: 100%;
}

#paymenttable td, #paymenttable th {
    border: 1px solid #ddd;
    overflow: hidden;
}

#paymenttable tr:nth-child(even){background-color: #f2f2f2;}

#paymenttable th {
    background-color: #2d3e77;
    color: white;
}
</style>