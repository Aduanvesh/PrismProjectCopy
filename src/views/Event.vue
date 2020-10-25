<template>
    <div class="profile-page">
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-primary"
                     style="min-height: 600px; background-image: url(/img/theme/cloudland.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
        </base-header>
            <div class="container">
                <card shadow class="card-profile mt-300" no-body>
                    <div class="px-4">
                        <div class="text-center pt-5">
                            <h3>{{event_name}}
                                <span class="font-weight-light"></span>
                            </h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{location}}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{society_name}}</div>
                            <div><i class="ni education_hat mr-2"></i>{{university}}</div>
                            <div><i class="fade"></i>#{{$route.params.id}}</div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Description </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p>{{description}}</p>
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
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Tickets </div>
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
                                                    <router-link to="/profile" title="Profile Page">
                                                        <img v-lazy="'/img/theme/lcard.png'" class="card-img">
                                                    </router-link>   
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
import store from 'main'
import router from '../router'

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
        description: "An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
    };
// need to pass data 'down the tree' 
// card image, card title, etc --> modal (Purchase.vue)
},
methods: {

},
  computed: {
      fullname() {
          return this.$store.state.userDetails.firstName + ' ' + this.$store.state.userDetails.lastName
      }
  },
    created () {
    console.log('events')
  }
}
</script>
<style>
</style>
