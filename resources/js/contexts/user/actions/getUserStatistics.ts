import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { UserStatistics } from '@/contexts/user/libs/types'

const getUserStatistics = async (): Promise<UserStatistics> => {
  try {
    const response = await client.get<HTTPResultsResponse<UserStatistics>>('/api/users/statistics')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUserStatistics
