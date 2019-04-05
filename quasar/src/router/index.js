import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/
  // sends to /login if login is required but not logged in
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(routeInfo => {
      return routeInfo.meta.authRequired === true
    })) {
      if (firebase.auth().currentUser && (firebase.auth().currentUser.emailVerified === true)) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })

  return Router
}
