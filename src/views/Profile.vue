<template>
    <div class="profile-page">
        <!-- <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section> -->
        <section class="section-profile-cover section-shaped my-0">
        <img v-lazy="'img/theme/qutlscover.jpg'" class="col-12"/>
        </section>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'/img/theme/QUTLS 2020.png'" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="default" size="sm" class="float-right">Follow</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{followers}}</span>
                                        <span class="description">Followers</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{up_coming_events}}</span>
                                        <span class="description">Events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{society_name}}
                                <span class="font-weight-light"></span>
                            </h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{location}}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{subtitle}}</div>
                            <div><i class="ni education_hat mr-2"></i>{{university}}</div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Bio </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p>{{bio}}</p>
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
                                    <!-- Cards element -->
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 py-5 border-top text-center">
                            <div class="h6"> Memberships </div>
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
                                                        <img v-lazy="'img/theme/lcard.png'" class="card-img">
                                                    </router-link>   
                                                </div> 
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- <modal></modal> -->
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import Modal from "./components/JavascriptComponents/Purchase.vue";
export default {
name: "components",
  components: {
    Modal,
  },
  data() {
    return {
        followers: 22,
        up_coming_events: 10,
        society_name: "QUT Law Society",
        subtitle: "Law Society",
        location: "Brisbane, Queensland",
        university: "Queensland University of Technology",
        bio: "An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
    };
    // need to pass data 'down the tree' 
    // card image, card title, etc --> modal (Purchase.vue)
  }
}
</script>
<style>
</style>
