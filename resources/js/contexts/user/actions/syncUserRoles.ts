import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { SyncRolesRequest } from '@/contexts/user/libs/types'

const syncUserRoles = async (
  userId: number,
  payload: SyncRolesRequest
): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.post<HTTPMessageResponse>(`/api/users/${userId}/roles`, payload)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default syncUserRoles
