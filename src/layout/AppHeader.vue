<template>
   <header class="header-global">
      <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <div v-if="userExists">
               <router-link slot="brand" class="navbar-brand mr-lg-5 align-items-stretch" v-on:click.native="toDashboard" to="/">
                  <div v-if="currentPath === '/'">
                  <img src="/img/brand/logoblk.svg" class="mr-lg-2" alt="Sociit Logo">
                  </div>
                  <div v-else>
                     <img src="/img/brand/logo.svg" class="mr-lg-2" alt="Sociit Logo">
                     <span class="text-white alpha-7">Sociit</span>
                  </div>
               </router-link>
            </div>
            <div v-else>
            <router-link slot="brand" class="navbar-brand mr-lg-5 align-items-stretch" to="/">
                  <div v-if="currentPath === '/'">
                  <img src="/img/brand/logoblk.svg" class="mr-lg-2" alt="Sociit Logo">
                  </div>
                  <div v-else>
                     <img src="/img/brand/logo.svg" class="mr-lg-2" alt="Sociit Logo">
                     <span class="text-white alpha-7">Sociit</span>
                  </div>
               </router-link>
            </div>
         
         <div class="row" slot="content-header" slot-scope="{closeMenu}">
            <div class="col-6 collapse-brand">
               <div v-if="userExists">
                  <router-link to="/" v-on:click.native="toDashboard">
                     <div class="row align-items-center">
                        <img src="/img/brand/logoblk.svg">
                        <h2 class="mt-2 display-2 "> Sociit </h2>
                     </div>
                  </router-link>
               </div>
               <div v-else>
                  <a href="/">
                     <div class="row align-items-center">
                        <img src="/img/brand/logoblk.svg">
                        <h2 class="mt-2"> Sociit </h2>
                     </div>
                  </a>
               </div>
            </div>
            <div class="col-6 collapse-close">
               <close-button @click="closeMenu"></close-button>
            </div>
         </div>

         <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
            <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
               <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
               <i class="ni ni-ui-04 d-lg-none"></i>
               <div v-if="currentPath === '/'">
                  <span class="nav-link-inner--text" style="color: black;">Menu</span>
               </div>
               <div v-else>
                  <span class="nav-link-inner--text">Menu</span>
               </div>
               </a>
               <div class="dropdown-menu-inner">
                  <a href="/"
                     class="media d-flex align-items-center">
                     <div class="icon icon-shape bg-gradient-primary rounded-circle-no-outline text-white">
                        <i class="ni ni-spaceship"></i>
                     </div>
                     <div class="media-body ml-3">
                        <h6 class="heading text-primary mb-md-1">Find a Club</h6>
                        <p class="description d-none d-md-inline-block mb-0">Search for a club on Sociit</p>
                     </div>
                  </a>
                  <!-- Dashboard Menu Item -->
                  <div v-if="userExists">
                  <a href="/" v-on:click="toDashboard"
                     class="media d-flex align-items-center">
                     <div class="icon icon-shape bg-gradient-warning rounded-circle-no-outline text-white">
                        <i class="ni ni-ui-04"></i>
                     </div>
                     <div class="media-body ml-3">
                        <h5 class="heading text-warning mb-md-1">Dashboard</h5>
                        <p class="description d-none d-md-inline-block mb-0">Go to the dashboard</p>
                     </div>
                  </a>
                  </div>
                  <div v-else-if="currentPath === '/'">
                  <a href="/login"
                     class="media d-flex align-items-center">
                     <div class="icon icon-shape bg-gradient-warning rounded-circle-no-outline text-white">
                        <i class="ni ni-ui-04"></i>
                     </div>
                     <div class="media-body ml-3">
                        <h5 class="heading text-warning mb-md-1">Dashboard</h5>
                        <p class="description d-none d-md-inline-block mb-0">Login or register to see the dashboard</p>
                     </div>
                  </a>
                  <!-- End Dashboard Menu Item -->
                  </div>
               </div>
            </base-dropdown>
            <base-dropdown tag="li" class="nav-item">
               <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
               <i class="ni ni-collection d-lg-none"></i>
               <div v-if="currentPath === '/'">
                  <span class="nav-link-inner--text" style="color: black;">Pages</span>
               </div>
               <div v-else>
                  <span class="nav-link-inner--text">Pages</span>
               </div>
               </a>
                  <div v-if="userExists">
                     <router-link v-on:click.native="toDashboard" to="/" class="dropdown-item">Dashboard</router-link>
                     <router-link :to="userID"  class="dropdown-item">Profile</router-link>
                     <!-- V-if statement here -->
                     <router-link to="/" v-on:click.native="$store.dispatch('signoutUser')" class="dropdown-item">Logout</router-link>
                  </div>
                  <div v-else>
                        <router-link to="/login" class="dropdown-item">Login</router-link>
                        <router-link to="/register" class="dropdown-item">Register</router-link>
                  </div>
            </base-dropdown>
         </ul>
         <div class = "white" v-if="userExists">
            <ul class="navbar-nav align-items-lg-center ml-lg-auto navbar-right">
                              <li class="">
                              <base-dropdown class="nav-link pr-0">
                                 <div class="media align-items-center" slot="title">
                                       <span class="avatar rounded-circle">
                                          <img alt="" src="/img/theme/profile.jpg" style="max-width: 50px; max-height: 50px;">
                                       </span>
                                       <div class="media-body ml-2 d-none d-lg-block">
                                          <span class="mb-0 text-sm  font-weight-bold">{{user}}</span>
                                       </div>
                                 </div>
                                 <!-- Made Changes -->
                                 <template>
                                       <router-link to="/settings" class="dropdown-item">
                                          <i class="ni ni-single-02"></i>
                                          <span>Edit Profile</span>
                                       </router-link>
                                       <router-link to="/settings" class="dropdown-item">
                                          <i class="ni ni-settings-gear-65"></i>
                                          <span>Settings</span>
                                       </router-link>
                                 </template>
                              </base-dropdown>
                           </li>
               <li class="nav-item d-none d-lg-block ml-lg-4">
                  <button type="submit" class="btn btn-1 btn-outline-neutral" @click="$store.dispatch('signoutUser')">Log out</button>
               </li>
            </ul>
         </div >
         <div v-else>
         <div v-if="currentPath === '/'">
            <ul class="navbar-nav ml-lg-auto">
                  <li class="nav-item d-none d-lg-block ml-lg-4">
                     <router-link slot="brand" class="btn btn-neutral btn-icon" to="/login" style="color: #800080">
                        <span class="nav-link-inner--text">Login</span>
                     </router-link>
                  </li>
                  <li class="nav-item d-none d-lg-block ml-lg-4">
                     <router-link slot="brand" class="btn btn-neutral btn-icon" to="/register" style="color: #800080">
                        <span class="nav-link-inner--text">Register</span>
                     </router-link>
                  </li>
            </ul>
         </div>
         <div v-else>
            <ul class="navbar-nav ml-lg-auto">
                  <li class="nav-item d-none d-lg-block ml-lg-4">
                     <router-link slot="brand" class="btn btn-neutral btn-icon" to="/login">
                        <span class="nav-link-inner--text">Login</span>
                     </router-link>
                  </li>
                  <li class="nav-item d-none d-lg-block ml-lg-4">
                     <router-link slot="brand" class="btn btn-neutral btn-icon" to="/register">
                        <span class="nav-link-inner--text">Register</span>
                     </router-link>
                  </li>
            </ul>
         </div>
         </div>
      </base-nav>
   </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import store from 'main'
import router from '../router'
// import profileIMG from ".../img/theme/profile.jpg";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },

  data: {

     profilePic: '/public/img/theme/profile.jpg',
  },

  methods: {
        async toDashboard() {
            console.log('godem', this.$store.state.userDetails.type)
            if (this.$store.state.userDetails.type === 'Club'){
                router.push('/dashboard/club/'+this.$store.state.userDetails.id)
            } else {
                router.push('/dashboard/user/'+this.$store.state.userDetails.id)
            }
        }
    },
  computed: {

   currentPath() {
      console.log(this.$route)
      return router.currentRoute.fullPath
   },

    userID(){
      return '/profile/' + this.$store.state.userDetails.id
    },
    user(){
      return this.$store.state.userDetails.email
    },
    userExists(){
      console.log(this.$store.state.userDetails.email)
      if (this.$store.state.userDetails.email){
        return true
      } else {
        return false
      }
    } 
  }
};
</script>
<style>

.white {
color: white;
}

</style>
