/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-25 10:11:41
 */
const CryptoJS = require('crypto-js')
const crypto = require("crypto");

// 假设基础URI和密钥
const baseUri = '/ms-sanfu-spi-customer/v1/customer/getPoint';
const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
const appId = '30001'; // 示例中的appId

// 生成随机字符串nonce和时间戳
function generateNonce() {
    return Math.random().toString(36).substring(2, 12);
}

function generateTimestamp() {
    return Math.floor(Date.now() / 1000).toString();
}

// 构建待签名字符串
function buildStringToSign(nonce, timestamp) {
    const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;
    return stringSignTemp;
}

// 计算HMAC签名
function calculateSignature(stringSignTemp) {
    const baseUri = '/ms-sanfu-spi-customer/v1/customer/getPoint';
    const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
    const nonce = Math.random().toString(36).substring(2, 12)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;


    const base64Signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256('nonce=MkgAaoFqSi&sid=3b1a74a78a294d35b44276d83f6a6b15&timestamp=1612332668&uri=/v1/customer/getPoint&key=ycsc7ty8ioweyzpmy3rivcqdwo68gc9m', key))

    console.log('base64Signature', base64Signature);
    const hmac = crypto.createHmac('sha256', key);
    hmac.update('nonce=MkgAaoFqSi&sid=3b1a74a78a294d35b44276d83f6a6b15&timestamp=1612332668&uri=/v1/customer/getPoint&key=ycsc7ty8ioweyzpmy3rivcqdwo68gc9m');
    const result = hmac.digest('base64');
    console.log('result', result);
    return result.toUpperCase();
    // return base64Signature;
}

// 生成最终的Authorization头
function buildAuthorizationHeader(appId) {
    return `SANFU-OPEN-API appId="${appId}",nonce="${generateNonce()}",timestamp="${generateTimestamp()}",signature="${calculateSignature(buildStringToSign(generateNonce(), generateTimestamp()), key)}"`;
}

// 使用示例
// const nonce = generateNonce();
// const timestamp = generateTimestamp();
// const stringSignTemp = buildStringToSign(nonce, timestamp);
// const signature = calculateSignature(stringSignTemp, key);

module.exports = buildAuthorizationHeader
