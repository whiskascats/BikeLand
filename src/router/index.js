import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'BikeStation',
    component: () => import('../views/BikeStation.vue')
  },
  {
    path: '/BikeRoute',
    name: 'BikeRoute',
    component: () => import('../views/BikeRoute.vue')
  },
  {
    path: '/Attractions',
    name: 'Attractions',
    component: () => import('../views/Attractions.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  next();
});

export default router