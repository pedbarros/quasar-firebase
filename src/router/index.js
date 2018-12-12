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
    const paginasPublicas = ['/login'];
    const autenticacaoRequerida = !paginasPublicas.includes(to.path);

    let usuarioLogado = !!AUTH.currentUser; 
    
    if (autenticacaoRequerida && !usuarioLogado) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  })

  return Router
}
