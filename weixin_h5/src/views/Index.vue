<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-28 00:37:32
-->

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import AnimationPlayer from "./components/AnimationPlayer.vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { buildGetAuthorizationHeader1 } from "../signatureHelper";

const { proxy } = getCurrentInstance(); //来获取全局 globalProperties 中配置的信息
const router = useRouter();
const route = useRouter();
const userdata = ref({});

// 后台
async function login() {
  userdata.value.curCusId = userdata.value.cardid;
  console.log(userdata.value.curCusId);
  if (userdata.value.curCusId) {
    proxy.$axios
      .post("/users/login", {
        openId: userdata.value.curCusId,
      })
      .then((res) => {
        const userInfo = Object.assign(res, userdata.value);
        console.log(userInfo);
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      });

    axios
      .get(
        `/ms-sanfu-spi-customer/v1/customer/getCustomerInfo?curCusId=${userdata.value.curCusId}`,
        {
          headers: {
            Authorization: buildGetAuthorizationHeader1(
              "30009",
              userdata.value.curCusId
            ),
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.code == 200) {
          let nickName = res.data.data && res.data.data.nickName;
          sessionStorage.setItem("nickName", nickName);
        }
      });
  }
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

function getQueryParamsAsObject(url) {
  // 如果没有提供URL，默认使用当前页面的URL
  url = url || window.location.href;
  // 解析URL以获取查询字符串部分
  const queryString = url.split("?")[1];
  // 如果没有查询字符串，返回空对象
  if (!queryString) {
    return {};
  }
  // 将查询字符串分割成键值对数组
  const paramsArray = queryString.split("&");
  // 创建一个空对象用来存储参数
  const queryParams = {};
  // 遍历键值对数组并填充对象
  paramsArray.forEach((item) => {
    const [key, value] = item.split("=");
    queryParams[key] = decodeURIComponent(value); // 解码URI编码过的值
  });
  return queryParams;
}

onMounted(() => {
  userdata.value = getQueryParamsAsObject();
  login();
  axios.put("/log/update");
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
