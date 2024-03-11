<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-11 23:15:51
-->
<script setup>
import { ref, onMounted } from "vue";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import "@/../node_modules/animate.css/animate.css";

const imgLsit = ref([img1, img2, img3, img4, img5]);
const index = ref(0);

function play() {
  if (index.value !== 0) return;

  const timer = setInterval(() => {
    if (index.value > 3) {
      clearInterval(timer);
      console.log(index.value);
    } else {
      index.value++;
    }
  }, 1000);
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
      @click="play"
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
