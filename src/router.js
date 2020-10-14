import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import PasswordReset from "./views/PasswordReset.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Dashboard from "./views/UserDash.vue";
import SocietyDashboard from "./views/Society.vue";
import Event from "./views/Event.vue";
import Kiosk from "./views/Kiosk.vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        //footer: AppFooter
      }
    },
    {
      path: "/password-reset",
      name: "password-reset",
      components: {
        header: AppHeader,
        default: PasswordReset,
        //footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        //footer: AppFooter
      },
      children: [
        {
          path: '/register/user',
          name: 'user',
          component: Register
        },
        {
          path: '/register/club',
          name: 'club',
          component: Register
        },]
    },
    {
      path: "/memberships",
      name: "memberships",
      components: {
        header: AppHeader,
        default: Register,
        //footer: AppFooter
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        header: AppHeader,
        default: Dashboard,
        footer: AppFooter 
      }, 
    },
    {
      path: "/society",
      name: "societydashboard",
      components: {
        header: AppHeader,
        default: SocietyDashboard,
        footer: AppFooter 
      }, 
    },
    {
      path: "/profile/:id",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/event/:id",
      name: "event",
      components: {
        header: AppHeader,
        default: Event,
        footer: AppFooter
      }
    },
    {
      path: "/kiosk/:id",
      name: "kiosk",
      components: {
        default: Kiosk,
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
