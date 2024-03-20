<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-21 00:08:11
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function go() {
  router.push("/wirteAddress");
}
function goBack() {
  router.push("/giftIndex");
}
</script>

<template>
  <div class="main">
    <img class="imgx" src="../assets/icon/x1.png" alt="" @click="goBack" />
    <img class="img" src="../assets/isdiscount.png" alt="" />
    <img class="img" src="../assets/iswin.png" alt="" @click="go" />
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
  top: 17%;
  right: 7%;
}
.img {
  position: absolute;
  width: 90vw;
  height: 17vh;
  top: 21%;
  left: 5%;
}
</style>
