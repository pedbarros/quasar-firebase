
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/change-data', name: "ChangeData", component: () => import('pages/Configuration/ChangeData.vue') },
    ]
  },

  {
    path: '/customer',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'add', name: "AddCustomer", component: () => import('pages/Customer/Add.vue') },
      { path: 'list', name: "ListCustomers", component: () => import('pages/Customer/List.vue') },
    ]
  },


  {
    path: '',
    component: () => import('layouts/LoginTemplate.vue'), 
    children: [
      { path: 'login', component: () => import('pages/Auth/Login.vue') }, 
      { path: 'register', name: "Register", component: () => import('pages/Auth/Register.vue') }
    ]
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
