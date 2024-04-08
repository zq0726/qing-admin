import axios from 'axios'

import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { ResultData } from './interfance'

import { addPending, removePending } from './helper/cancleRequset'
import { checkStatus } from './helper/checkStatus'
import { openLoading, closeLoading } from './helper/loading'

interface CustomOptions {
  /** @name 是否开启loading层效果，默认为false */
  loading?: boolean
  /** @name 是否开启取消重复请求，默认为 true */
  repeat_request_cancel?: boolean
  /** @name 是否开启简洁的数据结构响应，默认为true **/
  reduct_data_format?: boolean
  /** @name 是否开启接口错误信息展示，默认为true **/
  error_message_show?: boolean
  /** @name 是否开启code不为0时的信息提示，默认为false **/
  code_message_show?: boolean
}

//自定义配置
let custom_options: CustomOptions = Object.assign({
  loading: false,
  repeat_request_cancel: true,
  reduct_data_format: true,
  error_message_show: true,
  code_message_show: false
})

class Request {
  service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: '/api',
      timeout: 1000 * 60 * 4
    })

    this.service.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        // const token = getToken()
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }

        if (custom_options.repeat_request_cancel) {
          removePending(request)

          addPending(request)
        }

        if (custom_options.loading) {
          openLoading({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' })
        }

        return request
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('custom_options', custom_options)
        console.log('response', response)
        custom_options.loading && closeLoading(custom_options)
        if (custom_options.repeat_request_cancel) {
          removePending(response.config)
        }

        const { data } = response
        console.log('data', data)
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          checkStatus(response.status, '')
          closeLoading(custom_options)
          return Promise.reject(error)
        } else {
          closeLoading(custom_options)
          return Promise.reject(error)
        }
      }
    )
  }

  get<T>(
    url: string,
    params?: object,
    customOptions?: CustomOptions,
    _object = {}
  ): Promise<ResultData<T>> {
    setCustomOption(customOptions)
    return this.service.get(url, { params, ..._object })
  }
  post<T>(
    url: string,
    params?: object,
    customOptions?: CustomOptions,
    _object = {}
  ): Promise<ResultData<T>> {
    setCustomOption(customOptions)
    return this.service.post(url, params, _object)
  }
  put<T>(
    url: string,
    params?: object,
    customOptions?: CustomOptions,
    _object = {}
  ): Promise<ResultData<T>> {
    setCustomOption(customOptions)
    return this.service.put(url, params, _object)
  }
  delete<T>(
    url: string,
    params?: any,
    customOptions?: CustomOptions,
    _object = {}
  ): Promise<ResultData<T>> {
    setCustomOption(customOptions)
    return this.service.delete(url, { params, ..._object })
  }
}

const setCustomOption = (customOptions?: CustomOptions) => {
  if (customOptions) {
    custom_options = Object.assign(custom_options, customOptions)
  }
}

export default new Request()
