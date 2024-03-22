<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-22 17:42:30
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();

function go() {
  let wx_host = `${location.origin}${location.pathname}${location.search}`
  proxy.$wx.updateAppMessageShareData({
    title: share_title || "默认标题", // 分享标题
    desc: share_desc || "默认描述", // 分享描述
    link: `${wx_host}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享后显示的封面图
    success: function () {
      console.info("分享给朋友");
    }, // 设置成功回调
  });
  router.push("/giftIndex");
}
</script>

<template>
  <div class="main">
    <img
      class="img"
      src="../assets/icon/保存星球通行证.png"
      alt=""
      @click="go"
    />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/icon/通行证bg.png");
  background-repeat: round;
}
.img {
  position: absolute;
  width: 40vw;
  top: 85vh;
  left: 30vw;
}
</style>
