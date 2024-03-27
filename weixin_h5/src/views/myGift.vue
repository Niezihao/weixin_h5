<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 09:46:31
-->
<script>
export default {
  beforeRouteEnter(to, from) {
    console.log("salesOrder beforeRouteEnter", to, from);
    sessionStorage.setItem("myGiftPath", from.path);
  },
};
</script>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const { proxy } = getCurrentInstance();

function go() {
  router.push("/wirteAddress");
}
function goBack() {
  const path = sessionStorage.getItem("myGiftPath");
  if (path == "/page") {
    router.push(path);
  } else if (path == "/giftIndex") {
    router.push(path);
  } else if (path == "/win") {
    router.push("/giftIndex");
  } else if (path == "/discount") {
    router.push("/giftIndex");
  } else {
    router.push("/page");
  }
}
const prize = computed(() => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.prize) {
    return userInfo.prize;
  } else {
    return "";
  }
});

function goMiniProgram() {
  // 小程序跳转方法
  proxy.$wx.miniProgram.navigateBack({
    delta: 1,
    fail: () => {
      wx.miniProgram.switchTab({
        url: "/pages/index/index",
      });
    },
  });

  // proxy.$wx.miniProgram.navigateTo({
  //   url: "../index/index", // 指定跳转至小程序页面的路径
  //   success: (res) => {
  //     console.log(res); // 页面跳转成功的回调函数
  //   },
  //   fail: (err) => {
  //     console.log(err); // 页面跳转失败的回调函数
  //   },
  // });
}
function goGift() {
  // 小程序跳转方法
  // proxy.$wx.miniProgram.navigateBack()({});

  proxy.$wx.miniProgram.navigateTo({
    url: "../couponcenter/index/index", // 指定跳转至小程序页面的路径
    success: (res) => {
      console.log(res); // 页面跳转成功的回调函数
    },
    fail: (err) => {
      console.log(err); // 页面跳转失败的回调函数
    },
  });
}
function getUserInfo() {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.curCusId) {
    axios.get(`users/profile/${userInfo.curCusId}`).then((res) => {
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(Object.assign(userInfo, res.data))
      );
    });
  }
}
onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div class="main">
    <div class="goShop" @click="goMiniProgram"></div>
    <img class="imgx1" src="../assets/我的礼品.png" alt="" />
    <img class="imgx" src="../assets/icon/x1.png" alt="" @click="goBack" />
    <img
      v-if="prize === 'box'"
      class="img"
      src="../assets/iswin.png"
      alt=""
      @click="go"
    />
    <img
      v-if="prize === 'coupon'"
      class="img"
      src="../assets/isdiscount.png"
      alt=""
      @click="goGift"
    />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/myGift.png");
  background-repeat: round;
}
.imgx {
  position: absolute;
  width: 16px;
  top: 10%;
  right: 7%;
}
.imgx1 {
  position: absolute;
  width: 22vw;
  top: 10%;
  left: 7%;
}
.img {
  position: absolute;
  width: 90vw;
  height: 17vh;
  top: 14%;
  left: 5%;
}
.goShop {
  position: absolute;
  width: 60vw;
  height: 6vh;
  left: 20vw;
  bottom: 4vh;
}
</style>
