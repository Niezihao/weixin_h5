<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-12 23:13:58
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import AnimationPlayer from "./components/AnimationPlayer.vue";

const { proxy } = getCurrentInstance(); //来获取全局 globalProperties 中配置的信息
const headimgurl = ref("");
const nickname = ref("");

async function getCode() {
  const res = await proxy.$axios.get("/getCode");
  if (res) {
    window.location.href = res;
  }
}
async function getUserInfo() {
  const url_params = Object.fromEntries(
    window.location.search
      .slice(1)
      .split("&")
      .map((i) => i.split("="))
  );
  // console.log(url_params.code);
  const res = await proxy.$axios.post("/getUserInfo", {
    code: url_params.code,
  });
  if (res) {
    localStorage.setItem("userInfo", JSON.stringify(res));
    headimgurl.value = res.headimgurl;
    nickname.value = res;
  }
}
function isCode() {
  return window.location.search.includes("code=");
}

function toLogin() {
  if (isCode()) {
    getUserInfo();
  } else {
    getCode();
  }
}
const isWeixin = computed(() => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") != -1;
});
onMounted(() => {
  console.log("onMounted");
  console.log(isWeixin.value);
  // toLogin();
});
</script>

<template>
  <main>
    <div v-if="!isWeixin" class="toTip">请在微信客户端打开</div>

    <AnimationPlayer v-else></AnimationPlayer>
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
