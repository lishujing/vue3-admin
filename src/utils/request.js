import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
// import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization =
			getItem(TOKEN) == null || getItem(TOKEN) == undefined
			  ? ''
			  : getItem(TOKEN)
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 1、请求成功
  response => {
    /**
		 * code为非20000是抛错 可结合自己业务进行修改
		 */
    const res = response.data
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code == '50008' || res.code == '50012' || res.code == '50014') {
      ElMessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '重新登录',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = '/'
      })
    } else if (res.code !== '200') {
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      })
      return response.data
    } else {
      return response.data
    }
  },
  // 2、请求失败
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
