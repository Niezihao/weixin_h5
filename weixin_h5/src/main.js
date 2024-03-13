/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-13 23:56:19
 * @FilePath: \weixin_h5\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/axios';
// import './jssdk'
import Vant from 'vant'
import 'vant/lib/index.css';


const app = createApp(App)
app.use(router)
app.use(Vant)

app.mount('#app')
app.config.globalProperties.$axios = axios;