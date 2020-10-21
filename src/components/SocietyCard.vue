<template>
    <div class="card"
         :class="[
         {'card-lift--hover': hover},
         {'card-options--hover': options},
         {'shadow': shadow},
         {[`shadow-${shadowSize}`]: shadowSize},
         {[`bg-gradient-${gradient}`]: gradient},
         {[`bg-${type}`]: type}
       ]">

        <div class="card-header" :class="headerClasses" v-if="$slots.header">
            <slot name="header">
            </slot>
        </div>
        <!-- Had a 'card-body' class in it before... -->
        <div class="" :class="bodyClasses" v-if="!noBody">
            <slot></slot>
            <!-- Below has been added by Ed -->
            <!-- style="max-height: 200px; max-width: 200px; object-fit: cover; width: 100%;" -->
            <div v-if="img">
              <img :src="img" class="card-img-crop" >
            </div>
            <!-- Below has been added by Ed -->
              <!-- Needs to have the element for when hover, show in css -->
              <div v-if="options" class=""> 
                <ul class="nav nav-pills-circle justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link nav-white-highlight"
                       href="#" @click.prevent="modals.edit = true"
                    >
                    Edit
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-white-highlight"
                       :href="link"
                    >
                    View
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-white-highlight"
                       href="#" @click.prevent="deleteThis"
                    >
                    Delete
                    </a>
                  </li>                  
                </ul>
              </div>
              <!-- div class body-options... list menu options here in a slot? -->
             <!-- End -->
            <!-- End -->
            <modal :show.sync="modals.edit">
              <h6 slot="header" class="modal-title" id="modal-title-default">{{event.name}}</h6>
               <form role="form" @submit.prevent="editThis">
                <input :placeholder="event.name" v-model="editForm.name">
                <input placeholder="Description" v-model="editForm.description">
                <p>Time and Date</p>
                  <div class="input-daterange datepicker align-items-center">
                      <div class="">
                              <input addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="{allowInput: true, mode: 'range',}"
                                              class="form-control datepicker"
                                              v-model="dates.range">
                                  </flat-picker>
                             
                          </div>
                      </div>
                <p>Location</p>
                  <input placeholder="Location">
                  
                <p>Price</p>
                  <input v-model="editForm.price"
                  placeholder="$0.00"
                  addon-left-icon="fa fa-tag">
                  
                <p>Capacity</p>
                  <input v-model="editForm.capacity"
                  placeholder="0"
                  addon-left-icon="fa fa-users">
                           
                <div class="text-center">
                  
                    <button type="submit">Save changes</button>
                    <button type="link" class="ml-auto" @click="modals.edit = false">Close
                    </button>
               
                </div>
                </form>    
                
               
            </modal>
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
        delete: false
      },
      editForm: {
        id:'',
        name:'',
        description:'',
        price: -1
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
    id: {
      type: String,
      default: "",
      description: "id of event"
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
  },
  methods: {
    async deleteThis () {
      console.log('idcheck:', this.id)
      this.$store.dispatch('deleteEvent', this.id)
    },

    async editThis () {
      this.editForm.id = this.id
      console.log(this.editForm)
      this.$store.dispatch('updateEvent', this.editForm)
    }
  }
};
</script>
<style>
</style>
