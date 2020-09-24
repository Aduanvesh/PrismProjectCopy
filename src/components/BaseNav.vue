<template>
    <nav class="navbar"
         :class="[
            {'navbar-expand-lg': expand},
            {[`navbar-${effect}`]: effect},
            {'navbar-transparent': transparent},
            {[`bg-${type}`]: type},
            {'rounded': round}
         ]">
        <div class="container">
            <slot name="container-pre"></slot>
            <slot name="brand">
                <a class="navbar-brand" href="#" @click.prevent="onTitleClick">
                    {{title}}
                </a>
            </slot>
            <div class="white"
            v-if="userExists">
            {{user}}

            <button type="submit" class="btn btn-1 btn-outline-neutral" @click="$store.dispatch('signoutUser')">Log out</button>
            </div>
            <div
            v-else>
            Not logged in
            </div>
            <navbar-toggle-button :toggled="toggled"
                                  :target="contentId"
                                  @click.native.stop="toggled = !toggled">
            </navbar-toggle-button>

            <slot name="container-after"></slot>

            <div class="collapse navbar-collapse" :class="{show: toggled}" :id="contentId" v-click-outside="closeMenu">
                <div class="navbar-collapse-header">
                    <slot name="content-header" :close-menu="closeMenu"></slot>
                </div>
                <slot :close-menu="closeMenu"></slot>
            </div>
        </div>
    </nav>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import NavbarToggleButton from "./NavbarToggleButton";
import store from 'main'
import { mapState, mapActions } from 'vuex'

export default {
  name: "base-nav",
  components: {
    FadeTransition,
    NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: "primary",
      description: "Navbar type (e.g default, primary etc)"
    },
    title: {
      type: String,
      default: "",
      description: "Title of navbar"
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number"
    },
    effect: {
      type: String,
      default: "dark",
      description: "Effect of the navbar (light|dark)"
    },
    round: {
      type: Boolean,
      default: false,
      description: "Whether nav has rounded corners"
    },
    transparent: {
      type: Boolean,
      default: false,
      description: "Whether navbar is transparent"
    },
    expand: {
      type: Boolean,
      default: false,
      description: "Whether navbar should contain `navbar-expand-lg` class"
    }
  },
  data() {
    return {
      toggled: false
    };
  },
  methods: {
    onTitleClick(evt) {
      this.$emit("title-click", evt);
    },
    closeMenu() {
      console.log
      this.toggled = false;
    }
  },
  computed: {
    ...mapState('store', ['userDetails']),
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
