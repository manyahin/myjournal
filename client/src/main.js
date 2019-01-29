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

axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}/api/`
axios.defaults.headers.common['Authorization'] = auth.getToken()
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Add a response interceptor
axios.interceptors.response.use(res => {
  return res
}, error => {
  // Handle lost token events
  if (error.response.status === 401 &&
    !error.request.responseURL.match('Customers/login')) {
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
