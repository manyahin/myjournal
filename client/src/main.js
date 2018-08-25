// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'

import VueMoment from 'vue-moment'
import axios from 'axios'

import auth from '@/utils/auth.js'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/api/';

// Add a response interceptor
axios.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response.status == 401) {
    return auth.logout()
  }

  return Promise.reject(error)
})

Vue.use(VueMoment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
