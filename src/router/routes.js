const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/IndexPage', component: () => import('pages/IndexPage.vue'), meta: { login: false, admin: false } },
      { path: '/ImagePage', component: () => import('pages/ImagePage.vue'), meta: { login: false, admin: false } },
      { path: '/PTTPage', component: () => import('pages/PTTPage.vue'), meta: { login: false, admin: false } },
      { path: '/ActivityPage', component: () => import('pages/ActivityPage.vue'), meta: { login: false, admin: false } },
      { path: '/PTTIndependentPage/:theme', component: () => import('pages/PTTIndependentPage.vue'), meta: { login: false, admin: false } },
      { path: '/LoginPage', component: () => import('pages/LoginPage.vue'), meta: { login: false, admin: false } },
      { path: '/RegisterPage', component: () => import('pages/RegisterPage.vue'), meta: { login: false, admin: false } },
      { path: '/UserPage', component: () => import('pages/UserPage.vue'), meta: { login: true, admin: false } }
    ]
  },
  {
    path: '/setting',
    component: () => import('layouts/SettingLayout.vue'),
    children: [
      { path: '/setting/PhotoSettingPage', component: () => import('pages/back/PhotoSettingPage.vue'), meta: { login: true, admin: true } },
      { path: '/setting/ActivitySettingPage', component: () => import('pages/back/ActivitySettingPage.vue'), meta: { login: true, admin: true } },
      { path: '/setting/PTTSettingPage', component: () => import('pages/back/PTTSettingPage.vue'), meta: { login: true, admin: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
