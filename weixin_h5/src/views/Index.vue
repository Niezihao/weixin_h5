<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-22 01:20:02
-->

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import AnimationPlayer from "./components/AnimationPlayer.vue";
import { useRouter, useRoute } from "vue-router";

const { proxy } = getCurrentInstance(); //来获取全局 globalProperties 中配置的信息
const router = useRouter();
const route = useRouter();
const headimgurl = ref("");
const nickname = ref("");

// 微信授权
// async function getCode() {
//   const res = await proxy.$axios.get("/getCode");
//   if (res) {
//     window.location.href = res;
//   }
// }
// async function getUserInfo() {
//   const url_params = Object.fromEntries(
//     window.location.search
//       .slice(1)
//       .split("&")
//       .map((i) => i.split("="))
//   );
//   // console.log(url_params.code);
//   const res = await proxy.$axios.post("/getUserInfo", {
//     code: url_params.code,
//   });
//   if (res) {
//     localStorage.setItem("userInfo", JSON.stringify(res));
//     headimgurl.value = res.headimgurl;
//     nickname.value = res;
//   }
// }
// function isCode() {
//   return window.location.search.includes("code=");
// }

// function toLogin() {
//   if (isCode()) {
//     getUserInfo();
//   } else {
//     getCode();
//   }
// }

// 后台
async function login() {
  const res = await proxy.$axios.post("/users/login", {
    openId: "",
  });
}

// 判断是否微信浏览器环境
const isWeixin = computed(() => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("micromessenger") != -1) {
    // wx.miniProgram.getEnv((res) => {
    //   if (res.miniprogram) {
    //     console.log("在小程序内");
    //     return true;
    //   } else {
    //     console.log("不在小程序内");
    return true;
    //   }
    // });
  } else {
    console.log("不在微信浏览器内");
    return false;
  }
  // return ua.indexOf("micromessenger") != -1;
});

onMounted(() => {
  console.log("onMounted");
  console.log(isWeixin.value);
  // toLogin();
  console.log(route.query);
});
</script>

<template>
  <main>
    <div v-if="!isWeixin" class="toTip">请在微信客户端打开</div>

    <AnimationPlayer v-else></AnimationPlayer>
    {{ route.query }}
  </main>
</template>

<style scoped>
.toTip {
  position: relative;
  width: 300px;
  top: 200px;
  left: 50%;
  transform: translate(-150px);
  font-size: 30px;
}
</style>
