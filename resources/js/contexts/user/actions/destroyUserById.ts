import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

interface DestroyUserByIdParams {
  userId?: number
}

const destroyUserById = async ({ userId }: DestroyUserByIdParams): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.delete<HTTPMessageResponse>(`/api/users/${userId}`)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default destroyUserById
