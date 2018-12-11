import Vue from 'vue'
import VueRouter from 'vue-router'

import { AUTH } from "plugins/firebase";
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })


  Router.beforeEach((to, from, next) => {
    AUTH.onAuthStateChanged((user) => {
      if (!user) {
        console.log("Não pode acessar, pois não está logado!");
        next("/login")
      }
    });
  })

  return Router
}
