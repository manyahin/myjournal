import Vue from 'vue'
import Router from 'vue-router'
import CreateNote from '@/components/CreateNote'
import ReadPage from '@/components/ReadPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Write Note',
      component: CreateNote
    },
    { 
      path: '/write', 
      redirect: '/'
    },
    {
      path: '/read',
      component: ReadPage
    }
  ]
})
