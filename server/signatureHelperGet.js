/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-25 17:45:45
 */
// const CryptoJS = require('crypto-js')
const crypto = require("crypto");

// 假设基础URI和密钥
const appId = '30009'; // 示例中的appId
const baseUri = '/ms-sanfu-spi-customer/v1/customer/wechatConfig';
// const baseUri = '/ms-sanfu-spi-customer/v1/customer/getPoint';
const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
const nonce = Math.random().toString(36).substring(2, 12)
const timestamp = Math.floor(Date.now() / 1000).toString()

// 生成随机字符串nonce和时间戳
function generateNonce() {
    return Math.random().toString(36).substring(2, 12);
}

function generateTimestamp() {
    return Math.floor(Date.now() / 1000).toString();
}


// 计算HMAC签名
function calculateSignature() {
    //  nonce timestamp uri
    // const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;
    const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}`;

    const actual = crypto
        .createHmac('sha256', key)
        .update(stringSignTemp)
        .digest('hex');
    // console.log('actual', actual);
    const res = actual.toUpperCase()
    let str = encodeURI(res);
    let base64 = btoa(str);
    // console.log(base64);
    return base64;
}

// 生成最终的Authorization头
function buildAuthorizationHeader(appId) {
    return `SANFU-OPEN-API appId="${appId}",nonce="${generateNonce()}",timestamp="${generateTimestamp()}",signature="${calculateSignature()}"`;
}


module.exports = buildAuthorizationHeader
