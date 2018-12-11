
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/alterar-dados', component: () => import('pages/Configuracao/AlterarDados.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginTemplate.vue'),
  }
]


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
