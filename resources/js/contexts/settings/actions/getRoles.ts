import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'
import { Permission, Role } from '@/contexts/settings/libs/types'

interface IResponse {
  permissions: Permission[]
  roles: Role[]
}

const getRoles = async (): Promise<IResponse> => {
  try {
    const response = await client.get<HTTPResultsResponse<IResponse>>('/api/roles')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getRoles
