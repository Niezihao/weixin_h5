<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 11:42:05
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { buildPostAuthorizationHeader } from "../signatureHelper";

const { proxy } = getCurrentInstance();
const router = useRouter();

function go() {
  proxy.$wx.miniProgram.navigateTo({
    url: "../couponcenter/index/index", // 指定跳转至小程序页面的路径
    success: (res) => {
      console.log(res); // 页面跳转成功的回调函数
      // router.push("/myGift");
    },
    fail: (err) => {
      console.log(err); // 页面跳转失败的回调函数
    },
  });
}
function goBack() {
  router.push("/giftIndex");
}
function putWin() {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.curCusId) {
    axios.put("users/profile/update", {
      openId: userInfo.curCusId,
      prize: "coupon",
    });
    axios.post(
      "/ms-sanfu-spi-customer/v1/coupon/sendCoupon",
      {
        curCusId: userInfo.curCusId,
        couponId: "C20240314160000",
        shoId: userInfo.shoId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: buildPostAuthorizationHeader(
            "30009",
            userInfo.curCusId
          ),
          // 其他可能的header
        },
      }
    );
  }
}
onMounted(() => {
  putWin();
});
</script>

<template>
  <div class="main">
    <img class="img" src="../assets/icon/x.png" alt="" @click="goBack" />
    <img class="imgBtn" src="../assets/icon/立即领取.png" alt="" @click="go" />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/discount.png");
  background-repeat: round;
}
.img {
  position: absolute;
  width: 8vw;
  /* height: 3vh; */
  top: 27%;
  right: 12%;
}
.imgBtn {
  position: absolute;
  width: 40vw;
  height: 7vh;
  top: 74%;
  left: 30%;
}
</style>
