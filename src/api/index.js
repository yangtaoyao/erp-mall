import axios from 'axios'
import qs from 'qs'
import store from 'store'
import common from 'assets/js/common'

/*
*qs模块对象转url形式
*qs.stringify
*解析url成对象形式
*qs.parse
*/
console.info(common.env)
/*
*
*/
const instance = axios.create({
    baseURL: common.serverUrl,
    timeout: 10000,
    // withCredentials: true, // 跨域请求时是否需要使用凭证
    paramsSerializer: params => {
        // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    transformRequest: [data => {
        // 在向服务器发送前修改请求数据，只适用于 POST
        return qs.stringify(data,   { arrayFormat: 'repeat' })
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// http 请求拦截器
instance.interceptors.request.use(config => {
    store.dispatch('setBtnLoading', !0)
    return config
}, error => {
    store.dispatch('setBtnLoading', !1)
    Message.error('数据加载超时！')
    return Promise.reject(error)
})

// http 响应拦截器
instance.interceptors.response.use(response => {
    store.dispatch('setBtnLoading', !1)
    return response
    },
    error => {
        store.dispatch('setBtnLoading', !1)
        Message.error('数据加载失败！')
        return Promise.reject(error)
    }
)

/**
 * 向后台请求数据的 API 接口
 */

// 登录接口
export const doLogin = params => instance.post('/erp/login/do', {params})
export const doLogout =() => instance.get('/erp/login/out')

export const getFiles =() => instance.get('/getFiles/rotateImg')
export const removeImage =params => instance.get('/upload/rotate_del',{params})