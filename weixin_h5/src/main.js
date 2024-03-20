/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-20 21:47:56
 * @FilePath: \weixin_h5\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/axios';
import Vant from 'vant'
import 'vant/lib/index.css';
import store from './store/index';
import wx from "weixin-js-sdk"
// import './common'


const app = createApp(App)
app.config.globalProperties.$wx = wx
app.use(router)
app.use(Vant)
app.use(store);
app.mount('#app')
app.config.globalProperties.$axios = axios;