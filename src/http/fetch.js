import http from './request'
import requestParamsConvertor from './requestParamsConvertor'
import store from 'src/store'
import * as types from 'src/store/mutations-types'
import { getTokenId } from 'src/api/token'
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

const doPost = (url, params) => {
    return new Promise((resolve, reject) => {
        http.post(url, params).then(res => {
            resolve(res)
            clearIntervalFn()
        }).catch(error => {
            reject(error)
            clearIntervalFn()
        })
    })
}
const doGet = (url, params) => {
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

const simulatedData = (url, data) => {
    url = url.replace(/\//g, '.')
    url = url + '.json'
    return doGet(url, data)
}

const request = (url, data, type) => {
    let paramsObj = requestParamsConvertor(data)
    if (process.env.ENV_CONFIG !== 'dev' || process.env.ENV_CONFIG_REMOTE === '1') {
        url = url + '?sign=' + paramsObj.sign
        data = paramsObj.data
        type = type.toUpperCase()
        if (type === 'GET') {
            return doGet(url, data)
        } else if (type === 'POST') {
            return doPost(url, data)
        }
    } else {
        return simulatedData(url, data)
    }
}

export default (url = '', data = {}, needToken = true, type = 'POST') => {
    timeoutFn()
    if (needToken) {
        return new Promise((resolve, reject) => {
            getTokenId().then((tokenId) => {
                data.tokenId = tokenId
                request(url, data, type).then((data) => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            request(url, data, type).then((data) => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}