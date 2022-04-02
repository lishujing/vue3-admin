/**
 * store/modules/user.js
 * 用于处理所有 和 用户相关 的内容
 */
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

const state = () => {
  return {
    token: getItem(TOKEN) || '',
    userInfo: {}
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  /**
   * 登录请求动作
   */
  login(context, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((data) => {
          this.commit('user/setToken', data.token)
          // 保存登录时间
          setTimeStamp()
          // 登录成功跳转
          router.push('/')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /**
   * 获取用户信息
   */
  async getUserInfo(context) {
    const res = await getUserInfo()
    this.commit('user/setUserInfo', res)
    return res
  },
  /**
   * 用户退出登录动作
   */
  logout() {
    this.commit('user/setToken', '')
    this.commit('user/setUserInfo', {})
    removeAllItem()
    // TODO: 清理掉权限相关的配置
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
