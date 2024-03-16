<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-17 02:48:09
-->
<script setup>
import { ref, onMounted, getCurrentInstance, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { showSuccessToast, showFailToast } from "vant";
import { fabric } from "fabric";
import Hammer from "hammerjs";
import sucai1 from "../assets/sucai/风格1-1.png";
import sucai2 from "../assets/sucai/风格1-2.png";
import sucai3 from "../assets/sucai/风格1-3.png";
import sucai4 from "../assets/sucai/风格1-4.png";
import sucai5 from "../assets/sucai/风格1-5.png";
import sucai6 from "../assets/sucai/风格1-6.png";
import sucai7 from "../assets/sucai/风格2-1.png";
import sucai8 from "../assets/sucai/风格2-2.png";
import sucai9 from "../assets/sucai/风格2-3.png";
import sucai10 from "../assets/sucai/风格2-4.png";
import sucai11 from "../assets/sucai/风格2-5.png";
import sucai12 from "../assets/sucai/风格2-6.png";
import sucai13 from "../assets/sucai/风格3-1.png";
import sucai14 from "../assets/sucai/风格3-2.png";
import sucai15 from "../assets/sucai/风格3-3.png";
import sucai16 from "../assets/sucai/风格3-4.png";
import sucai17 from "../assets/sucai/风格3-5.png";
import sucai18 from "../assets/sucai/风格3-6.png";
import img1 from "../assets/sucai/插画1.png";
import img2 from "../assets/sucai/插画2.png";
import img3 from "../assets/sucai/插画3.png";

let editorCanvas = "";
let mc = "";
let timer = "";
// 获取视口宽度和高度
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
// 将视口宽度和高度的百分比转换为像素值
let canvasWidth = (viewportWidth * 100) / 100; // 100vw
let canvasHeight = (viewportHeight * 75) / 100; // 75vh

const router = useRouter();
const picture = ref();
const bgImg = ref(img1);
const canvas = ref();
const fileList = ref([]);
const bgimgList = ref([img1, img2, img3]);
const sucaiList = ref([
  sucai1,
  sucai2,
  sucai3,
  sucai4,
  sucai5,
  sucai6,
  sucai7,
  sucai8,
  sucai9,
  sucai10,
  sucai11,
  sucai12,
  sucai13,
  sucai14,
  sucai15,
  sucai16,
  sucai17,
  sucai18,
]);
const hasPicture = ref(false);

function afterRead(file) {
  console.log("file", file);
  hasPicture.value = true;
  nextTick(() => {
    initCanvas();
    editorCanvas.isDrawingMode = false;
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = e.target.result;
      fabric.Image.fromURL(data, (img) => {
        img.scaleToWidth(canvasWidth);
        img.scaleToHeight(canvasHeight);
        editorCanvas.add(img).renderAll();
      });
    };
    reader.readAsDataURL(file.file);
    setBg();
  });
}

function setBg() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    nextTick(() => {
      let bgC = fabric.Image.fromURL(bgImg.value, (img) => {
        img.selectable = false;
        img.scaleToWidth(canvasWidth);
        img.scaleToHeight(canvasHeight);
        editorCanvas.add(img).renderAll();
      });
      editorCanvas.bringToFront(bgC);
    });
  }, 200);
}

function setSucai(index) {
  if (!editorCanvas) {
    showFailToast("请上传图片");
    return;
  }
  const sucai = sucaiList.value[index];
  editorCanvas.isDrawingMode = false;

  fabric.Image.fromURL(sucai, (img) => {
    img.left = canvasWidth / 2 - 35;
    img.top = canvasHeight / 2 - 35;
    img.scaleToWidth(70);
    img.scaleToHeight(70);
    editorCanvas.add(img).renderAll();
  });
}

function initCanvas() {
  editorCanvas = new fabric.Canvas("editorCanvas", {
    devicePixelRatio: true,
    width: "375",
    height: "667",
    originX: "center",
    originY: "center",
    backgroundColor: "#ffffff",
    transparentCorners: false,
    // backgroundImage: bgimgList.value[0],
  });

  // const bg = editorCanvas.setBackgroundImage(
  //   bgimgList.value[0],
  //   editorCanvas.renderAll.bind(editorCanvas)
  // );
  // bg.set({ width: "20" });

  // mc = new Hammer.Manager(canvas.value);
  // console.log(mc);
  // mc.add(new Hammer.Pinch());
  // mc.on("pinchstart", handlePinchStart);
  // mc.on("pinchmove", handlePinchMove);
  // mc.on("pinchend", handlePinchEnd);
  // editorCanvas.getActiveObject();

  // 设置Fabric画布的宽度和高度
  editorCanvas.setWidth(canvasWidth);
  editorCanvas.setHeight(canvasHeight);
  editorCanvas.preserveObjectStacking = true;
}

