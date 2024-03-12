let timestamp = Math.floor(Date.now() / 1000)
let nonceStr = Math.random()
let url = `${location.origin}${location.pathname}${location.search}`
let jsapi_ticket = document.querySelector('.vats .jsapi_ticket').innerHTML

let sig = sha1(`jsapi_ticket=${jsapi_ticket}&nonceStr=${nonceStr}&timestamp=${timestamp}&url=${url}`)

wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx2a2b14d1eab2ae9d', // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: sig,// 必填，签名
    jsApiList: [''] // 必填，需要使用的JS接口列表
});

wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
    wx.updateTimelineShareData({
        title: '哈哈哈', // 分享标题
        link: 'http://8.138.131.112:8000', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
            // 设置成功
        }
    })
});