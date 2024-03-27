<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 09:46:55
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { showSuccessToast, showFailToast } from "vant";

const { proxy } = getCurrentInstance();
const router = useRouter();

function goGift() {
  router.push("/myGift");
}
async function lottery() {
  if (prize.value) {
    showFailToast("已抽取礼品，不能重复抽取");
    return;
  }
  const res = await axios.get("users/box-number");
  if (res && res.data && res.data.count <= 45) {
    const randomValue = Math.random();
    if (randomValue < 0.98) {
      router.push("/discount");
    } else {
      router.push("/win");
    }
  } else {
    router.push("/discount");
  }
}
const imgUrl = computed(() => {
  let fileName = sessionStorage.getItem("fileName");
  return `${location.origin}/api/resource/static/${fileName}`;
});
const picture = computed(() => {
  let picture = sessionStorage.getItem("picture");
  return picture;
});
const prize = computed(() => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.prize) {
    return userInfo.prize;
  } else {
    return "";
  }
});

function getUserInfo() {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.curCusId) {
    axios.get(`users/profile/${userInfo.curCusId}`).then((res) => {
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(Object.assign(userInfo, res.data))
      );
    });
  }
}
function goMiniProgram() {
  // 小程序跳转方法
  proxy.$wx.miniProgram.navigateBack({
    delta: 1,
    fail: () => {
      wx.miniProgram.switchTab({
        url: "/pages/index/index",
      });
    },
  });
  // proxy.$wx.miniProgram.navigateTo({
  //   url: "../index/index", // 指定跳转至小程序页面的路径
  //   success: (res) => {
  //     console.log(res); // 页面跳转成功的回调函数
  //   },
  //   fail: (err) => {
  //     console.log(err); // 页面跳转失败的回调函数
  //   },
  // });
}
onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div class="main">
    <!-- <img class="imgx" src="../assets/icon/x1.png" alt="" @click="goBack" /> -->
    <div class="text">长按保存星球快照！</div>
    <img class="img" :src="picture" alt="" />
    <img
      class="mygift"
      src="../assets/icon/我的礼品.png"
      alt=""
      @click="goGift"
    />
    <img
      class="lottery"
      src="../assets/icon/抽取礼品.png"
      alt=""
      @click="lottery"
    />
    <img
      class="toshop"
      src="../assets/icon/去三福商城.png"
      alt=""
      @click="goMiniProgram"
    />
    <img class="bottom" src="../assets/icon/bottom.png" alt="" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: "胡晓波骚包体";
  src: url("../assets/font/胡晓波骚包体.otf");
}
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #1d2643;
}
.imgx {
  position: absolute;
  width: 16px;
  top: 17%;
  right: 7%;
}
.img {
  position: absolute;
  width: 80%;
  height: 60vh;
  top: 13%;
  left: 10%;
  border-radius: 20px;
}
.mygift {
  width: 40%;
  position: absolute;
  left: 8%;
  bottom: 15%;
}
.lottery {
  width: 40%;
  position: absolute;
  left: 52%;
  bottom: 15%;
}
.toshop {
  position: absolute;
  left: 0;
  bottom: 7%;
  transform: scale(0.6);
}
.bottom {
  position: absolute;
  left: 24%;
  bottom: 4%;
  transform: scale(0.7);
}
.text {
  color: azure;
  position: absolute;
  width: 50vw;
  top: 10vw;
  left: 25vw;
  font-family: "胡晓波骚包体";
}
</style>
