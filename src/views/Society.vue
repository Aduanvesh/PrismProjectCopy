<template>
    <div class="section section-shaped section-lg my-0">
        <!-- Create a new event modal -->
            <modal :show.sync="modals.add">
                <div>
                    <h6 slot="header" class="modal-title mb-3" id="modal-title-default">New Event</h6>
                    <form>
                    <p>Title and Description</p>
                    <base-input 
                        v-model="event.event_name"
                        type="text"
                        placeholder="Title"
                        class="field"> 
                    </base-input>
                    <base-input 
                        v-model="event.description"
                        type="text"
                        placeholder="Description"
                        class="field">
                    </base-input>
                    <p>Time and Date</p>
                        <select v-model="event.startTime">
                            <option
                            v-for="option in times"
                            :value="option"
                            :key="option"
                            :selected="option === event.startTime"
                            >{{ option }}</option>
                        </select>
                        <select v-model="event.endTime">
                            <option
                            v-for="option in times"
                            :value="option"
                            :key="option"
                            :selected="option === event.endTime"
                            >{{ option }}</option>
                        </select>
                        <div class="calendar">
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true, mode: 'range',}"
                                                class="form-control datepicker"
                                                v-model="event.dates">
                                    </flat-picker>
                                </base-input>
                        </div>
                    <p></p>
                    <p>Location</p>
                    <base-input 
                        v-model="event.location"
                        type="text"
                        placeholder="Location"
                        class="field"
                    >
                    </base-input>
                    <p>Price</p>
                    <base-input 
                        v-model="event.price"
                        type="number"
                        placeholder="$0.00"
                        class="field"
                    >
                    </base-input>
                    <p>Capacity</p>
                    <base-input 
                        v-model="event.capacity"
                        type="number"
                        placeholder="0"
                        class="field"
                    >
                    </base-input>
        <h6>Extras</h6>
        <div>
            <base-checkbox
            type="checkbox"
            v-model="event.extras.catering"
            class="field"
            ><p>Collect dietary requirements?</p></base-checkbox>
        </div>
        <div>
            <base-checkbox
            type="checkbox"
            v-model="event.extras.membersOnly"
            class="field"
            ><p>Member only event?</p></base-checkbox>
            
        </div>
        <base-button type="submit" @click="onSubmit">Submit</base-button>
        </form>
    </div>
            </modal>
    <div class="shape shape-style-1 bg-gradient-default"></div>
        <div class="m-xl-5 m-lg-5 m-md-4 m-sm-3">
            <div class="container-fluid mb-3 mb-l-5">
                <div class="row">
                    <div class="col-auto mr-auto my-auto">
                        <h1 class="text-white text-nowrap">Hi, {{this.user}}</h1>
                    </div>
                    <div class="col-auto my-auto">
                        <base-button tag="a" href="#" v-on:click="goProfile" type="secondary" icon="ni ni-atom" rounded icon-only></base-button>
                        <base-button tag="a" href="/kiosk" v-on:click="goProfile" type="secondary" icon="fa fa-qrcode" rounded icon-only></base-button>
                    </div>
                </div>
            </div>
           <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{activeTabIndex}" class="p-xl-5 p-lg-5 p-md-4 p-sm-3">
                    <!-- Tabs begin here -->
                    <tab-pane key="tab1">
                        <template slot="title"> 
                            <i class="fa fa-university mr-2"></i>{{user}}
                        </template>
                                <div class="row">
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
                                <div class="row">
                                    <div class="col-auto mr-auto">Active Events</div>
                                        <base-button outline class="btn-2 col-auto mb-3" type="primary" icon="fa fa-plus" @click="initialiseEventData">
                                        </base-button>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3" v-for="cards in cardsEventsLinks" v-bind:key="cards.id">
                                        <div v-if="cards.event_name != null"> 
                                            <!-- Above, weak workaround to hide null events. -->
                                            <card class="card-options--hover shadow" options="true" :link="cards.url" :id="cards.id" :img="cards.image" :name="cards.event_name"
                                            :cateringProp="cards.catering" :memberProp="cards.memberonly" :location="cards.location" :price="cards.price" 
                                            :capacity="cards.capacity" :description="cards.event_description">
                                                <template slot="header">
                                                    {{cards.event_name}}
                                                </template>
                                            </card>
                                        </div>
                                    </div>
                                </div>
                                    <div class="row pt-5">
                                        <div class="col-md-6 mb-5 mb-md-3"> Past Events </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                        </div>
                                    </div>
                    </tab-pane>

                    <tab-pane key="tab3">
                        <template slot="title">
                            <i class="ni ni-money-coins mr-2"></i>Payments
                        </template>
                        <h5> Payments</h5>
                        <div class="row">
                           <table class="col-12">
                                            <tr>
                                                <th>Payment ID</th>
                                                <th>Status</th>
                                                <th>Payee</th>
                                                <th>Date Submitted</th>
                                                <th>Date Paid</th>
                                                <th>Amount</th>
                                            </tr>
                                            <tr v-for="payment in payments" v-bind:key="payment.id">
                                                <th>{{payment.id}}</th>
                                                <th>{{payment.status}}</th>
                                                <th>{{payment.payee}}</th>
                                                <th>{{payment.date1}}</th>
                                                <th>{{payment.date2}}</th>
                                                <th>{{payment.amount}}</th>
                                                <th><button class="btn btn-1 btn-success" v-if="payment.status==='unpaid'" @click="paymentMake(payment.id)">Pay</button></th>
                                            </tr>
                                </table>
                        </div>
                    </tab-pane>
                    <tab-pane key="tab4">
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
                               </div>
                    </tab-pane>
                </card>
            </tabs>
        </div>
    </div>  
