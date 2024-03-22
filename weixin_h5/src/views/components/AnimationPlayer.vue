<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-22 14:28:06
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
const router = useRouter();

function play() {
  store.commit("setMusicInfo", { playing: true });
  if (index.value !== 0) return;
  index.value = 1;
  const timer = setInterval(() => {
    if (index.value > 3) {
      clearInterval(timer);
      router.push("/page");
    } else {
      index.value++;
    }
  }, 1500);
}

onMounted(() => {
  // play();
});
</script>

<template>
  <main>
    <img
      class="img animate__animated animate__zoomIn"
      :src="imgLsit[index]"
      alt="Image"
      @click.once="play"
    />
  </main>
</template>

<style scoped>
.img {
  width: 100vw;
  height: 100vh;
  background-repeat: round;
  background-size: 100vw 100vh;
}
</style>
