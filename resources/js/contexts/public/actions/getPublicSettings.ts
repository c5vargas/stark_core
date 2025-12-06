import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPArrayResponse } from '@/contexts/shared/libs/types'

export interface PublicSettings {
  app_name?: string
  app_logo?: string
  gdpr_privacy_page?: string
  gdpr_cookies_page?: string
}

const getPublicSettings = async (): Promise<PublicSettings> => {
  try {
    const response = await client.get<HTTPArrayResponse<PublicSettings>>('/api/public/settings')
    return response.results
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getPublicSettings

