import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { User } from '@/contexts/user/libs/types'
import formatPayload from '@/contexts/shared/libs/formatPayload'

const createUser = async (payload: Partial<User>): Promise<User> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.post<HTTPResultsResponse<User>>('/api/users', formData)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default createUser
