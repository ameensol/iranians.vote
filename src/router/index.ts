import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.app },
  },
  {
    path: '/',
    name: ROUTE_NAMES.app,
    component: () => import('@/pages/Homepage'),
  },
  {
    path: '/doc',
    name: ROUTE_NAMES.techDoc,
    component: () => import('@/pages/TechDoc'),
  },
  {
    path: '/guide/:deviceType',
    name: ROUTE_NAMES.guide,
    component: () => import('@/pages/Guide'),
  },
  {
    path: '/about',
    name: ROUTE_NAMES.about,
    component: () => import('@/pages/About'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export { router, useRouter, useRoute }
