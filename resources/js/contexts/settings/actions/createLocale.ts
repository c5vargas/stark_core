import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

export interface ICreateLocale {
  code: string
  name: string
}

const createLocale = async (payload: ICreateLocale): Promise<HTTPMessageResponse> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.post<HTTPMessageResponse>('/api/languages', formData)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default createLocale
