<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-17 02:27:34
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const show = ref(false);
const router = useRouter();

function go() {
  router.push("/createPicture");
}
function toMyGift() {
  router.push("/myGift");
}
onMounted(() => {});
</script>

<template>
  <main>
    <div style="position: relative">
      <div class="main" @click.prevent="show = !show"></div>
      <van-button class="btn" @click="go">生成通行证</van-button>
      <img
        @click="toMyGift"
        class="myGift"
        src="../assets/toMyGift.png"
        alt=""
      />
    </div>

    <van-popup v-model:show="show">
      <img class="img_tip" src="../assets/tip.png" alt=""
    /></van-popup>
  </main>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img6.png");
  background-repeat: round;
}
.myGift {
  position: absolute;
  width: 120px;
  height: 5%;
  top: 94vh;
  left: 50%;
  transform: translate(-60px);
}
.img_tip {
  /* width: 100%;
  height: 100%; */
}
.btn {
  position: absolute;
  width: 220px;
  top: 80vh;
  left: 50%;
  transform: translate(-110px);
}
</style>
