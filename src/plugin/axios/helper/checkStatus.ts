import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 错误处理通过实际进行处理
 * @param status
 * @param msg
 */
export function checkStatus(status: number, msg?: string): void {
  switch (status) {
    case 400:
      ElMessage.error(msg ? msg : '请求失败！请您稍后重试')
      break
    case 401:
      console.log('登录失效！请您重新登录', '登录过期')
      break
    case 403:
      ElMessage.error(msg ? msg : '当前账号无权限访问！')
      break
    case 404:
      ElMessage.error(msg ? msg : '你所访问的资源不存在！')
      break
    case 405:
      ElMessage.error(msg ? msg : '请求方式错误！请您稍后重试')
      break
    case 408:
      ElMessage.error(msg ? msg : '请求超时！请您稍后重试')
      break
    case 500:
      ElMessage.error(msg ? msg : '服务异常！')
      break
    case 502:
      ElMessage.error(msg ? msg : '网关错误！')
      break
    case 503:
      ElMessage.error(msg ? msg : '服务不可用！')
      break
    case 504:
      ElMessage.error(msg ? msg : '网关超时！')
      break
    default:
      ElMessage.error(msg ? msg : '')
  }
}
