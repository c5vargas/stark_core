import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPPaginatedResponse } from '@/contexts/shared/libs/types'
import { DataTableResponse, DataTableParams } from '@/contexts/shared/libs/dataTable/types'
import { ActivityLog } from '@/contexts/settings/actions/getActivityLogs'

const getUserActivityLogs = async (
  userId: number,
  params: DataTableParams
): Promise<DataTableResponse<ActivityLog>> => {
  try {
    const queryParams: Record<string, unknown> = {
      page: params.page,
      perPage: params.perPage,
    }

    if (params.sortBy) {
      queryParams.sortBy = params.sortBy
    }

    if (params.sortOrder) {
      queryParams.sortOrder = params.sortOrder
    }

    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters![key] !== null && params.filters![key] !== '') {
          queryParams[key] = params.filters![key]
        }
      })
    }

    if (params.query) {
      queryParams.query = params.query
    }

    const response = await client.get<HTTPPaginatedResponse<ActivityLog>>(
      `/api/users/${userId}/activity-logs`,
      queryParams
    )

    return {
      data: response.results.data,
      meta: response.results.meta,
    }
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getUserActivityLogs
