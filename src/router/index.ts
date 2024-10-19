import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import HomeScreen from '@/views/HomeScreen.vue'
import EmployeeView from '@/views/EmployeeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  },
  {
    path: '/EmployeePage',
    name: 'EmployeePage',
    component: EmployeeView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
