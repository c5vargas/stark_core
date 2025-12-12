import { isAxiosError } from 'axios'
import { ValidationErrorResponse } from './types'

function handleHttpError(error: unknown): string {
  if (isAxiosError<ValidationErrorResponse>(error)) {
    const response = error.response

    if (response) {
      const status = response.status
      const data = response.data
      const errorMessage =
        typeof data === 'object' && data !== null && 'message' in data
          ? String(data.message)
          : undefined

      if (errorMessage && status !== 422) return errorMessage

      switch (status) {
        case 400:
          return errorMessage || 'Bad request.'
        case 401:
          return 'Authentication error. Please try again.'
        case 403:
          return 'You do not have permission to access this resource.'
        case 404:
          return 'Element not found.'
        case 422:
          if (
            typeof data === 'object' &&
            data !== null &&
            'errors' in data &&
            typeof data.errors === 'object' &&
            data.errors !== null
          ) {
            const errors = data.errors as Record<string, string[]>
            const validationMessages = Object.values(errors).flat()
            return validationMessages[0] || 'Validation error occurred.'
          }
          return errorMessage || 'Validation error occurred.'
        default:
          return 'Unexpected server error. Please try again later.'
      }
    }

    if (error.request) {
      return 'Could not communicate with the server. Please check your connection.'
    }
  }

  if (error instanceof Error) return error.message

  return 'An unexpected error occurred. Please try again later.'
}

export default handleHttpError
