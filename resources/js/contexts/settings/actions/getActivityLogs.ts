import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'

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

interface GetActivityLogsParams {
  page?: number
  perPage?: number
  user_id?: number
  action?: string
  model_type?: string
  query?: string
  start_date?: string
  end_date?: string
}

const getActivityLogs = async (params: GetActivityLogsParams = {}): Promise<ActivityLog[]> => {
  try {
    const response = await client.get<HTTPResultsResponse<ActivityLog[]>>('/api/activity-logs', {
      params,
    })
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getActivityLogs
