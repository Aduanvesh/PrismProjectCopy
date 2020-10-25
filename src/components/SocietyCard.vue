<template>
    
    <div class="card"
         :class="[
         {'card-lift--hover': hover},
         {'card-options--hover': options},
         {'shadow': shadow},
         {[`shadow-${shadowSize}`]: shadowSize},
         {[`bg-gradient-${gradient}`]: gradient},
         {[`bg-${type}`]: type},
       ]">

       <modal
          :show.sync="modals.delete"
          gradient="danger"
          modal-classes="modal-danger modal-dialog-centered">
          <h6 slot="header" class="modal-title" id="modal-title-notification">Would you like to delete <i>{{name}}</i>?</h6>
          <div class="py-3 text-center">
              <i class="fa fa-trash-o fa-3x"></i>
              <h4 class="heading mt-4">Would you really like to delete this?</h4>
              <p>Users will no longer be able to access the public copy of <i>{{name}}</i> once it has been deleted.</p>
          </div>
          <template slot="footer">
              <base-button type="white" @click="deleteThis">Ok, Got it</base-button>
              <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="modals.delete = false">
                  Close
              </base-button>
            </template>
        </modal>
    <div v-if="options != 'membership'">
        <modal :show.sync="modals.view">
                <h6 slot="header" class="modal-title" id="modal-title-default">Statistics</h6>

                <p>Tickets Sold:</p>
                <p>Current Attendees:</p>

                <template slot="footer">
                    <base-button type="primary" @click="viewEvent">View Event</base-button>
                    <base-button outline type="primary" @click="modals.view = false; modals.guest = true">View Guest List</base-button>
                    <base-button type="link" class="ml-auto" @click="modals.view = false">Close
                    </base-button>
                </template>
        </modal>
        
        <modal :show.sync="modals.guest">
                <h6 slot="header" class="modal-title" id="modal-title-default">Guest List</h6>

                <p>Guests:</p>

                <template slot="footer">
                    <base-button type="primary" @click="modals.view = true; modals.guest = false">View Stats</base-button>
                    <base-button type="link" class="ml-auto" @click="modals.guest = false">Close
                    </base-button>
                </template>
        </modal>
            <modal :show.sync="modals.edit">
                <div>
                    <h6 slot="header" class="modal-title mb-3" id="modal-title-default">Edit: {{name}}</h6>
                    <form>
                    <p>Title and Description</p>
                    <base-input 
                        v-model="edit.title"
                        type="text"
                        placeholder="Title"
                        class="field"> 
                    </base-input>
                    <base-input 
                        v-model="edit.description"
                        type="text"
                        placeholder="Description"
                        class="field">
                    </base-input>
                    <p>Time and Date</p>
                        <select v-model="edit.startTime">
                            <option
                            v-for="option in times"
                            :value="option"
                            :key="option"
                            :selected="option === edit.startTime"
                            >{{ option }}</option>
                        </select>
                        <select v-model="edit.endTime">
                            <option
                            v-for="option in times"
                            :value="option"
                            :key="option"
                            :selected="option === edit.endTime"
                            >{{ option }}</option>
                        </select>
                        <div class="calendar">
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true, mode: 'range',}"
                                                class="form-control datepicker"
                                                v-model="edit.dates">
                                    </flat-picker>
                                </base-input>
                        </div>
                    <p></p>
                    <p>Location</p>
                    <base-input 
                        v-model="edit.location"
                        type="text"
                        placeholder="Location"
                        class="field"
                    >
                    </base-input>
                    <p>Price</p>
                    <base-input 
                        v-model.number="edit.price"
                        type="number"
                        placeholder="$0.00"
                        class="field"
                    >
                    </base-input>
                    <p>Capacity</p>
                    <base-input 
                        v-model.number="edit.capacity"
                        type="number"
                        placeholder="0"
                        class="field"
                    >
                    </base-input>
        <h6>Extras</h6>
        <div>
            <base-checkbox
            type="checkbox"
            v-model="edit.extras.catering"
            class="field"
            ><p>Collect dietary requirements?</p></base-checkbox>
        </div>
        <div>
            <base-checkbox
            type="checkbox"
            v-model="edit.extras.membersOnly"
            class="field"
            ><p>Member only event?</p></base-checkbox>
            
        </div>
        <base-button type="submit" @click="onEdit">Save changes</base-button>
        <base-button type="link" class="ml-auto" @click="modals.edit = false">Close
        </base-button>
        </form>
    </div>
  </modal>
  </div>
  <!-- If the card type is a membership, show different modals -->
  <div v-if="options === 'membership'">
            <modal :show.sync="modals.view">
                <h6 slot="header" class="modal-title" id="modal-title-default">Statistics</h6>

                <p>Number of Sold Memberships: <b>{{membership.numberMembers}}</b></p>

                <template slot="footer">
                    <base-button type="link" class="ml-auto" @click="modals.view = false">Close
                    </base-button>
                </template>
            </modal>

            <modal :show.sync="modals.edit">
                <h6 slot="header" class="modal-title" id="modal-title-default">Edit Membership</h6>

                <p>Number of Sold Memberships: <b>{{membership.numberMembers}}</b></p>
                <p>Image</p>
                      <base-input 
                        v-model="membership.imgURL"
                        type="text"
                        placeholder="Image URL"
                        class="field"> 
                    </base-input>
                    <p> Colour </p>
                                    <div class="row pb-3">
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'primary'" type="secondary" class="bg-gradient-primary text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'info'" type="secondary" class="bg-gradient-info text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'success'" type="secondary" class="bg-gradient-success text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'warning'" type="secondary" class="bg-gradient-warning text-white" icon="" rounded icon-only></base-button>
                                        </div>
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'danger'" type="secondary" class="bg-gradient-danger text-white" icon="" rounded icon-only></base-button>
                                        </div> 
                                        <div class="col-1">
                                        <base-button tag="a" href="#" v-on:click="membership.colour = 'gray'" type="secondary" class="bg-gradient-gray text-white" icon="" rounded icon-only></base-button>
                                        </div>                                         
                                    </div>
                <p>Title and Description</p>
                    <base-input 
                        v-model="membership.title"
                        type="text"
                        placeholder="Title"
                        class="field"> 
                    </base-input>
                    <base-input 
                        v-model="membership.description"
                        type="text"
                        placeholder="Description"
                        class="field"> 
                    </base-input>
                    <p>Price</p>
                    <base-input 
                        v-model="membership.price"
                        type="number"
                        placeholder="$0.00"
                        class="field"
                    >
                    </base-input>

                <template slot="footer">
                    <base-button type="link" class="ml-auto" @click="modals.edit = false">Close
                    </base-button>
                </template>
            </modal>

  </div>


        <div class="card-header" :class="headerClasses" v-if="$slots.header">
            <slot name="header">
            </slot>
        </div>
        <div class="card-body" :class="bodyClasses" v-if="!noBody">
            <slot></slot>
            <router-link to="#" v-on:click.native="setViewState" v-if="options === 'membership' || options === 'event'">
              <div v-if="img">
                <img :src="img" class="card-img-crop" >
              </div>
            </router-link>
            <div v-else>
              <div v-if="img">
                <img :src="img" class="card-img-crop" >
              </div>
            </div>
              <div v-if="options"> 
                <ul class="nav nav-pills-circle justify-content-center">
                  <li class="nav-item">
                    <div v-if="$slots.button1">
                      <slot name="button1">
                      </slot>
                    </div>
                  </li>
                  <li class="nav-item">
                    <div v-if="$slots.button2">
                      <slot name="button2">
                      </slot>
                    </div>
                  </li>
                  <li class="nav-item">
                    <div v-if="$slots.button3">
                      <slot name="button3">
                      </slot>
                    </div>
                  </li>    
                  <li class="nav-item" v-if="options && !$slots.button1 || !$slots.button2 || !$slots.button3">
                      <a class="nav-link nav-white-highlight" href="#" @click.prevent="modals.view = true">View</a>
                  </li>
                  <li class="nav-item" v-if="options && !$slots.button1 || !$slots.button2 || !$slots.button3">
                    <a class="nav-link nav-white-highlight"
                        href="#" @click.prevent="onEditStart"
                      >Edit</a>
                  </li> 
                  <!-- || !$slots.button1 || !$slots.button2 || !$slots.button3 -->
                  <li class="nav-item" v-if="options != 'membership'">
                      <a class="nav-link nav-white-highlight" href="#" @click.prevent="modals.delete = true">Delete</a>
                  </li>             
                </ul>
              </div>
             <!-- End -->
            <!-- End -->
        </div>
        <slot v-if="noBody"></slot>

        <div class="card-footer" :class="footerClasses" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import store from 'main'
