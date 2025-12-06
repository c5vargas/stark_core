import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'

export interface AnalyticsOverview {
  pageViews: number
  uniqueVisitors: number
  avgSessionDuration: string
  bounceRate: number
}

interface AnalyticsOverviewResponse {
  data: AnalyticsOverview
  configured: boolean
}

const fetchAnalyticsOverview = async (): Promise<AnalyticsOverviewResponse> => {
  try {
    const response =
      await client.get<HTTPResultsResponse<AnalyticsOverviewResponse>>('/api/analytics/overview')
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default fetchAnalyticsOverview
