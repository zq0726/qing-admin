import http from '@/plugin/axios'

enum Api {
  captcha = '/captcha',
  login = '/login'
}

/**
 * 获取验证码
 */
export const getCaptcha = () => http.get(Api.captcha + `?t=${new Date().getTime()}`)

/**
 * 登录
 */
export const login = (data: { account: string; password: string }) => http.post(Api.login, data)
