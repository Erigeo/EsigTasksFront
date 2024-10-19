import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import HomeScreen from '@/views/HomeScreen.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
