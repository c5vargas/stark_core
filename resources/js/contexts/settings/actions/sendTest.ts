import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

const sendMailerTest = async (email: string): Promise<HTTPMessageResponse> => {
  try {
    const payload = formatPayload({ email })
    const response = await client.post<HTTPMessageResponse>('/api/settings/mail', payload)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default sendMailerTest
