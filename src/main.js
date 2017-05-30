// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vmodal from 'vue-js-modal'
import VeeValidate from 'vee-validate'
import 'toastr/toastr.scss'
import VueAnalytics from 'vue-analytics'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(vmodal)
Vue.use(require('vue-moment'))

Vue.use(VueAnalytics, {
  id: 'UA-80881338-1',
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
