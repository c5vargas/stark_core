import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Button } from '@/contexts/shared/components/Button'
import { InfoCard } from '../components/InfoCard'
import getBackups, { Backup } from '../actions/getBackups'
import createBackup from '../actions/createBackup'
import deleteBackup from '../actions/deleteBackup'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import Loading from '@/contexts/shared/components/Loading'

const BackupsPage = () => {
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const queryClient = useQueryClient()
  const [backupType, setBackupType] = useState<'all' | 'database' | 'files'>('all')

  const { data: backups = [], isLoading } = useQuery({
    queryKey: ['backups', backupType],
    queryFn: () => getBackups(backupType),
  })

  const createMutation = useMutation({
    mutationFn: createBackup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backups'] })
      showAlert(t('dashboard.settings.backups.created'), 'success')
    },
    onError: (error: Error) => {
      showAlert(error.message, 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: ({ type, filename }: { type: string; filename: string }) =>
      deleteBackup(type, filename),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backups'] })
      showAlert(t('dashboard.settings.backups.deleted'), 'success')
    },
    onError: (error: Error) => {
      showAlert(error.message, 'error')
    },
  })

  const handleCreateBackup = (type: 'database' | 'files' | 'both') => {
    createMutation.mutate(type)
  }

  const handleDownload = (backup: Backup) => {
    const token = localStorage.getItem('__auth__')
    const baseUrl = window.location.origin
    const url = `${baseUrl}/api/backups/${backup.type}/${encodeURIComponent(backup.filename)}`

    // Create a temporary link to download with auth token
    const link = document.createElement('a')
    link.href = url
    link.download = backup.filename

    // Add token to headers via fetch
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob)
        link.href = downloadUrl
        link.click()
        window.URL.revokeObjectURL(downloadUrl)
      })
      .catch(error => {
        showAlert(t('dashboard.settings.backups.download_failed'), 'error')
        console.error('Download error:', error)
      })
  }

  const handleDelete = (backup: Backup) => {
    if (confirm(t('dashboard.settings.backups.delete_confirm'))) {
      deleteMutation.mutate({ type: backup.type, filename: backup.filename })
    }
  }

  return (
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.backups')}
        description={t('dashboard.settings.backups_desc')}
      >
        <p>{t('dashboard.settings.backups_long_desc')}</p>
      </InfoCard>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setBackupType('all')}
              className={`rounded px-4 py-2 ${
                backupType === 'all' ? 'bg-gray-200 font-medium' : 'bg-gray-100'
              }`}
            >
              {t('dashboard.settings.backups.all')}
            </button>
            <button
              onClick={() => setBackupType('database')}
              className={`rounded px-4 py-2 ${
                backupType === 'database' ? 'bg-gray-200 font-medium' : 'bg-gray-100'
              }`}
            >
              {t('dashboard.settings.backups.database')}
            </button>
            <button
              onClick={() => setBackupType('files')}
              className={`rounded px-4 py-2 ${
                backupType === 'files' ? 'bg-gray-200 font-medium' : 'bg-gray-100'
              }`}
            >
              {t('dashboard.settings.backups.files')}
            </button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleCreateBackup('database')}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_database')}
            </Button>
            <Button onClick={() => handleCreateBackup('files')} disabled={createMutation.isPending}>
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_files')}
            </Button>
            <Button onClick={() => handleCreateBackup('both')} disabled={createMutation.isPending}>
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_both')}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : backups.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            {t('dashboard.settings.backups.not_found')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">{t('dashboard.settings.backups.type')}</th>
                  <th className="px-4 py-3 text-left">
                    {t('dashboard.settings.backups.filename')}
                  </th>
                  <th className="px-4 py-3 text-left">{t('dashboard.settings.backups.size')}</th>
                  <th className="px-4 py-3 text-left">
                    {t('dashboard.settings.backups.created_at')}
                  </th>
                  <th className="px-4 py-3 text-left">{t('dashboard.settings.backups.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {backups.map(backup => (
                  <tr key={`${backup.type}-${backup.filename}`} className="border-b">
                    <td className="px-4 py-3">
                      <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">{backup.filename}</td>
                    <td className="px-4 py-3">{backup.size}</td>
                    <td className="px-4 py-3">{new Date(backup.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDownload(backup)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          {t('dashboard.settings.backups.download')}
                        </Button>
                        <Button
                          onClick={() => handleDelete(backup)}
                          className="bg-red-500 hover:bg-red-600"
                          disabled={deleteMutation.isPending}
                        >
                          {t('dashboard.settings.backups.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default BackupsPage
