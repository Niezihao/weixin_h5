/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-14 00:23:08
 */
import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('../views/page.vue')
    },
    {
      path: '/createPicture',
      name: 'createPicture',
      component: () => import('../views/createPicture.vue')
    }
  ]
})

export default router
