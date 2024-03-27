/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-25 01:05:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-27 11:43:17
 */
import CryptoJS from 'crypto-js';




// get生成最终的Authorization头
export function buildGetAuthorizationHeader(appId) {
    // let url = encodeURIComponent(`${location.origin}${location.pathname}${location.search}`)
    let url = window.location.href.split('#')[0]
    // let url = 'https://sanf.gudei.cn'
    const baseUri = '/v1/customer/wechatConfig';
    // const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m'; // 测试
    const key = 'vpelct4wh9p6rgmy6c6bankxblag2rdd'; // 正式
    const nonce = Math.random().toString(36).substring(2, 12)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringSignTemp = `nonce=${nonce}&timestamp=${timestamp}&url=${url}&uri=${baseUri}&key=${key}`;
    console.log('stringSignTemp', stringSignTemp);
    const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)
    const signature = btoa(encodeURI(hmac.toString(CryptoJS.enc.Hex).toUpperCase()))
    console.log(`SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${signature}"`);
    return `SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${signature}"`;
}

// post发送优惠券 生成最终的Authorization头
export function buildPostAuthorizationHeader(appId, curCusId) {
    const baseUri = '/v1/coupon/sendCoupon';
    // const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m';
    const key = 'vpelct4wh9p6rgmy6c6bankxblag2rdd';
    const nonce = Math.random().toString(36).substring(2, 12)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const couponId = 'C20240314160000'
    const shoId = ''

    const stringSignTemp = shoId ? `couponId=${couponId}&curCusId=${curCusId}&nonce=${nonce}&shoId=${shoId}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`
        : `couponId=${couponId}&curCusId=${curCusId}&nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`
    console.log('stringSignTemp', stringSignTemp);
    const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)
    const signature = btoa(encodeURI(hmac.toString(CryptoJS.enc.Hex).toUpperCase()))
    return `SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${signature}"`;
}
// console.log(buildPostAuthorizationHeader('30009', 'XX000846', 'C20240108090001'));

// get生成最终的Authorization头
export function buildGetAuthorizationHeader1(appId, curCusId) {
    const baseUri = '/v1/customer/checkUser';
    // const key = 'ycsc7ty8ioweyzpmy3rivcqdwo68gc9m'; // 测试
    const key = 'vpelct4wh9p6rgmy6c6bankxblag2rdd'; // 正式
    const nonce = Math.random().toString(36).substring(2, 12)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringSignTemp = `curCusId=${curCusId}&nonce=${nonce}&timestamp=${timestamp}&uri=${baseUri}&key=${key}`;
    const hmac = CryptoJS.HmacSHA256(stringSignTemp, key)
    const signature = btoa(encodeURI(hmac.toString(CryptoJS.enc.Hex).toUpperCase()))

    return `SANFU-OPEN-API appId="${appId}",nonce="${nonce}",timestamp="${timestamp}",signature="${signature}"`;
}
// console.log(buildGetAuthorizationHeader1('30009', 'XX000846'));
// https://tm.sanfu.com/ms-sanfu-spi-customer/v1/customer/wechatConfig
// https://tm.sanfu.com/ms-sanfu-spi-customer/v1/coupon/sendCoupon
// https://tm.sanfu.com/ms-sanfu-spi-customer/v1/customer/checkUser