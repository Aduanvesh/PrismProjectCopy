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
              <p>You will no longer be able your copy of <i>{{name}}</i> once it has been deleted.</p>
          </div>
          <template slot="footer">
              <base-button type="white" @click="modals.delete = false">Ok, Got it</base-button>
              <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="modals.delete = false">
                  Close
              </base-button>
            </template>
        </modal>      
        <modal :show.sync="modals.ticket">
                <h6 slot="header" class="modal-title" id="modal-title-default">View Ticket</h6>

                <p>Ticket Code</p>
                <div class="container">
                  <qrcode-vue
                        :value="qr.value"
                        :background="qr.background"
                        :foreground="qr.foreground"
                      >
                  </qrcode-vue>
                  <h1 class="text-center"> {{ticketCode}} </h1>
                </div>
                <template slot="footer">
                    <base-button type="link" class="ml-auto" @click="modals.ticket = false">Close
                    </base-button>
                </template>
        </modal>
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
                      <a class="nav-link nav-white-highlight" href="#" @click.prevent="modals.ticket = true">View</a>
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
import store from 'main';
import router from '../router';
import QrcodeVue from "qrcode.vue";

export default {
  name: "usercard",
  components: {
    Modal,
  },
  data() {
    return {
      modals: {
        delete: false,
        ticket: false,
      },
     
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

      memedit: {
        imgURL: '',
        colour: '', 
        name: '',
        description: '',
        price: 0,
        numberMembers: 0,
      },

      attendee: [{
        name: '',
        phone: '',
        paid: false,
        attending: false
      }],

      //@Adarsh, you might need these to be props? 
      // ['primary', 'info', 'success', 'warning', 'danger', 'gray']
      membership: {
        imgURL: '',
        colour: '', 
        name: '',
        description: '',
        price: 0,
        numberMembers: 0,
      },

      qr: {
            value: 'www.apple.com',
            background: '#ffffff',
            foreground: '#000000',
      },
      
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
    ticketCode: {
        type: String, 
        default: 'Name',
        description: "Unique Code ID for a ticket"
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

    
  },

    
};
</script>
<style>
</style>
