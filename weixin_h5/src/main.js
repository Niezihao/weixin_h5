/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 15:10:29
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/axios';
import Vant from 'vant'
import 'vant/lib/index.css';
import store from './store/index';
import wx from "weixin-js-sdk"


const app = createApp(App)
app.config.globalProperties.$wx = wx
app.use(router)
app.use(Vant)
app.use(store);
app.mount('#app')
app.config.globalProperties.$axios = axios;