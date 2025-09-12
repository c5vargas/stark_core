export interface ValidationErrorResponse {
  status: number
  message: string
  errors?: {
    [field: string]: string[]
  }
}

export interface Media {
  id: number
  uuid: string
  filename: string
  url: string
  mime: string
  size: number
}

export interface HTTPResultsResponse<T> {
  results: { data: T }
  status: number
}

export interface HTTPArrayResponse<T> {
  results: T
  status: number
}

export interface HTTPMessageResponse {
  message: string
  status: number
}

export type FormData = Record<string, string | number | boolean | File | null | object>
