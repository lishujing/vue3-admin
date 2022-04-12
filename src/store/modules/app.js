const state = () => {
  return {
    sidebarOpened: true
  }
}

const mutations = {
  triggerSidebarOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
