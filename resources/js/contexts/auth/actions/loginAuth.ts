import client from '@/contexts/shared/libs/api/httpAxios'
import { Auth, CredentialsType } from '@/contexts/auth/libs/types'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPArrayResponse } from '@/contexts/shared/libs/types'
import formatPayload from '@/contexts/shared/libs/formatPayload'

interface LoginResponse {
  user: Auth
  token: string
}

const loginAuth = async (
  credentials: CredentialsType
): Promise<HTTPArrayResponse<LoginResponse>> => {
  try {
    const formData = formatPayload(credentials)
    const response = await client.post<HTTPArrayResponse<LoginResponse>>(
      '/api/auth/login',
      formData
    )
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default loginAuth
