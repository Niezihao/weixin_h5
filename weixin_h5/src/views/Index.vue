<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-10 17:26:44
-->
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance(); //来获取全局 globalProperties 中配置的信息
const headimgurl = ref("");
const nickname = ref("");

async function getCode() {
  const res = await proxy.$axios.get("/getCode");
  console.log("res", res);
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

onMounted(() => {
  console.log("onMounted");
  toLogin();
});
</script>

<template>
  <main>
    <img :src="currentImage" alt="Image" />
    <!-- <button @click="toLogin">登录</button>
    {{ nickname }}
    <img :src="headimgurl" alt="" />
    <div>
      {{ nickname }}
    </div> -->
  </main>
</template>
