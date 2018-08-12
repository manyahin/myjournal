import Vue from 'vue'
import Router from 'vue-router'
import CreateNote from '@/components/CreateNote'
import ReadPage from '@/components/ReadPage'
import PageNotFound from '@/components/PageNotFound'
import Login from '@/components/Login'

import { store } from '@/store'
import auth from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: 'write'
    },
    {
      path: '/write',
      component: CreateNote,
      beforeEnter: (to, from, next) => {
        if (!auth.isLogin()) {
          store.commit('SET_LAYOUT', 'login-layout')
          next('/login')
        } else {
          store.commit('SET_LAYOUT', 'app-layout')
          return next()
        }
      }
    },
    {
      path: '/read',
      redirect: 'ed384f58875d01e242293142eed75a7a'
    },
    {
      path: '/ed384f58875d01e242293142eed75a7a',
      component: ReadPage,
      beforeEnter: (to, from, next) => {
        if (!auth.isLogin()) {
          store.commit('SET_LAYOUT', 'login-layout')
          return next('/login')
        } else {
          store.commit('SET_LAYOUT', 'app-layout')
          return next()
        }
      }
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   next()
  // }

  // if (auth.isLogin()) {
  //   console.log('yep!')
  // }
  // else {
  //   console.log('nope')
  //   next('/login')
  // }
  
  next()
})

export default router
