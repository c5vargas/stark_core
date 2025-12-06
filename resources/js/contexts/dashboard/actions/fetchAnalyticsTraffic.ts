import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'

export interface TrafficDataPoint {
  day: string
  views: number
  visitors: number
}

interface AnalyticsTrafficResponse {
  data: TrafficDataPoint[]
  configured: boolean
}

const fetchAnalyticsTraffic = async (
  range: '7d' | '30d' | '90d' = '7d'
): Promise<AnalyticsTrafficResponse> => {
  try {
    const response = await client.get<HTTPResultsResponse<AnalyticsTrafficResponse>>(
      `/api/analytics/traffic?range=${range}`
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default fetchAnalyticsTraffic
