import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = 'D07E8BA436F145CB'
  // 必须返回 config
  return config
})

// 响应拦截器
service.interceptors.response.use(
  // 1、请求成功
  (response) => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 1、成功返回解析后的数据
      return data
    } else {
      // 2、失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 2、请求失败
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
