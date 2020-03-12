import wx from 'weixin-js-sdk'
import { browserVersions } from 'src/utils/myUtils'
import { getWXJsSign } from 'src/api/wechatApi'

export const initWxConfig = async (jsApiList) => {
    if (browserVersions().weixin) {
        let resp = await getWXJsSign()
        let data = resp.data
        wx.config({
            debug: false,
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId,
            // 必填，公众号的唯一标识
            timestamp: data.timestamp,
            // 必填，生成签名的时间戳
            nonceStr: data.nonceStr,
            // 必填，生成签名的随机串
            signature: data.signature,
            // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        })
    }
}