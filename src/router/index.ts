import * as VueRouter from 'vue-router'
import Unauthorized from '../pages/Unauthorized.vue'
import NotFoundView from '../pages/NotFoundView.vue'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/recargas', component: () => import('../pages/Recargas.vue') },
  { path: '/401', component: Unauthorized },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

export default router
