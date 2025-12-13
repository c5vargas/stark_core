import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

const deleteCustomField = async (id: number): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.delete<HTTPMessageResponse>(`/api/custom-fields/${id}`)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default deleteCustomField
