import { QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'
import axios, { type AxiosRequestConfig } from 'axios'
import { getEnv } from '~/utils/helper'

export const queryPluginOptions: VueQueryPluginOptions = {
  queryClient: new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } }
  })
}

export const axiosInstance = axios.create({
  baseURL: getEnv('DODO_API_URI') || 'http://localhost:3000'
})

export function fetcher<T>(endpoint: string, options?: AxiosRequestConfig) {
  return () => axiosInstance.get<T>(endpoint, options).then((res) => res.data)
}
