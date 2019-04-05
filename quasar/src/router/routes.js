
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'signup', component: () => import('pages/Signup.vue') },
      { path: 'change_password', component: () => import('pages/ChangePassword.vue'), meta: { authRequired: true } },
      { path: 'recover_password', component: () => import('pages/RecoverPassword.vue') },
      { path: 'verify_email', component: () => import('pages/VerifyEmail.vue') },
      { path: 'some_protected_page', component: () => import('pages/SomeProtectedPage.vue'), meta: { authRequired: true } },
      { path: 'update_login', component: () => import('pages/UpdateLogin.vue') }
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
