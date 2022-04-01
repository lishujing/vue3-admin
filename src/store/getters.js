/**
 * getters
 * 使用 getters 起到 快捷访问的作用
 *
 * getters 是vuex的计算属性
 */

const getters = {
  token: (state) => state.user.token
}

export default getters
