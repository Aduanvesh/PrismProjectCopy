<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="img:static/sociit1024x959.png"
          type="a" href="/"
        />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          {{title}}
        </q-toolbar-title>
        <!-- code for the header buttons-->
        <div
        v-if="!userDetails.email">
          <div
          v-if="$route.path=='/'">
            <q-btn color="secondary" label="Login" @click="$router.push('/login')" />
            <q-btn color="secondary" label="Register" style="margin-left:10px;" @click="$router.push('/register')" />
          </div>
          <div
          v-else>
            <q-btn color="secondary" label="Back" @click="$router.push('/')" />
          </div>
        </div>
        <div
          v-else>{{ userDetails.email }}
          <q-btn color="secondary" label="logout" @click="signout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapState, mapActions } from 'vuex'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Profile',
    caption: 'Test Profile for Payments',
    icon: 'public',
    link: 'profile'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  computed: {
    ...mapState('store', ['userDetails']),
    title () {
      console.log(this.$route)
      const currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Dashboard'
      else if (currentPath === '/login') return 'Login'
      else if (currentPath === '/profile') return 'Profile'
      else return 'Login'
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    ...mapActions('store', ['signoutUser']),
    signout () {
      this.signoutUser()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>
