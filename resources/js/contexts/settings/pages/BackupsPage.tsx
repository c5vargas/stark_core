import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Button } from '@/contexts/shared/components/Button'
import { Badge } from '@/contexts/shared/components/ui/Badge'
import { DataTable } from '@/contexts/shared/components/table/DataTable'
import { DataTableConfig } from '@/contexts/shared/libs/dataTable/types'
import { InfoCard } from '../components/InfoCard'
import getBackups, { Backup } from '../actions/getBackups'
import createBackup from '../actions/createBackup'
import deleteBackup from '../actions/deleteBackup'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'

const BackupsPage = () => {
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const queryClient = useQueryClient()

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
    const baseUrl = window.location.origin
    const url = `${baseUrl}/api/backups/${backup.type}/${encodeURIComponent(backup.filename)}`

    const link = document.createElement('a')
    link.href = url
    link.download = backup.filename

    fetch(url, {
      credentials: 'include', // Include cookies for authentication
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

  const config: DataTableConfig<Backup> = useMemo(
    () => ({
      endpoint: 'backups',
      queryFn: getBackups,
      perPage: 15,
      defaultSortBy: 'created_at',
      defaultSortOrder: 'desc',
      columns: [
        {
          key: 'type',
          label: t('dashboard.settings.backups.type'),
          filter: {
            type: 'select',
            options: [
              { label: t('dashboard.settings.backups.all'), value: 'all' },
              { label: t('dashboard.settings.backups.database'), value: 'database' },
              { label: t('dashboard.settings.backups.files'), value: 'files' },
            ],
          },
          render: backup => <Badge variant="info">{backup.type}</Badge>,
        },
        {
          key: 'filename',
          label: t('dashboard.settings.backups.filename'),
          render: backup => <span className="font-mono text-sm">{backup.filename}</span>,
        },
        {
          key: 'size',
          label: t('dashboard.settings.backups.size'),
          sortKey: 'size_bytes',
          render: backup => backup.size,
        },
        {
          key: 'created_at',
          label: t('dashboard.settings.backups.created_at'),
          render: backup => (
            <span className="text-sm">{new Date(backup.created_at).toLocaleString()}</span>
          ),
        },
        {
          key: 'actions',
          label: t('dashboard.settings.backups.actions'),
          sortable: false,
          render: backup => (
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
          ),
        },
      ],
    }),
    [t, deleteMutation.isPending]
  )

  return (
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.backups')}
        description={t('dashboard.settings.backups_desc')}
      >
        <p>{t('dashboard.settings.backups_long_desc')}</p>
      </InfoCard>

      <Card>
        <DataTable
          config={config}
          headerActions={
            <>
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
            </>
          }
        />
      </Card>
    </div>
  )
}

export default BackupsPage
