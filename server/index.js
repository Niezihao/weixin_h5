/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-09 20:20:58
 * @LastEditors: Niezihao 1332421989@qq.com
 * @LastEditTime: 2024-03-26 18:01:58
 * @FilePath: \server\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const app = require('express')()
const { default: axios } = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', async (req, res) => {
    res.send('ok')
})
// 获取jssdk的Ticket
app.get('/getTicket', async (req, res) => {
    let token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.APPID}&secret=${process.env.APPSECRET}`
    let accessToken = (await axios.get(token)).data.access_token
    console.log(accessToken);
    let getTicket = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
    let ticket = (await axios.get(getTicket)).data
    res.send(ticket)
})

// sanfu
app.get('/getSanfu', async (req, res) => {
    let authorizationHeader = require('./signatureHelperGet')
    // console.log(authorizationHeader("30009"));
    // let url = `https://tm.sanfu.com/ms-sanfu-spi-customer/v1/customer/wechatConfig`
    // let resss = (await axios.get(url, {
    //     headers: {
    //         "Authorization": authorizationHeader("30009"),
    //     },
    // }))
    let resss = await axios.post(
        `https://tm.sanfu.com/ms-sanfu-spi-customer/v1/coupon/sendCoupon?couponId=XX000846&curCusId=C20240108090001`,
        {
            couponId: 'C20240108090001',
            curCusId: 'XX000846',
        },
        {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": authorizationHeader(
                    "30009",
                    'XX000846',
                    'C20240108090001',
                ),
                // 其他可能的header
            },
        }
    );
    res.send(resss)
})

// 网页授权登录
app.get('/getCode', async (req, res) => {
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(process.env.REDUCE_URL)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    res.send(url)
})

app.post('/getUserInfo', async (req, res) => {
    const code = req.body.code;
    let access_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
    console.log(access_token_url);
    let token = (await axios.get(access_token_url)).data.access_token
    console.log('toktokenen', token);
    // let refresh_token_url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${process.env.APPID}&grant_type=refresh_token&refresh_token=${token}`
    // let refresh_token = (await axios.get(refresh_token_url)).data
    // console.log('refresh_token', refresh_token);
    // console.log('refresh_token', refresh_token.access_token);
    if (!token) {
        res.statusCode = 500
        res.errMsg = '没有token！'
    } else {
        let userInfo = `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=OPENID&lang=zh_CN`
        let user = (await axios.get(userInfo)).data
        console.log(user);
        res.send(user)
    }

})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})