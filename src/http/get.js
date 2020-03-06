import http from './request'
import store from 'src/store'
import * as types from 'src/store/mutations-types'
let TIMEOUT_FN = null

// 设置加载gif图的定时器
const timeoutFn = () => {
    let time = +new Date()
    clearInterval(TIMEOUT_FN) // 每一次请求先清空定时器，然后再重启定时器
    TIMEOUT_FN = setInterval(() => {
        if (+new Date() - time > 1000) {
            store.commit(types.UPDATE_LOADING_STATUS, true) 
        }
    }, 1000)
}

// 清空倒计时方法
const clearIntervalFn = () => {
    clearInterval(TIMEOUT_FN)
    store.commit(types.UPDATE_LOADING_STATUS, false)
}

export default async (url, params) => {
    timeoutFn()
    return new Promise((resolve, reject) => {
        http.get(url, params).then(res => {
            resolve(res)
            clearIntervalFn()
        }).catch(error => {
            reject(error)
            clearIntervalFn()
        })
    })
}
