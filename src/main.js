import Vue from 'vue'
import Element from 'element-ui'
import Axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './mock.js'

Vue.prototype.$axios = Axios
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
