import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Language } from '../libs/types'

const getLocales = async (): Promise<Language[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<Language[]>>('/api/languages')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getLocales