import router from '../router'

export default {
  name: "card",
  components: {
    Modal,
    flatPicker
  },
  data() {
    return {
      modals: {
        view: false,
        edit: false,
        delete: false,
        guest: false,
      },
      times: [
            '1:00',
            '1:30',
            '2:00',
            '2:30',
            '3:00',
            '3:30',
            '4:00',
            '4:30',
            '5:00',
            '5:30',
            '6:00',
            '6:30',
            '7:00',
            '7:30',
            '8:00',
            '8:30',
            '9:00',
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            ],
      edit: {
        category: '',
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        times: '',
        extras: {
          catering: false,
          membersOnly: false
        },
        price: '',
        capacity: 0,
        dates: "2020-01-09 to 2020-01-10",
      },

      //@Adarsh, you might need these to be props? 
      // ['primary', 'info', 'success', 'warning', 'danger', 'gray']
      membership: {
        imgURL: '',
        colour: '', 
        title: '',
        description: '',
        price: 0,
        numberMembers: 0,
      },

      dates: "2020-01-09 to 2020-01-10",
      
    };
  },
  props: {
    id: {
      type: String,
      default: "",
      description: "id of event"
    },
    name: {
        type: String,
        default: 'Name',
        description: "Name of the file, event or membership"
    },
    location: {
        type: String,
        default: 'Location',
        description: "Name of the file, event or membership"
    },
    description: {
        type: String,
        default: 'Description',
        description: "Name of the file, event or membership"
    },
    price: {
        type: Number,
        default: 0,
        description: "Name of the file, event or membership"
    },
    capacity: {
        type: Number,
        default: 0,
        description: "Name of the file, event or membership"
    },
    cateringProp: {
        type: Boolean,
        default: false,
        description: "Boolean for dietary requirements"
    },
    memberProp: {
        type: Boolean,
        default: false,
        description: "Boolean for members only"
    },
    type: {
      type: String,
      description: "Card type"
    },
    gradient: {
      type: String,
      description: "Card background gradient type (warning,danger etc)"
    },
    hover: {
      type: Boolean,
      description: "Whether card should move on hover"
    },
    // Below has been added by Ed
    options: {
      type: String,
      description: "Whether card should display a secondary menu on hover, and the contents of that menu"
    },
    link: {
      type: String,
      default: "",
      description: "URL for the content to be edited."
    },
    img: {
      type: String,
      default: "",
      description: "Image for the card to display."
    },
    // End.
    shadow: {
      type: Boolean,
      description: "Whether card has shadow"
    },
    shadowSize: {
      type: String,
      description: "Card shadow size"
    },
    noBody: {
      type: Boolean,
      default: false,
      description: "Whether card should have wrapper body class"
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: "Card body css classes"
    },
    headerClasses: {
      type: [String, Object, Array],
      description: "Card header css classes"
    },
    footerClasses: {
      type: [String, Object, Array],
      description: "Card footer css classes"
    }
  },
  methods: {

    setViewState: function()
    {
      this.modals.view = true
    },

    async deleteThis (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.id))

      console.log('iddeletecheck:', this.id)
      this.$store.dispatch('deleteEvent', this.id)
       //setTimeout(() =>  this.$router.go(), 100)
    },

    async editThis () {
      this.edit.id = this.id
      console.log(this.edit)
      this.$store.dispatch('updateEvent', this.edit)
      this.modals.edit = false
    },

    async onEdit(evt){
        evt.preventDefault()
        alert(JSON.stringify(this.edit))
        this.editThis()
      },

    async viewEvent () {
      this.$router.push(this.link)
    },
    
    async onEditStart() {
      this.edit.title = this.name
      this.edit.category = this.name
      this.edit.description = this.description
      this.edit.price = this.price
      this.edit.capacity = this.capacity
      this.edit.location = this.location
      console.log(this.edit.extras.catering, this.cateringProp)
      this.edit.extras.catering = this.cateringProp
      this.edit.extras.membersOnly = this.memberProp
      this.modals.edit = true

    }
  },

    
};
</script>
<style>
</style>
