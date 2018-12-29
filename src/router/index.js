import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Providers from '@/components/Providers'
import Provider from '@/components/Provider'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import About from '@/components/About'
import Profile from '@/components/Profile'
import NotFound from '@/components/NotFound'
// import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/providers',
      name: 'Providers',
      component: Providers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/provider/:id',
      name: 'Provider',
      component: Provider,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if ((requiresAuth && !currentUser) && to.path !== '/login') {
    next('login')
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

// router.beforeEach(async (to, from, next) => {
//   let currentUser = store.state.user
//   console.log(currentUser)
//   let requriesAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requriesAuth && !currentUser) {
//     await store.dispatch('signIn')
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
