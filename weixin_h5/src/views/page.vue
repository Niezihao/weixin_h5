<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-14 00:22:03
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const show = ref(false);
const router = useRouter();

function go() {
  console.log(go);
  router.push("/createPicture");
}
onMounted(() => {});
</script>

<template>
  <main>
    <div style="position: relative">
      <div class="main" @click.prevent="show = !show"></div>
      <van-button class="btn" @click="go">生成通行证</van-button>
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
.img_tip {
  /* width: 100%;
  height: 100%; */
}
.btn {
  position: absolute;
  top: 80vh;
  left: 50%;
  transform: translate(-40px);
}
</style>
