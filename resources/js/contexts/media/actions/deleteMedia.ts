import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

interface DeleteMediaParams {
  id: number
}

const deleteMedia = async ({ id }: DeleteMediaParams): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.delete<HTTPMessageResponse>(`/api/media/${id}`)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default deleteMedia
