<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-17 02:20:55
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function go() {
  console.log(go);
  router.push("/wirteAddress");
}
</script>

<template>
  <div class="main" @click="go"></div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/myGift.png");
  background-repeat: round;
}
</style>
