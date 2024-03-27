<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-18 23:09:27
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 15:14:42
-->
<template>
  <div>
    <audio
      ref="audioRef"
      src="../assets/麻烦星球 音乐loop - 2 -.wav"
      loop
    ></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const audioRef = ref(null);
function autoPlayMusic() {
  window.onload = function () {
    // alert(typeof WeixinJSBridge);
    WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
      // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
      // alert(e.err_msg);
      musicPlay(true);
    });
  };
}
function musicPlay(isPlay) {
  // var media = document.querySelector("#bg-music");
  if (isPlay && audioRef.value) {
    console.log("musicPlay");
    audioRef.value.play();
  }
  if (!isPlay && !audioRef.value) {
    audioRef.value.pause();
  }
}
const play = () => {
  audioRef.value.play();
};

const pause = () => {
  audioRef.value.pause();
};

defineExpose({ autoPlayMusic, play, pause });
</script>
