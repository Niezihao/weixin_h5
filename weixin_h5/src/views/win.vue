<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-21 00:08:24
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function go() {
  router.push("/page");
}
function goBack() {
  router.push("/giftIndex");
}
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
