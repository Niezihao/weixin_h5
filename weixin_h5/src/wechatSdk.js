/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-20 00:37:18
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-25 00:38:39
 */

// import { wechatConfig } from "@/utils/wechatSdk.js";
// 	  wechatConfig(
//         this,
//         "分享标题",
//         "分享描述",
//         "分享链接",
//         "分享封面（配图）"
//       ).then((res) => {
//         //需要获取方法执行结果，可以加.then这一段；
//         //不需要可以不加
//       });

// import {
//     getWechatConfig
// } from "./common.js";  //为你提供timestamp、nonceStr、signature的后端接口
import axios from "axios"

function getWechatConfig(url) {
    return axios.get(`/users/getSignature?url=${url}`)
}


const APPID = "wx8f6ff2f32f7c93a5"; //公众号的appId

/**
 * 获取微信配置
 * @param {*} tag 调用页面的this
 * @param {*} share_title 分享标题
 * @param {*} share_desc 分享描述
 * @param {*} share_link 分享链接
 * @param {*} share_cover 分享封面（配图）
 * @returns 
 */
export const wechatConfig = (tag, share_title, share_desc, share_link, share_cover) => {
    // var wx_host = window.location.href.split('#')[0];
    let wx_host = decodeURIComponent(`${location.origin}${location.pathname}${location.search}`)
    console.log('wx_host', wx_host); //后端获取签名，需要前端传url，url要求看注解
    const cover = share_cover || 'https://hbimg.huaban.com/a2a9a71b293f6664b342e0cefc6e1fccd5f921f83cfa5-RoYLU8_fw658/format/webp'; //不重要的默认图片地址
    return new Promise((resolve, reject) => {
        getWechatConfig(wx_host).then((res) => {
            if (res) {
                console.log('res', res.data.signature);
                const config = {
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: APPID, // 必填，公众号的唯一标识
                    timestamp: res.data.signature.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.signature.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature.signature, // 必填，签名
                    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，注意查看官方文档，部分js接口即将废弃，我这里用的是新的
                    openTagList: ["wx-open-launch-weapp"], // 可选，需要使用的开放标签列表（当前标签用于跳转微信小程序）
                };
                tag.$wx.config(config); //通过config接口注入权限验证配置
                tag.$wx.ready(function () { //通过ready接口处理成功验证
                    console.log("js-sdk配置成功！");

                    // //分享给朋友
                    // tag.$wx.updateAppMessageShareData({
                    //     title: share_title || "默认标题", // 分享标题
                    //     desc: share_desc || "默认描述", // 分享描述
                    //     link: `${wx_host}#/${share_link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //     imgUrl: cover, // 分享后显示的封面图
                    //     success: function () {
                    //         console.info("分享给朋友");
                    //     }, // 设置成功回调
                    // });

                    // //分享到朋友圈
                    // tag.$wx.updateTimelineShareData({
                    //     title: share_title || "默认标题", // 分享标题
                    //     link: `${wx_host}#/${share_link}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //     imgUrl: cover, // 分享图标
                    //     success: function () {
                    //         // 用户点击了分享后执行的回调函数
                    //         console.info("分享到朋友圈");
                    //     }
                    // })
                    return resolve(true)
                });
                tag.$wx.error(function (res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.info("config信息验证失败");
                    console.info(res);
                    return reject(false)
                });
            }
        });
    })
}
// https://tm.sanfu.com/ms-sanfu-spi-customer/v1/customer/wechatConfig