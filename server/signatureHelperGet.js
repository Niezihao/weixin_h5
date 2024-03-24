/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-25 01:46:09
 */
const CryptoJS = require('crypto-js')

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
    const stringSignTemp = `nonce=${nonce}&sid=3b1a74a78a294d35b44276d83f6a6b15&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;
    return stringSignTemp;
}

// 计算HMAC签名
function calculateSignature(stringSignTemp, key) {
    // 创建一个HMAC SHA256实例
    const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)

    // 将HMAC结果转换为Base64编码
    const base64Signature = hmac.toString(CryptoJS.enc.Base64);

    // const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)
    // hmac.update(stringSignTemp);
    // const signature = hmac.digest('base64').toUpperCase();
    return base64Signature;
}

// 生成最终的Authorization头
function buildAuthorizationHeader(appId) {
    return `SANFU-OPEN-API appId="${appId}",nonce="${generateNonce()}",timestamp="${generateTimestamp()}",signature="${calculateSignature(buildStringToSign(generateNonce(), generateTimestamp()), key)}"`;
}

// 使用示例
const nonce = generateNonce();
const timestamp = generateTimestamp();
const stringSignTemp = buildStringToSign(nonce, timestamp);
const signature = calculateSignature(stringSignTemp, key);

module.exports = buildAuthorizationHeader
