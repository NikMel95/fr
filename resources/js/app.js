require('./bootstrap');
window.Vue = require('vue')

import router from './router'
import store from './store'
import ApiService from './common/api.service'
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false

ApiService.init()

Vue.use(vmodal, {
  dialog: true,
  dynamic: true,
}) 

new Vue({
  router,
  store,
  el: '#app'
})