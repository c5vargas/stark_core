import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Button } from '@/contexts/shared/components/Button'
import { Badge } from '@/contexts/shared/components/ui/Badge'
import { Tabs } from '@/contexts/shared/components/ui/Tabs'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import TableComponent from '@/contexts/shared/components/table/TableComponent'
import { InfoCard } from '../components/InfoCard'
import getBackups, { Backup } from '../actions/getBackups'
import createBackup from '../actions/createBackup'
import deleteBackup from '../actions/deleteBackup'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'

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

    const link = document.createElement('a')
    link.href = url
    link.download = backup.filename

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

  const tabs = [
    { value: 'all', label: t('dashboard.settings.backups.all') },
    { value: 'database', label: t('dashboard.settings.backups.database') },
    { value: 'files', label: t('dashboard.settings.backups.files') },
  ]

  const handleTabChange = (value: string) => {
    setBackupType(value as 'all' | 'database' | 'files')
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
          <Tabs tabs={tabs} activeTab={backupType} onChange={handleTabChange} />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => handleCreateBackup('database')}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_database')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleCreateBackup('files')}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_files')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleCreateBackup('both')}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? t('dashboard.settings.backups.creating')
                : t('dashboard.settings.backups.create_both')}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <TableComponent loading={isLoading}>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
          </TableComponent>
        ) : backups.length === 0 ? (
          <EmptyState title={t('dashboard.settings.backups.not_found')} />
        ) : (
          <div className="overflow-x-auto">
            <TableComponent loading={false}>
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
                      <Badge variant="info">{backup.type}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">{backup.filename}</td>
                    <td className="px-4 py-3">{backup.size}</td>
                    <td className="px-4 py-3">{new Date(backup.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(backup)}>
                          {t('dashboard.settings.backups.download')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(backup)}
                          disabled={deleteMutation.isPending}
                        >
                          {t('dashboard.settings.backups.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableComponent>
          </div>
        )}
      </Card>
    </div>
  )
}

export default BackupsPage
