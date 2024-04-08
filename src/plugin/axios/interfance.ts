interface Result {
  code: number
  msg?: string
  success: boolean
  timestamp?: number
}

export interface ResultData<T = any> extends Result {
  data: T
}
