/**
 * theme.js 用于处理 主题色 相关内容
 */
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

const state = () => {
  return {
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }
}

const mutations = {
  /**
   * 设置主题色
   */
  setMainColor(state, newColor) {
    state.mainColor = newColor
    setItem(MAIN_COLOR, newColor)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
