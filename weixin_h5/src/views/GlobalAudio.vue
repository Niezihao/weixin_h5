<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-18 23:09:27
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-20 17:00:08
-->
<template>
  <div>
    <audio ref="audioRef" src="../../public/麻烦星球 音乐loop - 2 -.wav" loop></audio>
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
