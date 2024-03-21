<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-21 22:54:23
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

const { proxy } = getCurrentInstance();
const store = useStore();
const globalAudio = ref();

watch(
  () => store.state.musicInfo.playing,
  (newPlayingStatus, oldPlayingStatus) => {
    // 对新的播放状态进行相应处理
    globalAudio.value.play();
  }
);
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
  await axios.put("/log/update");
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
