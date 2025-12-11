import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { CustomField } from '@/contexts/user/libs/types'

const createCustomField = async (payload: Partial<CustomField>): Promise<CustomField> => {
  try {
    const response = await client.post<HTTPResultsResponse<CustomField>>(
      '/api/custom-fields',
      payload
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default createCustomField
