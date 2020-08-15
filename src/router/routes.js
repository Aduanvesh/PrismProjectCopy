
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') }
    ]
  },
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
