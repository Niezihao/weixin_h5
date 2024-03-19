<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-18 23:09:27
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-19 22:50:42
-->
<template>
  <div>
    <audio ref="audioRef" src="../../public/69024145189042239.mp3"></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const audioRef = ref(null);

const play = () => {
  audioRef.value.play();
};

const pause = () => {
  audioRef.value.pause();
};

defineExpose({ play, pause });
</script>
