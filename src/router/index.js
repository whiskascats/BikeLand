import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/BikeStation.vue')
  },
  {
    path: '/BikeStation',
    name: 'BikeStation',
    component: () => import('../views/BikeStation.vue')
  },
  {
    path: '/BikeRoute',
    name: 'BikeRoute',
    component: () => import('../views/BikeRoute.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router