// function handlePinchStart(event) {
//   // 可以存储初始缩放值和当前选中的fabric对象
// }

// function handlePinchMove(event) {
//   if (selectedObject) {
//     const currentZoom = editorCanvas.getZoom();
//     const zoomDelta = event.scale - 1; // 累积缩放差值
//     const newZoom = currentZoom + zoomDelta;

//     // 更新整个画布或仅更新选中的图片对象的缩放
//     if (zoomingWholeCanvas) {
//       editorCanvas.setZoom(newZoom);
//     } else {
//       selectedObject.setScale(
//         selectedObject.scaleX * event.scale,
//         selectedObject.scaleY * event.scale
//       );
//       editorCanvas.renderAll();
//     }
//   }
// }

// function handlePinchEnd(event) {
//   // 可能需要平滑处理缩放结束状态
// }

// onMounted(() => {
//   initCanvas();
// });

function changeBg(index) {
  bgImg.value = bgimgList.value[index];
  setBg();
  picture.value &&
    (picture.value.style.backgroundImage =
      'url("' + bgimgList.value[index] + '")');
}

function download() {
  if (!editorCanvas) {
    showFailToast("请上传图片");
    return;
  }
  const dataURL = editorCanvas.toDataURL({
    width: editorCanvas.width,
    height: editorCanvas.height,
    left: 0,
    top: 0,
    format: "png",
  });
  const link = document.createElement("a");
  link.download = "通行证.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const randomValue = Math.random();
  if (randomValue < 0.98) {
    router.push("/discount");
  } else {
    router.push("/win");
  }
}

function share() {
  router.push("/page");
}
</script>

<template>
  <div class="picture" ref="picture">
    <van-uploader
      v-if="!hasPicture"
      style="width: 100%; height: 100%"
      v-model="fileList"
      :after-read="afterRead"
    >
      <div class="uploader">
        <div>
          <van-icon name="plus" size="40" />
          <div style="font-size: 16px">点击上传图片</div>
        </div>
      </div>
    </van-uploader>
    <canvas v-else ref="canvas" id="editorCanvas"></canvas>
  </div>

  <div class="select_items">
    <div class="top">
      <div
        class="circle"
        style="background-color: #322156"
        @click="changeBg(0)"
      ></div>
      <div
        class="circle"
        style="background-color: #ee9dcd"
        @click="changeBg(1)"
      ></div>
      <div
        class="circle"
        style="background-color: #f2e38b"
        @click="changeBg(2)"
      ></div>
    </div>

    <div class="item">
      <van-icon name="arrow-left" style="width: 7%" />
      <div class="content">
        <img
          class="img_item"
          :id="`sucai${index}`"
          v-for="(item, index) in sucaiList"
          :src="item"
          alt=""
          @click="setSucai(index)"
        />
      </div>
      <van-icon name="arrow" style="width: 7%" />
    </div>

    <div class="bottom_btn">
      <div class="flex">
        <img
          class="imgs"
          src="../assets/save_btn.png"
          alt=""
          @click="download"
        />
        <img class="imgs" src="../assets/share_btn.png" alt="" @click="share" />
      </div>
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
<style lang="scss" scoped>
::v-deep .van-uploader__wrapper {
  width: 100%;
  height: 100%;
}
::v-deep .van-uploader__input-wrapper {
  width: 100%;
  height: 100%;
}
.picture {
  width: 100vw;
  height: 75vh;
  background: url(../assets/sucai/插画1.png);
  background-size: 100vw 75vh;
  .uploader {
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
.select_items {
  width: 100vw;
  height: 25vh;
}
.top {
  display: flex;
  justify-content: center;
  align-items: center; /* 沿交叉轴（垂直方向）居中 */
  width: 100%;
  height: 20%;
  background: #1c2024;
}
.item {
  display: flex;
  align-items: center;
  text-align: center;
  /* padding-left: 50px; */
  /* width: 100%; */
  height: 30%;
  background: #666a75;
  .content {
    display: flex;
    width: 86%;
    overflow-x: scroll;
    .img_item {
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }
  }
}
.bottom_btn {
  position: relative;
  width: 100%;
  height: 50%;
  background: #1c2642;
}
.imgs {
  width: 120px;
  height: 40px;
}
.flex {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center; /* 沿交叉轴（垂直方向）居中 */
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  // background: #ffffff;
  margin: 0 15px;
}
</style>
