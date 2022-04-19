import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
const state = () => {
  return {
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }
}

const mutations = {
  triggerSidebarOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  },
  /**
   * 设置国际化
   */
  setLanguage(state, lang) {
    setItem(LANG, lang)
    state.language = lang
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
