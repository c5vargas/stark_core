import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'

export interface HealthCheck {
  status: 'healthy' | 'warning' | 'unhealthy'
  message: string
  total?: string
  free?: string
  used?: string
  usage_percent?: number
}

export interface HealthStatus {
  status: 'healthy' | 'warning' | 'unhealthy'
  timestamp: string
  checks: {
    database: HealthCheck
    cache: HealthCheck
    redis: HealthCheck
    disk_space: HealthCheck
  }
}

const getHealth = async (): Promise<HealthStatus> => {
  try {
    // Use authenticated endpoint for detailed health info
    const response = await client.get<HealthStatus>('/api/health')
    return response
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getHealth
