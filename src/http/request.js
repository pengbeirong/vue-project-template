import axios from 'axios'
import router from 'src/router'
import { isNotEmpty } from 'src/utils/myUtils'
import { removeStorageTokenId } from 'src/api/myStorage'
import { BASE_API } from 'src/config/resource.path'

// create an axios instance
const service = axios.create({
    baseURL: BASE_API, // api的base_url
})

service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.head['Access-Control-Allow-Origin'] = '*'
service.defaults.headers.head['Access-Control-Allow-Credentials'] = 'true'
service.defaults.headers.head['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
service.defaults.headers.head['Access-Control-Allow-Headers'] = 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'

// request interceptor
service.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(response => {
    let errorMessage
    let showErrorMessage = true
    if (response.status === 200) {
        if (response.data && response.data !== '') {
            if (response.data.code === '004') {
                errorMessage = 'token Invalid'
                showErrorMessage = false
                removeStorageTokenId()
                window.location.reload()
            } else if (response.data.code !== '000') {
                errorMessage = response.data.errorMessage
            }
        } else {
            errorMessage = 'data is null'
        }
        if (isNotEmpty(errorMessage)) {
            return Promise.reject(errorMessage)
        } else {
            return Promise.resolve(response.data.data)
        }
    } else {
        errorMessage = 'error'
        return Promise.reject(errorMessage)
    }
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: '/',
                    query: { redirect: router.currentRoute.fullPath }
                })
        }
        return Promise.reject(error.response.data)
    } else {
        return Promise.reject(error)
    }
})

export default service
