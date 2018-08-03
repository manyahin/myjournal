import Vue from 'vue'
import Router from 'vue-router'
import CreateNote from '@/components/CreateNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Write Note',
      component: CreateNote
    }
  ]
})
