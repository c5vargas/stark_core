import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Media } from '../libs/types'

const uploadMedia = async (file: File): Promise<Media> => {
  try {
    const response = await client.post<HTTPResultsResponse<Media>>('/api/media', { file }, {}, true)
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default uploadMedia
