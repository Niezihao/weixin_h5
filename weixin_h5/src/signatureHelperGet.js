/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-25 01:27:50
 */
import CryptoJS from 'crypto-js';

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
    const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)
    hmac.update(stringSignTemp);
    const signature = hmac.digest('base64').toUpperCase();
    return signature;
}

// 生成最终的Authorization头
function buildAuthorizationHeader(appId, signature) {
    return `SANFU-OPEN-API appId="${appId}",nonce="${generateNonce()}",timestamp="${generateTimestamp()}",signature="${calculateSignature(buildStringToSign(generateNonce(), generateTimestamp()), key)}"`;
}

// 使用示例
const nonce = generateNonce();
const timestamp = generateTimestamp();
const stringSignTemp = buildStringToSign(nonce, timestamp);
const signature = calculateSignature(stringSignTemp, key);

export const authorizationHeader = buildAuthorizationHeader(appId);
console.log('Authorization Header:', authorizationHeader);