import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'
import { SettingsMap } from '@/contexts/settings/libs/types'

const updateSettings = async (payload: Partial<SettingsMap>): Promise<HTTPMessageResponse> => {
  try {
    const response = await client.post<HTTPMessageResponse>('/api/settings', payload)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updateSettings
