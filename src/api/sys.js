import request from '@/utils/request'

/**
 * 登录
 * return promise
 */
export const login = data => {
  return request({
    url: '/accessUser/login',
    method: 'post',
    data,
  })
}
/**
  * 退出登录
  */
export const logout = () => {
  return request({
    url: 'accessUser/logout',
    method: 'post',
  })
}

// 登录之后   根据旧修改密码
export function reqUpdatePassword(data) {
  return request({
    url: '/accessUser/updatePassword',
    method: 'post',
    data,
  })
}
