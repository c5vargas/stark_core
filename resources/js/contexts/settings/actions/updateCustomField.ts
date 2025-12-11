import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { CustomField } from '@/contexts/user/libs/types'

const updateCustomField = async (
  id: number,
  payload: Partial<CustomField>
): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.post<HTTPMessageResponse>(`/api/custom-fields/${id}`, payload)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updateCustomField
