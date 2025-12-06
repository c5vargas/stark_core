export function isValidationError(error: unknown): error is { errors?: Record<string, string[]> } {
  return typeof error === 'object' && error !== null && 'errors' in error
}
