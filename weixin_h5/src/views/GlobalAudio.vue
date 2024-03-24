<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-18 23:09:27
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-24 11:13:10
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
      console.log("musicPlay1");

      musicPlay(true);
    });
  };
  // // 自动播放音乐效果，解决浏览器或者APP自动播放问题
  // function musicInBrowserHandler() {
  //   console.log("musicPlay");
  //   musicPlay(true);
  //   document.body.removeEventListener("touchstart", musicInBrowserHandler);
  // }
  // document.body.addEventListener("touchstart", musicInBrowserHandler);

  // // 自动播放音乐效果，解决微信自动播放问题
  // function musicInWeixinHandler() {
  //   console.log("musicPlay");
  //   musicPlay(true);
  //   document.addEventListener(
  //     "WeixinJSBridgeReady",
  //     function () {
  //       console.log("musicPlay");
  //       musicPlay(true);
  //     },
  //     false
  //   );
  //   document.removeEventListener("DOMContentLoaded", musicInWeixinHandler);
  // }
  // document.addEventListener("DOMContentLoaded", musicInWeixinHandler);
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
