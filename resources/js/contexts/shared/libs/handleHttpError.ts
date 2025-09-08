import { isAxiosError } from 'axios'
import { ValidationErrorResponse } from './types'

function handleHttpError(error: unknown): string {
  if (isAxiosError<ValidationErrorResponse>(error)) {
    const { response, request } = error

    if (response) {
      const { status, data } = response
      const errorMessage = data?.message

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
          if (data.errors) {
            const validationMessages = Object.values(data.errors).flat()[0]
            return validationMessages
          }
          return errorMessage || 'Validation error occurred.'
        default:
          return 'Unexpected server error. Please try again later.'
      }
    }

    if (request) {
      return 'Could not communicate with the server. Please check your connection.'
    }
  }

  if (error instanceof Error) return error.message

  return 'An unexpected error occurred. Please try again later.'
}

export default handleHttpError
