import http from '@/plugin/axios'
enum Api {
  country = '/admin/country'
}

export const getCountry = () => http.get(Api.country)
