import { get } from '@/utils/request'

enum Api {
  catInfo = '/pet/1',
}

export const getCatInfo = () => get<{ id: number; name: string }>(Api.catInfo)
