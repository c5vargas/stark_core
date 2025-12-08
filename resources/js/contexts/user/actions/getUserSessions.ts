import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { UserSession } from '@/contexts/user/libs/types'

const getUserSessions = async (userId: number): Promise<UserSession[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<UserSession[]>>(
      `/api/users/${userId}/sessions`
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUserSessions
