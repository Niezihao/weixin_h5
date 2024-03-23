<!--
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-23 22:58:26
-->
<script setup>
import {
  ref,
  onMounted,
  getCurrentInstance,
  computed,
  nextTick,
  unref,
} from "vue";
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
import sucai19 from "../assets/sucai/风格3-7.png";
import sucai20 from "../assets/sucai/风格3-8.png";
import img1 from "../assets/sucai/插画1.png";
import img2 from "../assets/sucai/插画2.png";
import img3 from "../assets/sucai/插画3.png";
import axios from "axios";

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
  { img: sucai1, isSelect: false },
  { img: sucai2, isSelect: false },
  { img: sucai3, isSelect: false },
  { img: sucai4, isSelect: false },
  { img: sucai5, isSelect: false },
  { img: sucai6, isSelect: false },
  { img: sucai7, isSelect: false },
  { img: sucai8, isSelect: false },
  { img: sucai9, isSelect: false },
  { img: sucai10, isSelect: false },
  { img: sucai11, isSelect: false },
  { img: sucai12, isSelect: false },
  { img: sucai13, isSelect: false },
  { img: sucai14, isSelect: false },
  { img: sucai15, isSelect: false },
  { img: sucai16, isSelect: false },
  { img: sucai17, isSelect: false },
  { img: sucai18, isSelect: false },
  { img: sucai19, isSelect: false },
  { img: sucai20, isSelect: false },
]);
let imgLsit = [];
const hasPicture = ref(false);
const bgC = ref("");

function setBg() {
  if (bgC.value) {
    editorCanvas.remove(bgC.value);
    editorCanvas.renderAll();
  }
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    nextTick(() => {
      // let img = document.getElementById("bg");
      // console.log(img);
      // new fabric.Image(img, {
      //   top: 0,
      //   left: 0,
      //   width: canvasHeight,
      //   height: canvasWidth,
      //   scaleX: 0.2,
      //   scaleY: 0.2,
      // });
      bgC.value = fabric.Image.fromURL(bgImg.value, (img) => {
        img.selectable = false;
        var scaleX = editorCanvas.getWidth() / img.width;
        var scaleY = editorCanvas.getHeight() / img.height;
        img.set({
          // 通过scale来设置图片大小，这里设置和画布一样大
          scaleX: scaleX,
          scaleY: scaleY,
          originX: "left",
          originY: "top",
        });
        // img.scaleToWidth(canvasWidth);
        // img.scaleToHeight(canvasHeight);
        editorCanvas.add(img).renderAll();
      });
      editorCanvas.bringToFront(bgC.value);
      console.log("bgC.value", bgC.value);
    });
  }, 200);
}

function setSucai(index) {
  if (!editorCanvas) {
    showFailToast("请上传图片");
    return;
  }
  const sucai = sucaiList.value[index].img;
  editorCanvas.isDrawingMode = false;
  let su = "";
  su = fabric.Image.fromURL(sucai, (img) => {
    img.left = canvasWidth / 2 - 35;
    img.top = canvasHeight / 2 - 35;
    img.scaleToWidth(70);
    img.scaleToHeight(70);
    editorCanvas.add(img).renderAll();
  });

  // editorCanvas.add(su);
  setTimeout(() => {
    imgLsit.push({
      img: editorCanvas.getObjects()[editorCanvas.getObjects().length - 1],
      val: index,
    });
    sucaiList.value[index].isSelect = true;
  }, 200);
  console.log(editorCanvas.getObjects());
}

function deleteImg(index) {
  sucaiList.value[index].isSelect = false;
  imgLsit.forEach((item) => {
    console.log(item.val);
    console.log(index);
    if (item.val === index) {
      editorCanvas.remove(item.img);
    }
  });
  // imgLsit.splice(1, index);
}

function initCanvas() {
  editorCanvas = new fabric.Canvas("editorCanvas", {
    devicePixelRatio: true,
    width: "375",
    height: "667",
    originX: "center",
    originY: "center",
    backgroundColor: "#ffffff",
    selectionBorderColor: "#RRGGBBAA",
    transparentCorners: true,
    // aligningLineWidth = 1, // 对齐线条宽度
    //     aligningLineColor = '#666666', // 颜色
    // backgroundImage: bgimgList.value[0],
  });
  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: "rgba(255, 255, 255, 0)",
    cornerColor: "rgba(255, 255, 255, 0)",
    borderScaleFactor: 2.5,
    cornerStyle: "circle",
    cornerStrokeColor: "rgba(255, 255, 255, 0)",
    // borderOpacityWhenMoving: 1,
  });
  // 设置Fabric画布的宽度和高度
  editorCanvas.setWidth(canvasWidth);
  editorCanvas.setHeight(canvasHeight);
  editorCanvas.preserveObjectStacking = true;
  // fabric.Object.prototype.cornerSize = 1;

  // 删除图标
  const deleteImg = document.createElement("img");
  deleteImg.src =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 0,
    offsetX: 0,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24,
  });
}
function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}
function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

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
  sessionStorage.setItem("picture", dataURL);
  // const link = document.createElement("a");
  // link.download = "星球通行证.png";
  // link.href = dataURL;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  router.push("/savePicture");
}

function share() {
  router.push("/page");
}
function afterRead(file) {
  console.log(file);
  file.status = "uploading";
  file.message = "上传中...";
  hasPicture.value = true;
  nextTick(() => {
    initCanvas();
    editorCanvas.isDrawingMode = false;
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = e.target.result;
      fabric.Image.fromURL(data, (img) => {
        img.selectable = false;
        var scaleX = editorCanvas.getWidth() / img.width;
        var scaleY = editorCanvas.getHeight() / img.height;
        img.set({
          // 通过scale来设置图片大小，这里设置和画布一样大
          scaleX: scaleX,
          scaleY: scaleY,
          originX: "left",
          originY: "top",
        });
        // img.scaleToWidth(canvasWidth);
        // img.scaleToHeight(canvasHeight);
        editorCanvas.add(img).renderAll();
      });
    };
    reader.readAsDataURL(file.file);
    setBg();
  });
  // 上传到服务器
  const formData = new FormData();
  formData.append("file", file.file);
  axios
    .post("/resource/upload", formData)
    .then((res) => {
      const { path, filename } = res.data;
      sessionStorage.setItem("fileName", filename);
      file.url = path;
      file.status = "success";
      file.message = null;
    })
    .catch(() => {
      file.status = "failed";
      file.message = "上传失败";
    });
}
</script>

<template>
  <div class="main">
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
          style="margin-left: 20vw; background-color: #322156"
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
        <img style="width: 20vw" src="../assets/change.png" alt="" />
      </div>

      <div class="item">
        <van-icon name="arrow-left" style="width: 7%" />
        <div class="content">
          <div
            :id="`img${index}`"
            style="position: relative"
            v-for="(item, index) in sucaiList"
          >
            <!-- <div
              v-if="item.isSelect"
              style="position: absolute; left: 35px"
              @click="deleteImg(index)"
            >
              x
            </div> -->
            <img
              class="img_item"
              :id="`sucai${index}`"
              :src="item.img"
              alt=""
              @click="setSucai(index)"
            />
          </div>
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
          <img
            class="imgs"
            src="../assets/share_btn.png"
            alt=""
            @click="share"
          />
        </div>
        <img class="bottom" src="../assets/icon/bottom.png" alt="" />
      </div>
    </div>
    <img class="bg" id="bg" :src="img1" alt="" />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
<style lang="scss" scoped>
::v-deep .van-image__imge {
  width: 100vw !important;
  height: 75vh !important;
}
::v-deep .van-uploader__wrapper {
  width: 100%;
  height: 100%;
}
::v-deep .van-uploader__input-wrapper {
  width: 100%;
  height: 100%;
}
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
  width: 140px;
  height: 45px;
}
.flex {
  height: 80%;
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
.bottom {
  position: absolute;
  left: 24%;
  bottom: 5%;
  transform: scale(0.7);
}
.bg {
  width: 100vw;
  height: 75vh;
}
</style>
