import axios, { AxiosRequestConfig } from 'axios'
import { Http } from './Http'

// Create axios instance with credentials enabled for cookie-based authentication
const axiosInstance = axios.create({
  withCredentials: true,
})

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
}

const getHeaders = (isMultipart: boolean = false): Record<string, string> => {
  return isMultipart ? { ...defaultHeaders, 'Content-Type': 'multipart/form-data' } : defaultHeaders
}

const httpAxios: Http = {
  get: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const headers = getHeaders()
    const response = await axiosInstance.get<T>(path, { ...config, params, headers })
    return response.data
  },

  post: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart: boolean = false
  ): Promise<T> => {
    const headers = getHeaders(isMultipart)
    const response = await axiosInstance.post<T>(path, { ...params }, { ...config, headers })
    return response.data
  },

  put: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart: boolean = false
  ): Promise<T> => {
    const headers = getHeaders(isMultipart)
    const response = await axiosInstance.put<T>(path, { ...params }, { ...config, headers })
    return response.data
  },

  delete: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const headers = getHeaders()
    const response = await axiosInstance.delete<T>(path, { ...config, params, headers })
    return response.data
  },
}

export default httpAxios
