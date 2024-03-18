<template>
  <div>
    <audio ref="audioRef" src="../../public/69024145189042239.mp3"></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const audioRef = ref(null);
// const musicSrc = "../assets/PEN - 春日小夜曲.ogg";

const play = () => {
  audioRef.value.play();
};

const pause = () => {
  audioRef.value.pause();
};

defineExpose({ play, pause });
</script>
