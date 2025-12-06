import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'

export interface Backup {
  type: 'database' | 'files'
  filename: string
  size: string
  size_bytes: number
  created_at: string
  path: string
}

const getBackups = async (type: 'all' | 'database' | 'files' = 'all'): Promise<Backup[]> => {
  try {
    const response = await client.get<{ results: { data: Backup[] }; status: number }>(
      '/api/backups',
      {
        params: { type },
      }
    )
    return response.results.data
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default getBackups
