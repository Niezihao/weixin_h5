<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-24 12:16:36
-->
<script>
export default {
  beforeRouteEnter(to, from) {
    console.log("salesOrder beforeRouteEnter", to, from);
    sessionStorage.setItem("myGiftPath", from.path);
  },
};
</script>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

function go() {
  router.push("/wirteAddress");
}
function goBack() {
  const path = sessionStorage.getItem("myGiftPath");
  if (path == "/page") {
    router.push(path);
  } else if (path == "/giftIndex") {
    router.push(path);
  } else if (path == "/win") {
    router.push("/giftIndex");
  } else if (path == "/discount") {
    router.push("/giftIndex");
  } else {
    router.push("/page");
  }
}
const prize = computed(() => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.prize) {
    return userInfo.prize;
  } else {
    return "";
  }
});
</script>

<template>
  <div class="main">
    <img class="imgx1" src="../assets/我的礼品.png" alt="" />
    <img class="imgx" src="../assets/icon/x1.png" alt="" @click="goBack" />
    <img
      v-if="prize === 'box'"
      class="img"
      src="../assets/iswin.png"
      alt=""
      @click="go"
    />
    <img
      v-if="prize === 'coupon'"
      class="img"
      src="../assets/isdiscount.png"
      alt=""
    />
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/myGift.png");
  background-repeat: round;
}
.imgx {
  position: absolute;
  width: 16px;
  top: 10%;
  right: 7%;
}
.imgx1 {
  position: absolute;
  width: 22vw;
  top: 10%;
  left: 7%;
}
.img {
  position: absolute;
  width: 90vw;
  height: 17vh;
  top: 14%;
  left: 5%;
}
</style>
