import Vue from 'vue'
import Router from 'vue-router'
import CreateNote from '@/components/CreateNote'
import ReadPage from '@/components/ReadPage'
import PageNotFound from '@/components/PageNotFound'

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
      redirect: 'ed384f58875d01e242293142eed75a7a'
    },
    {
      path: '/ed384f58875d01e242293142eed75a7a',
      component: ReadPage
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
