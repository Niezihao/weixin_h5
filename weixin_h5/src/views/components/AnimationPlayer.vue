<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 22:47:00
-->
<script setup>
import { ref, onMounted } from "vue";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import "@/../node_modules/animate.css/animate.css";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const imgLsit = ref([img1, img2, img3, img4, img5]);
const index = ref(0);
const isMusic = ref(false);
const router = useRouter();

function play() {
  if (index.value !== 0) return;
  router.push("Animation1");
  // const timer = setInterval(() => {
  //   if (index.value > 3) {
  //     clearInterval(timer);
  //     router.push("/page");
  //   } else {
  //     index.value++;
  //   }
  // }, 3000);
}
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
  store.commit("setMusicInfo", { playing: true });
  // play();
});
</script>

<template>
  <main class="main" style="position: relative" @click.once="play">
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
      class="img animate__animated animate__bounce"
      src="../../assets/animation/a/星球.png"
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
.main {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/animation/a/1登录页.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.img {
  position: absolute;
  top: 50vh;
  width: 60vw;
  left: 20vw;
  --animate-duration: 2s;
}
</style>
