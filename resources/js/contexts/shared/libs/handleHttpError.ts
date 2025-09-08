import { ValidationErrorResponse } from "./types";

function handleHttpError(error: any): string {
  if (error.response) {
    const { status, data }: { status: number; data: ValidationErrorResponse } = error.response;
    const errorMessage = data?.message;

    if(errorMessage && status !== 422)
      return errorMessage;

    switch (status) {
      case 401:
        return 'Authentication error. Please try again.';
      case 403:
        return 'You do not have permission to access this resource.';
      case 404:
        return 'Element not found';
      case 400:
        return errorMessage;
      case 422:
        if (data.errors) {
          const validationMessages = Object.values(data.errors).flat()[0];
          return validationMessages;
        }
        return errorMessage || 'Validation error occurred.';
      default:
        return 'Authentication error. Please try again.';
    }
  } else if (error.request) {
    return 'Could not communicate with the server. Please check your connection.';
  } else {
    return 'Unexpected error. Please try again later.';
  }
}

export default handleHttpError;