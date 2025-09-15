import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { User } from '@/contexts/user/libs/types'

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<User[]>>('/api/users')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUsers
