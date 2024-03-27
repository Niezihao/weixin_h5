<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-28 00:28:37
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
    router.push("Animation4");
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
      class="fire animate__animated animate__fadeIn"
      src="../../assets/animation/d/_编组_.png"
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
  background: url("../../assets/animation/d/img3.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.fire1 {
}
.fire {
  position: absolute;
  width: 86vw;
  top: 29vh;
  left: 7vw;
  --animate-delay: 1.5s;
  --animate-duration: 2s;
}
.qiu {
  position: absolute;
  width: 80vw;
  top: 44vh;
  left: 21vw;
}
</style>
