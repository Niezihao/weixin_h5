<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-28 00:36:29
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
    router.push("Animation2");
  }, 8000);
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
      class="fire animate__animated animate__fadeInTopLeft animate__delay-2s"
      src="../../assets/animation/b/火球.png"
      alt="Image"
    />
    <img
      class="qiu animate__animated animate__slideInDown animate__delay-0.5s"
      src="../../assets/animation/b/星球.png"
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
  background: url("../../assets/animation/b/img1.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.fire {
  position: absolute;
  width: 38vw;
  top: 24vh;
  left: 12vw;
  --animate-duration: 6s;
}
.qiu {
  position: absolute;
  width: 80vw;
  top: 44vh;
  left: 21vw;
}
</style>
