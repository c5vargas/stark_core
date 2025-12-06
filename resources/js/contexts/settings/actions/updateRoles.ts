import client from '@/contexts/shared/libs/api/httpAxios'
import formatPayload from '@/contexts/shared/libs/formatPayload'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPMessageResponse } from '@/contexts/shared/libs/types'

export interface IUpdateRoles {
  id: number
  name: string
  perms: number[]
}

const updateRoles = async (payload: IUpdateRoles): Promise<HTTPMessageResponse> => {
  try {
    const formData = formatPayload(payload)
    const response = await client.post<HTTPMessageResponse>('/api/roles/update', formData)
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default updateRoles
