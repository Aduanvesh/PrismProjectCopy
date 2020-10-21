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
          <h6 slot="header" class="modal-title" id="modal-title-notification">Your attention is required</h6>
          <div class="py-3 text-center">
              <i class="fa fa-trash-o fa-3x"></i>
              <h4 class="heading mt-4">Would you really like to delete this?</h4>
              <p>Users will no longer be able to access the public copy of this file once it has been deleted.</p>
          </div>
          <template slot="footer">
              <base-button type="white">Ok, Got it</base-button>
              <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="modals.delete = false">
                  Close
              </base-button>
            </template>
        </modal>

        <modal :show.sync="modals.view">
                <h6 slot="header" class="modal-title" id="modal-title-default">Statistics</h6>

                <p>Tickets Sold:</p>
                <p>Current Attendees:</p>

                <template slot="footer">
                    <base-button type="primary">View Event</base-button>
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
              <h6 slot="header" class="modal-title" id="modal-title-default">{{event.name}}</h6>
                <base-input :placeholder="event.name">
                </base-input>
                <base-input placeholder="Description">
                </base-input>
                <p>Time and Date</p>
                  <div class="input-daterange datepicker align-items-center">
                      <div class="">
                              <base-input addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="{allowInput: true, mode: 'range',}"
                                              class="form-control datepicker"
                                              v-model="dates.range">
                                  </flat-picker>
                              </base-input>
                          </div>
                      </div>
                <p>Location</p>
                  <base-input placeholder="Location">
                  </base-input>
                <p>Price</p>
                  <base-input
                  placeholder="$0.00"
                  addon-left-icon="fa fa-tag">
                  </base-input>
                <p>Capacity</p>
                  <base-input
                  placeholder="0"
                  addon-left-icon="fa fa-users">
                  </base-input>                

                <template slot="footer">
                    <base-button type="primary">Save changes</base-button>
                    <base-button type="link" class="ml-auto" @click="modals.edit = false">Close
                    </base-button>
                </template>
            </modal>

        <div class="card-header" :class="headerClasses" v-if="$slots.header">
            <slot name="header">
            </slot>
        </div>
        <div class="card-body" :class="bodyClasses" v-if="!noBody">
            <slot></slot>
            <div v-if="img">
              <img :src="img" class="card-img-crop" >
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
                        href="#" @click.prevent="modals.edit = true"
                      >Edit</a>
                  </li> 
                  <li class="nav-item" v-if="options && !$slots.button1 || !$slots.button2 || !$slots.button3">
                      <a class="nav-link nav-white-highlight" href="#" @click.prevent="modals.delete = true">Delete</a>
                  </li>             
                </ul>
              </div>
              <!-- div class body-options... list menu options here in a slot? -->
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
      event: {
        name: 'Title',
      },
      dates: {
        range: "2020-01-09 to 2020-01-09"
      }
    };
  },
  props: {
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
      type: [String, Object, Array],
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
  }
};
</script>
<style>
</style>
