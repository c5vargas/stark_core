import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { User } from '../libs/types'
import formatPayload from '@/contexts/shared/libs/formatPayload'

const updateUserById = async (payload: Partial<User>): Promise<HTTPMessageResponse> => {
  const formData = formatPayload(payload)
  try {
    const response = await client.post<HTTPMessageResponse>(`/api/users/${payload.id}`, formData)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updateUserById
