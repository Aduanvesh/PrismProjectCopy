<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>

            <router-link slot="brand" class="navbar-brand mr-lg-5 align-items-stretch" to="/">
                    <img src="/img/brand/logo.svg" class="mr-lg-2" alt="Sociit Logo">
                    <span class="text-white alpha-7">Sociit</span>
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                        <img src="img/brand/blue.png">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text">Components</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="ni ni-spaceship"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                                <p class="description d-none d-md-inline-block mb-0">Get started with Bootstrap, the
                                    world's most popular framework for building responsive sites.</p>
                            </div>
                        </a>
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="ni ni-ui-04"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading text-warning mb-md-1">Components</h5>
                                <p class="description d-none d-md-inline-block mb-0">Learn how to use Argon
                                    compiling Scss, change brand colors and more.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">Examples</span>
                    </a>
                    <router-link to="/landing" class="dropdown-item">Landing</router-link>
                    <router-link to="/dashboard" class="dropdown-item">Dashboard</router-link>
                    <router-link :to="userID"  class="dropdown-item">Profile</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                    <router-link to="/register" class="dropdown-item">Register</router-link>
                </base-dropdown>
            </ul>
            <div class = "white" v-if="userExists">
                {{user}}
                <button type="submit" class="btn btn-1 btn-outline-neutral" @click="$store.dispatch('signoutUser')">Log out</button>
            </div >
            <div v-else>
               <ul class="navbar-nav align-items-lg-center ml-lg-auto">
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
            
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import store from 'main'

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: {
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
