import axios from 'axios'
import qs from 'qs'

// 响应时间
axios.defaults.timeout = 5000
  // 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // 配置接口地址
axios.defaults.baseURL = 'localhost:3000'

// POST传参序列化(添加请求拦截器)
axios.interceptors.requset.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('错误的传参', 'fail')
  return Promise.reject(error)
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (!res.data.success) {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('网络异常', 'fail')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then((res) => {
        resolve(res.data)
      }, (error) => {
        reject(error)
      }).catch((error) => {
        reject(error)
      })
  })
}
