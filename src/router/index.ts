import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/modules/landing/pages/LandingPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/modules/test/pages/TestPage.vue'),
    },
  ],
});

export default router;

