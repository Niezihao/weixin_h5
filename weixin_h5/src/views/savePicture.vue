<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 09:33:35
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
import dayjs from "dayjs";

let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
const { proxy } = getCurrentInstance();
const router = useRouter();

const formattedNow = ref("");
const timestamp = ref("");
const isResImg = ref(false);
const text = ref("");

function go() {
  // 获取你想要转换为图片的DOM元素
  // var domElement = document.getElementById("imgBg");
  // // 使用html2canvas将DOM转换为canvas
  // html2canvas(domElement, {
  //   // 可选配置项，比如解决跨域图像问题
  //   useCORS: true,
  //   scale: 2,
  //   backgroundColor: "#101a2c",
  //   // 其他配置...
  // }).then(function (canvas) {
  //   // canvas.toDataURL()将canvas内容转换为data URI格式
  //   var imgSrc = canvas.toDataURL("image/png");
  //   // // 创建一个可下载的链接
  //   // var link = document.createElement("a");
  //   // link.download = "screenshot.png"; // 设置下载的文件名
  //   // link.href = imgSrc; // 设置链接的href为图片数据
  //   // // 触发点击事件以下载图片
  //   // document.body.appendChild(link);
  //   // link.click();
  //   // document.body.removeChild(link);
  //   let img = new Image();
  //   img.setAttribute("crossOrigin", "Anonymous");
  //   img.src = imgSrc;
  //   // 当图片加载完成后，将其添加到DOM中并设置样式
  //   img.onload = function () {
  //     // 创建一个容器或其他现有元素来包裹图片
  //     let container = document.getElementById("main");
  //     img.className = "resImg"; // 假设有一个名为'image-container'的CSS类来设置样式
  //     // 直接设置图片样式（也可以通过类名间接设置）
  //     // img.style.width = "200px";
  //     // img.style.height = "400px";
  //     img.style.width = viewportWidth * 0.8 + "px";
  //     img.style.width = viewportWidth * 0.8 + "px";
  //     img.style.height = viewportHeight * 0.7 + "px";
  //     img.style.position = "absolute";
  //     img.style.top = "10vh";
  //     img.style.left = "10vw";
  //     // 将图片添加到容器中
  //     container.appendChild(img);
  //   };
  //   isResImg.value = true;
  // });
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

onMounted(() => {
  formattedNow.value = dayjs().format("YYYY.MM.DD");
  timestamp.value = Math.floor(Date.now() / 1000);
  setTimeout(() => {
    var domElement = document.getElementById("imgBg");
    // 使用html2canvas将DOM转换为canvas
    html2canvas(domElement, {
      // 可选配置项，比如解决跨域图像问题
      useCORS: true,
      scale: 2,
      backgroundColor: "#101a2c",
      // 其他配置...
    }).then(function (canvas) {
      // canvas.toDataURL()将canvas内容转换为data URI格式
      var imgSrc = canvas.toDataURL("image/png");

      let img = new Image();
      img.setAttribute("crossOrigin", "Anonymous");
      img.src = imgSrc;
      // 当图片加载完成后，将其添加到DOM中并设置样式
      img.onload = function () {
        // 创建一个容器或其他现有元素来包裹图片
        let container = document.getElementById("main");
        img.className = "resImg"; // 假设有一个名为'image-container'的CSS类来设置样式
        // 直接设置图片样式（也可以通过类名间接设置）
        // img.style.width = "200px";
        // img.style.height = "400px";
        img.style.width = viewportWidth * 0.8 + "px";
        img.style.width = viewportWidth * 0.8 + "px";
        img.style.height = viewportHeight * 0.7 + "px";
        img.style.position = "absolute";
        img.style.top = "10vh";
        img.style.left = "10vw";
        // 将图片添加到容器中
        container.appendChild(img);
        text.value = "长按保存星球通行证!";
      };
      isResImg.value = true;
    });
  }, 200);
});
</script>

<template>
  <div id="main" class="main">
    <div class="text">
      {{ text }}
    </div>
    <img v-if="isResImg" class="resImg" id="resImg" alt="" />

    <div v-else class="imgBg" id="imgBg">
      <div class="font1">{{ name ? name : "" }}aa</div>
      <div class="font2">{{ formattedNow }}</div>
      <div class="font4">{{ formattedNow }}</div>
      <div class="font3">{{ timestamp }}</div>
      <img class="imgPt" :src="picture" alt="" />
    </div>

    <!-- <img class="imgBG" :src="picture" alt="" /> -->
    <img class="img" src="../assets/icon/进入抽奖页.png" alt="" @click="go" />
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
  width: 34%;
  height: 25.75vh;
  top: 40%;
  left: 16%;
}
.imgBg {
  position: relative;
  width: 100vw;
  height: 100vh;
  /* top: 10vh;
  left: 10vw; */
  background: url("../assets/icon/通行证bg5.png");
  background-repeat: round;
  background-size: 100vw 100vh;
}
/* .resImg {
  width: 80vw;
  height: 70vh;
  top: 10vh;
  left: 10vw;
} */
.font2 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 34.5%;
  left: 31%;
  font-size: 15px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
.font3 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 34.5%;
  left: 14%;
  font-size: 15px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
.font1 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 41%;
  left: 59%;
  font-family: "胡晓波骚包体";
}
.font4 {
  position: absolute;
  /* width: 25%;
  height: 18.75vh; */
  top: 48.5%;
  left: 59%;
  font-size: 15px;
  /* transform: scale(0.6); */
  font-family: "胡晓波骚包体";
}
.text {
  color: azure;
  position: absolute;
  width: 50vw;
  top: 6vw;
  left: 25vw;
  font-family: "胡晓波骚包体";
}
</style>
