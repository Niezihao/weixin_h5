<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-28 01:18:46
 * @FilePath: \weixin_h5\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref, onMounted, watch, getCurrentInstance } from "vue";
import { RouterView } from "vue-router";
import GlobalAudio from "./views/GlobalAudio.vue";
import { useStore } from "vuex";
import { wechatConfig } from "./wechatSdk.js";
import sound from "./assets/麻烦星球 音乐.wav";

const { proxy } = getCurrentInstance();
const store = useStore();
const globalAudio = ref();
const audio = new Audio(sound);
audio.loop = false;

watch(
  () => store.state.musicInfo.playing,
  (newPlayingStatus, oldPlayingStatus) => {
    // 对新的播放状态进行相应处理

    if (newPlayingStatus) {
      store.state.count > 0 ? musicPlay(true) : autoPlayMusic();
    } else {
      musicPlay(false);
    }
  }
);

function autoPlayMusic() {
  // 自动播放音乐效果，解决浏览器或者APP自动播放问题
  function musicInBrowserHandler() {
    musicPlay(true);
    document.body.removeEventListener("touchstart", musicInBrowserHandler);
  }
  document.body.addEventListener("touchstart", musicInBrowserHandler);

  // 自动播放音乐效果，解决微信自动播放问题
  function musicInWeixinHandler() {
    console.log("musicPlay");
    musicPlay(true);
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        musicPlay(true);
      },
      false
    );
    document.removeEventListener("DOMContentLoaded", musicInWeixinHandler);
  }
  document.addEventListener("DOMContentLoaded", musicInWeixinHandler);
}
function musicPlay(isPlay) {
  if (isPlay && globalAudio.value) {
    audio.play();
  }
  if (!isPlay) {
    audio.pause();
  }
}

onMounted(async () => {
  wechatConfig(
    proxy,
    "分享标题",
    "分享描述",
    "分享链接",
    "分享封面（配图）"
  ).then((res) => {});
});
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <GlobalAudio ref="globalAudio"></GlobalAudio>
  <RouterView />
</template>

<style scoped></style>
