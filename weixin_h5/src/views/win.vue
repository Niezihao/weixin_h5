<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 14:01:04
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

function go() {
  router.push("/wirteAddress");
}
function goBack() {
  router.push("/giftIndex");
}
function putWin() {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.curCusId) {
    axios.put("users/profile/update", {
      openId: userInfo.curCusId,
      prize: "box",
    });
  }
}
onMounted(() => {
  putWin();
});
</script>

<template>
  <div class="main">
    <img class="img" src="../assets/icon/x.png" alt="" @click="goBack" />
    <img class="imgBtn" src="../assets/icon/填写信息.png" alt="" @click="go" />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/win.png");
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
