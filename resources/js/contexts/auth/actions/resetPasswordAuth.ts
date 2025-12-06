import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPArrayResponse } from '@/contexts/shared/libs/types'
import formatPayload from '@/contexts/shared/libs/formatPayload'

interface ResetPasswordRequest {
  token: string
  email: string
  password: string
  password_confirmation: string
}

interface ResetPasswordResponse {
  message: string
}

const resetPasswordAuth = async (
  data: ResetPasswordRequest
): Promise<HTTPArrayResponse<ResetPasswordResponse>> => {
  try {
    const formData = formatPayload(data)
    const response = await client.post<HTTPArrayResponse<ResetPasswordResponse>>(
      '/api/auth/password/reset',
      formData
    )
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default resetPasswordAuth
