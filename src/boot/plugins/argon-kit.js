import 'src/assets/vendor/nucleo/css/nucleo.css'
import 'src/assets/vendor/font-awesome/css/font-awesome.css'
import 'src/scss/argon.scss'
import globalComponents from './globalComponents'
import globalDirectives from './globalDirectives'
import VueLazyload from 'vue-lazyload'

export default {
  install (Vue) {
    // Used to say "use: Vue.use()"
    Vue.install(globalComponents)
    Vue.install(globalDirectives)
    Vue.install(VueLazyload)
  }
}
