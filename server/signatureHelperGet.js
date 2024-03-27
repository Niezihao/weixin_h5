/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-26 18:14:39
 */
// const CryptoJS = require('crypto-js')
const crypto = require("crypto");

// 假设基础URI和密钥
// const baseUri = '/ms-sanfu-spi-customer/v1/customer/getPoint';

const appId = '30009'; // 示例中的appId


// 生成随机字符串nonce和时间戳
function generateNonce() {
    return Math.random().toString(36).substring(2, 12);
}

function generateTimestamp() {
    return Math.floor(Date.now() / 1000).toString();
}


// 计算HMAC签名
function calculateSignature() {
    //  nonce timestamp uri key
    // const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;
    console.log(nonce);
    console.log(timestamp);
    console.log(baseUri);
    console.log(key);
    const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;

    const actual = crypto
        .createHmac('sha256', key)
        .update(stringSignTemp)
        .digest('hex');
    // console.log('actual', actual);
    const res = actual.toUpperCase()
    let str = encodeURI(res);
    let base64 = btoa(str);
    console.log(base64);
    return base64;
}

// 生成最终的Authorization头
// function buildAuthorizationHeader(appId) {
//     const baseUri = '/v1/customer/wechatConfig';
//     const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
//     const nonce = Math.random().toString(36).substring(2, 12)
//     const timestamp = Math.floor(Date.now() / 1000).toString()
//     const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;

//     const actual = crypto
//         .createHmac('sha256', key)
//         .update(stringSignTemp)
//         .digest('hex');
//     // console.log('actual', actual);
//     const res = actual.toUpperCase()
//     let str = encodeURI(res);
//     let base64 = btoa(str);
//     return `SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${base64}"`;
// }

function buildAuthorizationHeader(appId, curCusId, couponId, shoId) {
    const baseUri = '/v1/coupon/sendCoupon';
    const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
    const nonce = Math.random().toString(36).substring(2, 12)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringSignTemp = shoId ? `couponId=${couponId}&curCusId=${curCusId}&nonce=${nonce}&shoId=${shoId}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`
        : `couponId=${couponId}&curCusId=${curCusId}&nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`
    console.log('stringSignTemp', stringSignTemp);
    const actual = crypto
        .createHmac('sha256', key)
        .update(stringSignTemp)
        .digest('hex');
    // console.log('actual', actual);
    const res = actual.toUpperCase()
    let str = encodeURI(res);
    let base64 = btoa(str);
    console.log(`SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${base64}"`);
    return `SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${base64}"`;
}


module.exports = buildAuthorizationHeader
