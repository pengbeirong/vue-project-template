import wx from 'weixin-js-sdk'
import { initWxConfig } from 'src/utils/initWxConfig'
import { getStorageTokenId } from 'src/api/myStorage'

export const scanQRCodeFun = () => {
    return new Promise((resolve, reject) => {
        wx.scanQRCode({ // 微信扫一扫接口
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success (res) {
                let getCode = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                resolve(getCode)
            },
            fail (error){
                reject(error)
            }
        })
    })
}

export const checkJsApiFun = () => {
    return new Promise((resolve, reject) => {
        wx.checkJsApi({ // 判断当前客户端版本是否支持指定JS接口
            jsApiList: [
                'scanQRCode'
            ],
            success (res) { // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
                if (res.checkResult.scanQRCode === true) {
                    resolve(res)
                } else {
                    reject(res)
                    alert('抱歉，当前客户端版本不支持扫一扫')
                }
            },
            fail (res) { // 检测getNetworkType该功能失败时处理
                reject(res)
            }
        })
    })
}

//微信扫一扫
export const openWxScan = ()=>{
    return new Promise(async (resolve, reject) => {
        await initWxConfig(['checkJsApi','scanQRCode'])
        wx.ready(async () => {
            await checkJsApiFun()
            let res = await scanQRCodeFun()
            resolve(res)
        })
    })
}