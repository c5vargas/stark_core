import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse, Media } from '@/contexts/shared/libs/types'

const fetchMedia = async (): Promise<Media[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<Media[]>>('/api/media')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default fetchMedia
