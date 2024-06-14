import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Chart from '../pages/Chart.vue';
import Settings from '@/pages/Settings.vue';
import Calendar from '@/pages/Calendar.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart,
    },
  ],
});

export default router;
