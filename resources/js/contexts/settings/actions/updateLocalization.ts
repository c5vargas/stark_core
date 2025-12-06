import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

export interface IUpdateLocalization {
  code: string
  strings: [string, string][]
}

const updateLocalization = async (payload: IUpdateLocalization): Promise<HTTPMessageResponse> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.post<HTTPMessageResponse>(
      `/api/languages/${payload.code}`,
      formData
    )
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updateLocalization
