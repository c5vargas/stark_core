import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { User } from '@/contexts/user/libs/types'

interface IGetUsers {
  perPage: number
  page: number
  query?: string
}

const getUsers = async (payload: IGetUsers): Promise<User[]> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.get<HTTPResultsResponse<User[]>>('/api/users', formData)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUsers
