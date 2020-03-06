/**
 * 请求参数转换器
 */
import hexMd5 from './hexMd5'
import { appSecret } from 'src/config'

const getDateTime = (fmt, d) => {
    var isTime = d ? new Date(d) : new Date()

    var o = {
        'M+': isTime.getMonth() + 1,
        'd+': isTime.getDate(),
        'h+': isTime.getHours() % 12 === 0 ? 12 : isTime.getHours() % 12,
        'H+': isTime.getHours(),
        'm+': isTime.getMinutes(),
        's+': isTime.getSeconds(),
        'q+': Math.floor((isTime.getMonth() + 3) / 3),
        'S': isTime.getMilliseconds()
    }
    var week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (isTime.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[isTime.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const encryptParams = {
    sysType: '4', // 1:IOS 2:Android 3:pad 4:h5 5:微信小程序
    deviceNo: '123',  //  设备号(需要单独获取)
    deviceToken: '123',  //  IOS推送标识
    phoneModel: 'iphone 5s',
    versionNo: 1, // 应用版本号(从1开始累加)
    appVersion: '0.0.1',  //  app应用版本名称
    osVersion: '18438783413', // 操作系统版本号（浏览器）
    appKey: '888888',
    timestamp: 0, // 时间戳，必须重新赋值
    appType: 0, // 0:客户
}

export default (paramsObj) => {
    var timestamp = getDateTime('yyyy-MM-dd HH:mm:ss.S')
    var keyArr = ['sysType', 'deviceNo', 'deviceToken', 'phoneModel', 'versionNo', 'appVersion', 'osVersion', 'appKey', 'timestamp', 'appType', 'merchantId', 'customerNo']
    let keyArrStr = ',' + keyArr.join(',') + ','
    for (var param in paramsObj) {
        let paramsStr = ',' + param + ','
        if (keyArrStr.indexOf(paramsStr) === -1) keyArr.push(param)
    }
    keyArr.sort()
    for (var key in paramsObj) {
        for (var i = 0; i < keyArr.length; i++) {
            if (keyArr[i] === key) {
                try {
                    keyArr[i] = JSON.parse('{"' + key + '":"' + paramsObj[key] + '"}')
                } catch (e) {
                    keyArr[i] = { key: '' }
                    keyArr[i][key] = paramsObj[key]
                }
                continue
            }
        }
    }
    for (i = 0; i < keyArr.length; i++) {
        var val = keyArr[i]
        if (Object.prototype.toString.call(val).indexOf('String') > -1) {
            if (val === 'timestamp') {
                keyArr[i] = JSON.parse('{"' + val + '":"' + timestamp + '"}')
            } else {
                keyArr[i] = JSON.parse('{"' + val + '":"' + encryptParams[val] + '"}')
            }
        }
    }
    var ajaxParamsObj = {} //  ajax参数对象
    var signBeforeStr = '' // 加密前字符串
    var signStr = '' //  加密后的字符串
    for (var indexAry = 0; indexAry < keyArr.length; indexAry++) {
        var valueAry = keyArr[indexAry]
        for (var indexAryKey in valueAry) {
            var value = valueAry[indexAryKey]
            if (value == null || value === 'null' || value === undefined || value === 'undefined' || value === '') {
                continue
            }
            ajaxParamsObj[indexAryKey] = value
            signBeforeStr += indexAryKey + '=' + valueAry[indexAryKey]
        }
    }
    signStr = hexMd5(signBeforeStr + appSecret)
    return {
        data: JSON.stringify(ajaxParamsObj),
        sign: signStr
    }
}
