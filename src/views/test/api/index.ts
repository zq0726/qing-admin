import http from '@/plugin/axios'

import myAxios from '@/plugin/axios1'

enum Api {
  test = '/admin',
  country = '/admin/country'
}

export const getTest = () => http.get(Api.test, {}, { loading: true })
export const getTest1 = () =>
  myAxios({
    url: Api.test,
    method: 'get'
  })
export const getCountry = () => http.get(Api.country)
