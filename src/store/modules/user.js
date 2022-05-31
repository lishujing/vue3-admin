/**
 * store/modules/user.js
 * 用于处理所有 和 用户相关 的内容
 */
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN, ACCESS_USER } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

const state = () => {
  return {
    token: getItem(TOKEN) || '',
    accessUser: {}, // 登录后的用户对象
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  setAccessUser(state, accessUser) {
    state.accessUser = accessUser
    setItem(ACCESS_USER, accessUser)
  },
}

const actions = {
  /**
	 * 登录请求动作
	 */
  login(context, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        loginName: username,
        password: md5(password + 'gaea'),
        verifyCode: '',
      })
        .then(response => {
          const { code, data } = response
          if (code === '200') {
            this.commit('user/setToken', data.token)
            this.commit('user/setAccessUser', data)
            router.push('/')
            resolve(response)
          } else {
            reject(response.repMsg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
	 * 用户退出登录动作
	 */
  logout() {
    this.commit('user/setToken', '')
    this.commit('user/setAccessUser', {})
    removeAllItem()
    // TODO: 清理掉权限相关的配置
    router.push('/login')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
