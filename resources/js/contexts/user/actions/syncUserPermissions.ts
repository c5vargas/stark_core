import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { SyncPermissionsRequest } from '@/contexts/user/libs/types'

const syncUserPermissions = async (
  userId: number,
  payload: SyncPermissionsRequest
): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.post<HTTPMessageResponse>(
      `/api/users/${userId}/permissions`,
      payload
    )
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default syncUserPermissions
