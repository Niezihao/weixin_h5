/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-25 01:17:46
 */
import CryptoJS from 'crypto-js';

const appId = '30001'; // 发起请求的应用ID
const nonce = generateNonce(); // 生成随机串
const timestamp = generateTimestamp(); // 生成时间戳
const body = {
    giftId: 'C1785',
    sid: '770abaafb8f1406aa8b67b7e7647ba3f'
};
const baseUri = '/v1/game/checkAndReduce';
const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';



// 定义签名生成函数
export function generateSignature(appId, nonce, timestamp, body, baseUri, key) {
    // 将body对象转换为排序并拼接的查询字符串
    const sortedBodyParams = Object.keys(body)
        .sort()
        .map(key => `${key}=${encodeURIComponent(body[key] || '')}`)
        .join('&');

    // 构造待签名字符串
    const stringSignTemp = `${sortedBodyParams}&nonce=${generateNonce()}&timestamp=${generateTimestamp()}&uri=${encodeURIComponent(baseUri)}&key=${key}`;

    // 计算HMAC-SHA256签名
    const signature = CryptoJS.HmacSHA256(stringSignTemp, key).toString(CryptoJS.enc.Hex).toUpperCase();

    return signature;
}

// 生成随机字符串nonce和时间戳
function generateNonce() {
    return Math.random().toString(36).substring(2, 12);
}

function generateTimestamp() {
    return Math.floor(Date.now() / 1000).toString();
}


// // 随机字符串nonce生成器，确保至少10位长度
// function generateNonce(length = 10) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// // 时间戳生成器，确保为10位长度
// function generateTimestamp() {
//     const timestamp = Math.floor(Date.now() / 1000); // 获取当前时间秒数
//     return ('000000000' + timestamp).slice(-10); // 补足至10位
// }