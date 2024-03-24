<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-24 22:56:56
 * @FilePath: \weixin_h5\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref, onMounted, watch, getCurrentInstance } from "vue";
import { RouterView } from "vue-router";
import GlobalAudio from "./views/GlobalAudio.vue";
import { useStore } from "vuex";
import axios from "axios";
import { wechatConfig } from "./wechatSdk.js";
import sound from "./assets/麻烦星球 音乐loop - 2 -.wav";

const { proxy } = getCurrentInstance();
const store = useStore();
const globalAudio = ref();
const audio = new Audio(sound);

watch(
  () => store.state.musicInfo.playing,
  (newPlayingStatus, oldPlayingStatus) => {
    // 对新的播放状态进行相应处理

    if (newPlayingStatus) {
      console.log(store.state.count);
      store.state.count > 0 ? musicPlay(true) : autoPlayMusic();
    } else {
      musicPlay(false);
    }

    // globalAudio.value.play();
  }
);

function autoPlayMusic() {
  console.log("musicPlay");
  // 自动播放音乐效果，解决浏览器或者APP自动播放问题
  function musicInBrowserHandler() {
    console.log("musicPlay");
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
        console.log("musicPlay");
        musicPlay(true);
      },
      false
    );
    document.removeEventListener("DOMContentLoaded", musicInWeixinHandler);
  }
  document.addEventListener("DOMContentLoaded", musicInWeixinHandler);
}
function musicPlay(isPlay) {
  // var media = document.querySelector("#bg-music");

  if (isPlay && globalAudio.value) {
    console.log("musicPlay");
    // audio.loop = true;
    audio.play();

    // globalAudio.value.play();
  }
  if (!isPlay) {
    audio.pause();
    // globalAudio.value.pause();
  }
}

onMounted(async () => {
  wechatConfig(
    proxy,
    "分享标题",
    "分享描述",
    "分享链接",
    "分享封面（配图）"
  ).then((res) => {
    //需要获取方法执行结果，可以加.then这一段；
    //不需要可以不加
  });
  // loadImg(imgList);

  axios.put("/log/update");
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
