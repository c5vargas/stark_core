import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'

const createBackup = async (type: 'database' | 'files' | 'both'): Promise<void> => {
  try {
    await client.post('/api/backups', { type })
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default createBackup
