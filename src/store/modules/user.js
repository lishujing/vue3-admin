/**
 * store/modules/user.js
 * 用于处理所有 和 用户相关 的内容
 */
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
