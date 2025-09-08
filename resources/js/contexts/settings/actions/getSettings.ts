import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Setting } from '../libs/types'

const getSettings = async (): Promise<Setting[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<Setting[]>>('/api/settings')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getSettings
