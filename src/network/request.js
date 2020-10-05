// 封装网络请求模块
import axios from 'axios'
export function request (config) {
  // 1、创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 10000
  })
  // 2、axios的拦截器
  instance.interceptors.request.use(config => {
    // console.log(config)

    return config
  }, error => {
    console.log(error)
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res.data)
    return res
  }, error => {
    console.log(error)
  })
  // 3、发送真正的网络请求
  return instance(config)
}
