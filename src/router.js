import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
//import DashHeader from "./layout/DashHeader";
//import DashFooter from "./layout/DashFooter";
import DashboardLayout from '@/layout/DashboardLayout';
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Dashboard from "./views/Dashboard2.vue";
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
        default: Dashboard 
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
