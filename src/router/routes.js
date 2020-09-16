import User from 'layouts/User.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'reset_password', component: () => import('pages/PasswordReset.vue') },
      { path: 'profile/:id', component: User }
    ]
  }, /*
  {
    path: '/profile/:id',
    component: User
  },

  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('layouts/User.vue') },
      { path: '/user/:id', component: User }
    ]
  }, */
  {
    path: '/memberships',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Memberships.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
