/**
 * store/modules/user.js
 * 用于处理所有 和 用户相关 的内容
 */
import { login } from '@/api/sys'
import md5 from 'md5'

const mutations = {}

const actions = {
  /**
   * 登录请求动作
   */
  login(context, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      this.login({
        username,
        password: md5(password)
      })
        .then((data) => {
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
  state: () => ({}),
  mutations,
  actions
}
