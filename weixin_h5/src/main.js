/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-24 22:56:37
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
// import "./assets/sucai/风格1-1.png";
// import "./assets/sucai/风格1-2.png";
// import "./assets/sucai/风格1-3.png";
// import "./assets/sucai/风格1-4.png";
// import "./assets/sucai/风格1-5.png";
// import "./assets/sucai/风格1-6.png";
// import "./assets/sucai/风格2-1.png";
// import "./assets/sucai/风格2-2.png";
// import "./assets/sucai/风格2-3.png";
// import "./assets/sucai/风格2-4.png";
// import "./assets/sucai/风格2-5.png";
// import "./assets/sucai/风格2-6.png";
// import "./assets/sucai/风格3-1.png";
// import "./assets/sucai/风格3-2.png";
// import "./assets/sucai/风格3-3.png";
// import "./assets/sucai/风格3-4.png";
// import "./assets/sucai/风格3-5.png";
// import "./assets/sucai/风格3-6.png";
// import "./assets/sucai/风格3-7.png";
// import "./assets/sucai/风格3-8.png";
// import "./assets/sucai/插画1.png";
// import "./assets/sucai/插画2.png";
// import "./assets/sucai/插画3.png";
// import "./assets/关闭音乐.png";
// import "./assets/填写信息界面.png";
// import "./assets/我的礼品.png";
// import "./assets/音乐.png";
// import "./assets/address.png";
// import "./assets/change.png";
// import "./assets/discount.png";
// import "./assets/getGift.png";
// import "./assets/goTongxinzheng.png";
// import "./assets/img1.png";
// import "./assets/img2.png";
// import "./assets/img3.png";
// import "./assets/img4.png";
// import "./assets/img5.png";
// import "./assets/img6.png";
// import "./assets/isdiscount.png";
// import "./assets/iswin.png";
// import "./assets/logo.svg";
// import "./assets/myGift.png";
// import "./assets/picture.png";
// import "./assets/save_btn.png";
// import "./assets/roles.png";
// import "./assets/tip.png";
// import "./assets/toMyGift.png";
// import "./assets/win.png";


const app = createApp(App)
app.config.globalProperties.$wx = wx
app.use(router)
app.use(Vant)
app.use(store);
app.mount('#app')
app.config.globalProperties.$axios = axios;