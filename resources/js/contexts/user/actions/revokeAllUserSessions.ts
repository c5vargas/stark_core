import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

const revokeAllUserSessions = async (userId: number): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.delete<HTTPMessageResponse>(`/api/users/${userId}/sessions`)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default revokeAllUserSessions
