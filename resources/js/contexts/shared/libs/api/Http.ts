import { AxiosRequestConfig } from 'axios'

export interface Http {
  get: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => Promise<T>
  post: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart?: boolean
  ) => Promise<T>
  put: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
    isMultipart?: boolean
  ) => Promise<T>
  delete: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => Promise<T>
}
