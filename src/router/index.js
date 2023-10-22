import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/swipe',
    component: () => import('../views/SwipeView.vue')
  },
  {
    path: '/canvas',
    component: () => import('../views/CanvasView.vue')
  },
  {
    path: '/indicators',
    component: () => import('../views/IndicatorsView.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
