<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-21 22:40:55
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

function goGift() {
  router.push("/myGift");
}
function goBack() {
  router.push("/wirteAddress");
}
async function lottery() {
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
</script>

<template>
  <div class="main">
    <!-- <img class="imgx" src="../assets/icon/x1.png" alt="" @click="goBack" /> -->
    <img
      class="img"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      alt=""
      @click="goBack"
    />
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
    <img class="toshop" src="../assets/icon/去三福商城.png" alt="" />
    <img class="bottom" src="../assets/icon/bottom.png" alt="" />
  </div>
</template>

<style scoped>
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
  width: 90%;
  height: 60vh;
  top: 13%;
  left: 5%;
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
</style>
