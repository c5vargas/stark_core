import { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error
}
