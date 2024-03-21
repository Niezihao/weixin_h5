<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-22 01:17:10
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function go() {
  router.push("/giftIndex");
}
</script>

<template>
  <div class="main">
    <img
      class="img"
      src="../assets/icon/保存星球通行证.png"
      alt=""
      @click="go"
    />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/icon/通行证bg.png");
  background-repeat: round;
}
.img {
  position: absolute;
  width: 40vw;
  top: 85vh;
  left: 30vw;
}
</style>
