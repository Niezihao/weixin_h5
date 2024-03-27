<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-28 01:32:04
-->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import "@/../node_modules/animate.css/animate.css";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const isMusic = ref(false);
const router = useRouter();
let timer = "";

function close() {
  isMusic.value = true;
  store.commit("setMusicInfo", { playing: false });
}
function open() {
  isMusic.value = false;
  store.commit("increment");
  store.commit("setMusicInfo", { playing: true });
}

onMounted(() => {
  timer = setTimeout(() => {
    router.push("page");
  }, 4000);
});
onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<template>
  <main class="img" style="position: relative">
    <img
      v-if="!isMusic"
      class="music"
      src="../../assets/音乐.png"
      alt=""
      @click="close"
    />
    <img
      v-if="isMusic"
      class="music"
      src="../../assets/关闭音乐.png"
      alt=""
      @click="open"
    />
    <img
      class="fire animate__animated animate__flip animate__slower"
      src="../../assets/animation/e/飞行器.png"
      alt="Image"
    />
    <img class="qiu" src="../../assets/animation/e/星球.png" alt="Image" />
    <img
      class="qiu1 animate__animated animate__flip animate__slower"
      src="../../assets/animation/e/星球1.png"
      alt="Image"
    />
    <img
      class="qiu2 animate__animated animate__flip animate__slower"
      src="../../assets/animation/e/星球2.png"
      alt="Image"
    />
  </main>
</template>

<style scoped>
.music {
  position: absolute;
  width: 6vw;
  top: 2vh;
  left: 5vw;
}
.img {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/animation/e/img4.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.fire {
  position: absolute;
  width: 40vw;
  top: 45vh;
  left: 37vw;
}
.qiu {
  position: absolute;
  width: 71vw;
  right: 0;
  bottom: 0;
}
.qiu1 {
  position: absolute;
  width: 27vw;
  top: 35vh;
  left: 10vw;
}
.qiu2 {
  position: absolute;
  width: 15vw;
  top: 9vh;
  left: 80vw;
}
.animate__animated {
  --animate-delay: 0.5s;
  --animate-duration: 1.5s;
}
</style>
