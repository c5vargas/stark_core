import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { CustomField } from '@/contexts/user/libs/types'

const getCustomFields = async (): Promise<CustomField[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<CustomField[]>>('/api/custom-fields')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getCustomFields
