/**
 * getters
 * 使用 getters 起到 快捷访问的作用
 *
 * getters 是vuex的计算属性
 */

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  /**
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}

export default getters
