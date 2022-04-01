/**
 * store/modules/user.js
 * 用于处理所有 和 用户相关 的内容
 */
import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

const state = () => {
  return {
    token: getItem(TOKEN) || ''
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setItem(TOKEN, token)
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
          this.commit('user/setToken', data.data.data.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
