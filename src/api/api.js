import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// 响应时间
axios.defaults.timeout = 5000
// 配置cookie
axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 配置接口地址
axios.defaults.baseURL = 'api'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (err) => {
  console.log('错误的传参', 'fail')
  return Promise.reject(err)
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (res.data.code === '200') {
    return res
  } else {
    return Promise.reject(res)
  }
}, (err) => {
  console.log('异常：' + err.message)
  return Promise.reject(err.message)
})

// 发送请求
export function fetch (url, params) {
  if (!params) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  }
}
Vue.prototype.secret = 'vueNodeExpressMongooseLearn'
export default fetch
Vue.prototype.types = [{
  value: '全部类型',
  label: '全部类型'
}, {
  value: '剧情',
  label: '剧情'
}, {
  value: '爱情',
  label: '爱情'
}, {
  value: '喜剧',
  label: '喜剧'
}, {
  value: '科幻',
  label: '科幻'
}, {
  value: '动作',
  label: '动作'
}, {
  value: '悬疑',
  label: '悬疑'
}, {
  value: '犯罪',
  label: '犯罪'
}, {
  value: '恐怖',
  label: '恐怖'
}, {
  value: '青春',
  label: '青春'
}, {
  value: '励志',
  label: '励志'
}, {
  value: '战争',
  label: '战争'
}, {
  value: '文艺',
  label: '文艺'
}, {
  value: '黑色幽默',
  label: '黑色幽默'
}, {
  value: '传记',
  label: '传记'
}, {
  value: '情色',
  label: '情色'
}, {
  value: '暴力',
  label: '暴力'
}, {
  value: '音乐',
  label: '音乐'
}, {
  value: '家庭',
  label: '家庭'
}]
Vue.prototype.ratings = [{
  value: '0',
  label: '默认'
}, {
  value: '9',
  label: '9分以上'
}, {
  value: '8',
  label: '8分以上'
}, {
  value: '7',
  label: '7分以上'
}, {
  value: '6',
  label: '6分以上'
}, {
  value: '5',
  label: '5分以上'
}, {
  value: '4',
  label: '5分以下'
}]
