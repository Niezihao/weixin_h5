<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-24 10:36:17
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";
import axios from "axios";

const router = useRouter();

function onSave(val) {
  let area = val.province + val.city + val.county;
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.curCusId) {
    axios
      .put("users/profile/update", {
        openId: userInfo.curCusId,
        number: val.tel,
        name: val.name,
        area: area,
        address: val.addressDetail,
      })
      .then((res) => {
        if (res) {
          router.push("/giftIndex");
        }
      });
  }
}
const address = computed(() => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo && userInfo.area && userInfo.address) {
    return false;
  } else {
    return true;
  }
});

function goBack() {
  router.push("/myGift");
}
onMounted(() => {});
</script>

<template>
  <div v-if="address" style="position: relative">
    <div class="main"></div>
    <div class="address">
      <div class="title">收货地址</div>
      <!-- <div>
        <div>您的姓名</div>
        <div><input type="text" placeholder="收货人姓名" /></div>
        <div>手机号码</div>
        <div><input type="text" placeholder="收货人联系方式" /></div>
        <div>所在地区</div>
        <div>详细地址</div>
      </div> -->
      <van-address-edit
        :area-list="areaList"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择省', '请选择市', '请选择区/县']"
        @save="onSave"
      >
      </van-address-edit>
    </div>
  </div>
  <div style="position: relative" v-else>
    <img
      src="../assets/填写信息界面.png"
      style="width: 100vw; height: 100vh"
      alt=""
    />
    <div
      style="position: absolute; font-size: 7vw; top: 2vh; right: 6vw"
      @click="goBack"
    >
      x
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/address.png");
  background-repeat: round;
}
.address {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-40vw);
  border-radius: 25px;
  width: 80vw;
  height: 66vh;
  background: #ffffff;
  .title {
    width: 100%;
    height: 20%;
    text-align: center;
    line-height: 13.2vh;
    font-size: 30px;
  }
}
input {
  width: 70%;
  height: 7%;
}
</style>
