import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { Auth } from '../libs/types'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'

const getAuth = async (): Promise<HTTPResultsResponse<Auth>> => {
  try {
    const response = await client.get<HTTPResultsResponse<Auth>>('/api/auth')
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getAuth
