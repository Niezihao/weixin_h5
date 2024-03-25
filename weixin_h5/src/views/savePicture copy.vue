<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-25 14:46:14
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
import dayjs from "dayjs";

const { proxy } = getCurrentInstance();
const router = useRouter();

const formattedNow = ref("");
const timestamp = ref("");

function go() {
  // 获取你想要转换为图片的DOM元素
  var domElement = document.getElementById("main");

  // 使用html2canvas将DOM转换为canvas
  html2canvas(domElement, {
    // 可选配置项，比如解决跨域图像问题
    useCORS: true,
    scale: 2,
    // 其他配置...
  }).then(function (canvas) {
    // // canvas.toDataURL()将canvas内容转换为data URI格式
    // var imgSrc = canvas.toDataURL("image/png");
    // // 创建一个可下载的链接
    // var link = document.createElement("a");
    // link.download = "screenshot.png"; // 设置下载的文件名
    // link.href = imgSrc; // 设置链接的href为图片数据
    // // 触发点击事件以下载图片
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  });
  // let wx_host = `${location.origin}${location.pathname}${location.search}`;
  // proxy.$wx.updateAppMessageShareData({
  //   title: share_title || "默认标题", // 分享标题
  //   desc: share_desc || "默认描述", // 分享描述
  //   link: `${wx_host}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //   imgUrl: "", // 分享后显示的封面图
  //   success: function () {
  //     console.info("分享给朋友");
  //   }, // 设置成功回调
  // });
  // wx.uploadImage({
  //   localId: "", // 需要上传的图片的本地ID，由chooseImage接口获得
  //   isShowProgressTips: 1, // 默认为1，显示进度提示
  //   success: function (res) {
  //     var serverId = res.serverId; // 返回图片的服务器端ID
  //     wx.downloadImage({
  //       serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
  //       isShowProgressTips: 1, // 默认为1，显示进度提示
  //       success: function (res) {
  //         var localId = res.localId; // 返回图片下载后的本地ID
  //       },
  //     });
  //   },
  // });
  router.push("/giftIndex");
}
const picture = computed(() => {
  let picture = sessionStorage.getItem("picture");
  return picture;
});
const name = computed(() => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.name) {
    return userInfo.name;
  } else {
    return "";
  }
});
function touchstart() {
  console.log("touchstart");
}
function touchend() {
  console.log("touchend");
}
onMounted(() => {
  formattedNow.value = dayjs().format("YYYY.MM.DD");
  timestamp.value = Math.floor(Date.now() / 1000);
});
</script>

<template>
  <div id="main" class="main">
    <div class="imgBg"></div>

    <div class="font1">{{ name ? name : "" }}</div>
    <div class="font2">{{ formattedNow }}</div>
    <div class="font4">{{ formattedNow }}</div>
    <div class="font3">{{ timestamp }}</div>
    <img class="imgPt" :src="picture" alt="" />
    <!-- <img class="imgBG" :src="picture" alt="" /> -->
    <img
      class="img"
      src="../assets/icon/保存星球通行证.png"
      alt=""
      @click="go"
    />
  </div>
</template>

<style scoped>
@font-face {
  font-family: "胡晓波骚包体";
  src: url("../assets/font/胡晓波骚包体.otf");
}

.a {
  font-size: 11px;
  font-family: "SourceHanSansCN-Normal";
}
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/icon/通行证bg1.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.img {
  position: absolute;
  width: 40vw;
  top: 85vh;
  left: 30vw;
}
.imgPt {
  position: absolute;
  width: 25%;
  height: 18.75vh;
  top: 40%;
  left: 25%;
}
.imgBg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: url("../assets/icon/通行证bg2.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
.font2 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 35.5%;
  left: 35%;
  font-size: 12px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
.font3 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 35.5%;
  left: 23%;
  font-size: 12px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
.font1 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 40.5%;
  left: 58%;
  font-family: "胡晓波骚包体";
}
.font4 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 46%;
  left: 57%;
  font-size: 12px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
</style>
