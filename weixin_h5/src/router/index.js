/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-21 00:25:07
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
    },
    {
      path: '/win',
      name: 'win',
      component: () => import('../views/win.vue')
    },
    {
      path: '/discount',
      name: 'discount',
      component: () => import('../views/discount.vue')
    },
    {
      path: '/wirteAddress',
      name: 'wirteAddress',
      component: () => import('../views/wirteAddress.vue')
    },
    {
      path: '/myGift',
      name: 'myGift',
      component: () => import('../views/myGift.vue')
    },
    {
      path: '/giftIndex',
      name: 'giftIndex',
      component: () => import('../views/giftIndex.vue')
    },
    {
      path: '/savePicture',
      name: 'savePicture',
      component: () => import('../views/savePicture.vue')
    }
  ]
})

export default router
