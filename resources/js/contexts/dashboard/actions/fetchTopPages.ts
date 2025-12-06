import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'
import { HTTPResultsResponse } from '@/contexts/shared/libs/types'

export interface TopPage {
  path: string
  views: number
  uniqueViews: number
  avgTime: string
}

interface AnalyticsTopPagesResponse {
  data: TopPage[]
  configured: boolean
}

const fetchTopPages = async (limit: number = 5): Promise<AnalyticsTopPagesResponse> => {
  try {
    const response = await client.get<HTTPResultsResponse<AnalyticsTopPagesResponse>>(
      `/api/analytics/top-pages?limit=${limit}`
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default fetchTopPages