</template>

<script>
import SocietyCard from '../components/SocietyCard.vue'
import Modal from "@/components/Modal.vue";
import store from 'main';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
//import ProjectsTable from './Tables/ProjectsTable'
import router from '../router'


const cardsData = [
]

const cardsEventData = [
]

  export default {
    name: 'tables',
    components: {
      //ProjectsTable
      Modal,
      flatPicker
    },
    
    data () {
        return {
            times:  [
                    '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30',
                    '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
                    '9:00', '9:30','10:00','10:30','11:00','11:30','12:00','12:30',
                    ],
            event:  {
                        event_name: '',
                        description: '',
                        location: '',
                        startTime: '',
                        endTime: '',
                        extras: {
                            catering: false,
                            membersOnly: false
                        },
                        price: 0,
                        capacity: 0,
                        dates: "2018-07-17 to 2018-07-19",
                    },
            memberlist: [],
            user: this.$store.state.userDetails.title ? this.$store.state.userDetails.title : 'Student Society',
            cardsLinks: cardsData,
            cardsEventsLinks: cardsEventData, 
            modals: {
            add: false,
            payments:[{

            }]
            },
        }
    },

    methods: {

        async initialiseEventData(event)
        {
            this.modals.add = true;
            console.log('shoomba')
            for (var key in this.event) {
                if (this.event.hasOwnProperty(key) && key != 'extras') {
                    console.log(key)
                    this.event[key] = null;
                }
            }
        },

        async onSubmit(evt){
            evt.preventDefault()
            alert(JSON.stringify(this.event))
            console.log('checkeroni', this.event)
            this.$store.dispatch('createEvent', this.event)
            this.modals.add = false;
            //this.initialiseEventData(this.event)
           
        },
        
        async retrieveMembership () {
        const cards = this.$store.dispatch('getMembershipTypes')
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
                cardsData.push(card)
                return cardsData
            })
        this.cardsData = await cards
        this.cardsLinks = this.cardsData
        console.log('cardscheck:', this.cardsData)
        },
        
        async getMembers () {
            const clubMembers = await this.$store.dispatch('getClubMembers', this.$store.state.userDetails.id)
            this.memberlist = clubMembers
            console.log('membercheck:', this.memberlist)
            
        },

        async goProfile () {
            this.$router.push("/profile/" + this.$store.state.userDetails.id)
        },

        async goLoad () {
            console.log('loading:', this.$store.state.userDetails.email)
            if (this.$store.state.userDetails.email === undefined){
                  setTimeout(() => this.goLoad(), 50) 
            } else {
                this.retrieveMembership()
                this.getMembers()
                this.getEvents()
                this.retrievePayments()
            } 
        },

        async retrievePayments () {
            const pays = this.$store.dispatch('getClubPayments')
            .then(function (data) {
            const Arpayments = []
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].details)
                const card = { }
                
                card.id = data[i].id
                card.status = data[i].status
                card.payee = data[i].payee
                const dateholder = new Date(data[i].date1.seconds * 1000)
                card.date1 = dateholder.getDate().toString() + '/' + dateholder.getMonth().toString() + '/' + dateholder.getYear().toString()
                dateholder = new Date(data[i].date2.seconds * 1000)
                card.date2 = dateholder.getDate().toString() + '/' + dateholder.getMonth().toString() + '/' + dateholder.getYear().toString()
                card.amount = '$' + (data[i].amount/100).toString()

            Arpayments.push(card)
            }
                return Arpayments
            })
        this.payments = await pays

        console.log('paymentcheck:', this.payments)
        },
        


        async getEvents () {
            const eventCards = this.$store.dispatch('getClubEvents')
                .then(function (data) {
                const cardsData = []
                for (var i = 0; i < data.length; i++) {
                    const card = {
                        capacity: '',
                        date: '',
                        date_created: '',
                        catering: false,
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
                    if (data[i].event_name === undefined || data[i].event_name === '' || data[i].event_name === null) {card.event_name = 'Untitled Event'}
                    else {card.event_name = data[i].event_name}

                    card.event_description = data[i].event_description

                    card.image = '/img/theme/lcard.png'
                    card.url = '/event/' + data[i].id
                    card.id = data[i].id
                    card.date_created = data[i].date_created 
                    card.catering = data[i].catering   
                    card.memberonly = data[i].membersOnly
                    card.location = data[i].location          
                    card.price = data[i].price     
                    card.capacity = data[i].capacity 
                cardsData.push(card)
                }
                    return cardsData
                })
        this.cardsEventData = await eventCards
        this.cardsEventsLinks = this.cardsEventData
        console.log('eventcardscheck:', this.cardsEventData)
        }
    },
    created() {
        this.goLoad()
    }
  }
  
</script>

<style></style>
