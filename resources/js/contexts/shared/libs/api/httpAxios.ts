import axios, { AxiosRequestConfig } from 'axios'
import { Http } from './Http'

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('__auth__')
  return token ? { ...defaultHeaders, Authorization: `Bearer ${token}` } : defaultHeaders
}

const getHeaders = (isMultipart: boolean = false): Record<string, string> => {
  const authHeaders = getAuthHeaders()
  return isMultipart ? { ...authHeaders, 'Content-Type': 'multipart/form-data' } : authHeaders
}

const httpAxios: Http = {
  get: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const headers = getHeaders()
    const response = await axios.get<T>(path, { ...config, params, headers })
    return response.data
  },

  post: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart: boolean = false
  ): Promise<T> => {
    const headers = getHeaders(isMultipart)
    const response = await axios.post<T>(path, { ...params }, { ...config, headers })
    return response.data
  },

  put: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart: boolean = false
  ): Promise<T> => {
    const headers = getHeaders(isMultipart)
    const response = await axios.put<T>(path, { ...params }, { ...config, headers })
    return response.data
  },

  delete: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const headers = getHeaders()
    const response = await axios.delete<T>(path, { ...config, params, headers })
    return response.data
  },
}

export default httpAxios
