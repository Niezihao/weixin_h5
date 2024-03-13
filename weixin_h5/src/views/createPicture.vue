<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-14 00:46:20
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
</script>

<template>
  <div class="picture"></div>
  <div class="select_items">
    <div class="top"></div>
    <div class="item"></div>
    <div class="bottom_btn">
      <div class="flex">
        <img class="imgs" src="../assets/save_btn.png" alt="" />
        <img class="imgs" src="../assets/share_btn.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.picture {
  width: 100vw;
  height: 75vh;
}
.select_items {
  width: 100vw;
  height: 25vh;
}
.top {
  width: 100%;
  height: 15%;
  background: #1c2024;
}
.item {
  width: 100%;
  height: 25%;
  background: #666a75;
}
.bottom_btn {
  position: relative;
  width: 100%;
  height: 60%;
  background: #1c2642;
}
.imgs {
  width: 120px;
  height: 40px;
}
.flex {
  margin: auto 0; /* position: absolute;
  top: 50%;
  transform: translateY(-20px);
  text-align: center; */
  display: flex;
  justify-content: space-around;
}
</style>
