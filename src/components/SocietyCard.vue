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
            <div v-if="img">
              <img :src="img" class="card-img">
            </div>
            <!-- Below has been added by Ed -->
              <!-- Needs to have the element for when hover, show in css -->
              <div v-if="options" class=""> 
                <ul class="nav nav-pills-circle justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link nav-white-highlight"
                       :href="link"
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
                       :href="link"
                    >
                    Delete
                    </a>
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
export default {
  name: "card",
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
