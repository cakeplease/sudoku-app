import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/instructions'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/instructions'
      },
      {
        path: 'instructions',
        component: () => import('@/views/Instructions.vue')
      },
      {
        path: 'play',
        component: () => import('@/views/Play.vue')
      },
      {
        path: 'create_board',
        component: () => import('@/views/CreateBoard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
