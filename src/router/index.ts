import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/participants',
      name: 'participants',
      component: () => import('@/views/Participants.vue')
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('@/views/Matches.vue')
    },
    {
      path: '/matches/:id',
      name: 'match-details',
      component: () => import('@/views/MatchDetails.vue')
    },
  ]
})

export default router
