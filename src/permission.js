/**
 * permission.js
 * 专门用于处理路由守卫
 */
import router from '@/router'
import store from '@/store'

// 路由白名单：未登录可访问
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 你从哪里来
 * @param {*} next 是否要去
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取，如果不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2、用户未登录，只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
