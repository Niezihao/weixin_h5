<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-22 01:11:18
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";

const show = ref(true);
const router = useRouter();

function go() {
  router.push("/createPicture");
}
function toMyGift() {
  router.push("/myGift");
}
onMounted(() => {});
</script>

<template>
  <main>
    <div style="position: relative">
      <div class="main"></div>
      <!-- <van-button class="btn" @click="go">生成通行证</van-button> -->
      <img @click="go" class="btn" src="../assets/goTongxinzheng.png" alt="" />
      <img
        @click="toMyGift"
        class="myGift"
        src="../assets/toMyGift.png"
        alt=""
      />
      <img
        @click.prevent="show = !show"
        class="roles"
        src="../assets/roles.png"
        alt=""
      />
    </div>

    <van-popup v-model:show="show">
      <div style="position: relative">
        <img class="img_tip" src="../assets/tip.png" alt="" />
        <div
          style="
            position: absolute;
            width: 8vw;
            height: 4vh;
            top: 1vh;
            right: 2vw;
          "
          @click="show = false"
        ></div></div
    ></van-popup>
  </main>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img6.png");
  background-repeat: round;
}
.myGift {
  position: absolute;
  width: 35vw;
  height: 6vh;
  top: 86.5vh;
  left: 15vw;
  /* transform: translate(5vw); */
}
.roles {
  position: absolute;
  width: 35vw;
  height: 6vh;
  top: 86.5vh;
  left: 50%;
  /* transform: translate(px); */
}
.img_tip {
  width: 70vw;
}
.btn {
  position: absolute;
  width: 70vw;
  height: 7vh;
  top: 79vh;
  left: 50%;
  transform: translate(-35vw);
}
</style>
