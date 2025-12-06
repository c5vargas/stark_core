import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPPaginatedResponse } from '@/contexts/shared/libs/types'
import { DataTableResponse, DataTableParams } from '@/contexts/shared/libs/dataTable/types'

export interface ActivityLog {
  id: number
  action: string
  model_type: string | null
  model_id: number | null
  description: string
  properties: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
  user?: {
    id: number
    name: string
    email: string
  }
}

const getActivityLogs = async (
  params: DataTableParams
): Promise<DataTableResponse<ActivityLog>> => {
  try {
    // Construir query params para el backend
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

    // Agregar filtros
    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters![key] !== null && params.filters![key] !== '') {
          queryParams[key] = params.filters![key]
        }
      })
    }

    // Agregar búsqueda semántica
    if (params.query) {
      queryParams.query = params.query
    }

    const response = await client.get<HTTPPaginatedResponse<ActivityLog>>(
      '/api/activity-logs',
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

export default getActivityLogs
