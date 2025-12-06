import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPArrayResponse } from '@/contexts/shared/libs/types'
import formatPayload from '@/contexts/shared/libs/formatPayload'

interface ForgetPasswordRequest {
  email: string
}

interface ForgetPasswordResponse {
  message: string
}

const forgetPasswordAuth = async (
  data: ForgetPasswordRequest
): Promise<HTTPArrayResponse<ForgetPasswordResponse>> => {
  try {
    const formData = formatPayload(data)
    const response = await client.post<HTTPArrayResponse<ForgetPasswordResponse>>(
      '/api/auth/password/forget',
      formData
    )
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default forgetPasswordAuth
