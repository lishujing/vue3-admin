import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 icode
    config.headers.icode = 'D07E8BA436F145CB'
    // 在这个位置统一的去注入token
    if (store.getters.token) {
      // 主动介入 token 失效的情况
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 必须返回 config
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token 超时
      store.dispatch('user/logout')
    }
    // 提示错误信息
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
