import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { BulkActionRequest } from '@/contexts/user/libs/types'

const bulkUserAction = async (payload: BulkActionRequest): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.post<HTTPMessageResponse>('/api/users/bulk', payload)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default bulkUserAction
