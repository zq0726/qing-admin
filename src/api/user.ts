import { get, post, put, del } from '../utils/request'

/**
 * 用户接口
 * 定义用户数据结构
 */
export interface User {
  id: number // 用户 ID
  username: string // 用户名
  email: string // 邮箱地址
  nickname: string // 昵称
  avatar: string // 头像 URL
  createdAt: string // 创建时间
  updatedAt: string // 更新时间
}

/**
 * 登录参数接口
 */
export interface LoginParams {
  username: string // 用户名
  password: string // 密码
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  token: string // 访问令牌
  user: User // 用户信息
}

/**
 * 用户登录
 * @param params - 登录参数
 * @returns Promise<登录响应>
 */
export const login = (params: LoginParams): Promise<LoginResponse> => {
  return post('/auth/login', params)
}

/**
 * 用户登出
 * @returns Promise<void>
 */
export const logout = (): Promise<void> => {
  return post('/auth/logout')
}

/**
 * 获取当前用户信息
 * @returns Promise<User>
 */
export const getUserInfo = (): Promise<User> => {
  return get('/user/info')
}

/**
 * 更新用户信息
 * @param data - 用户数据（支持部分更新）
 * @returns Promise<User>
 */
export const updateUserInfo = (data: Partial<User>): Promise<User> => {
  return put('/user/info', data)
}

/**
 * 获取用户列表（分页）
 * @param page - 页码（从 1 开始）
 * @param size - 每页数量
 * @returns Promise<用户列表响应>
 */
export const getUserList = (
  page: number,
  size: number,
): Promise<{ list: User[]; total: number }> => {
  return get('/users', { page, size })
}

/**
 * 删除用户
 * @param id - 用户 ID
 * @returns Promise<void>
 */
export const deleteUser = (id: number): Promise<void> => {
  return del(`/users/${id}`)
}
