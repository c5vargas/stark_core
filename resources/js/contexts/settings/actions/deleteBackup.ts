import client from '@/contexts/shared/libs/api/httpAxios'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'

const deleteBackup = async (type: string, filename: string): Promise<void> => {
  try {
    await client.delete(`/api/backups/${type}/${filename}`)
  } catch (error: unknown) {
    throw new Error(handleHttpError(error))
  }
}

export default deleteBackup
