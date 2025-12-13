import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { DataTable } from '@/contexts/shared/components/table/DataTable'
import { DataTableConfig } from '@/contexts/shared/libs/dataTable/types'
import { Badge, BadgeVariant } from '@/contexts/shared/components/ui/Badge'
import { useOutletContext } from 'react-router-dom'
import { User } from '@/contexts/user/libs/types'
import getUserActivityLogs from '@/contexts/user/actions/getUserActivityLogs'
import { ActivityLog } from '@/contexts/settings/actions/getActivityLogs'

const UserDetailActivityPage = () => {
  const { t } = useTranslation()
  const { user } = useOutletContext<{ user: User }>()

  const getActionVariant = (action: string): BadgeVariant => {
    if (action === 'created') return 'success'
    if (action === 'updated') return 'info'
    if (action === 'deleted') return 'error'
    if (action === 'login' || action === 'logout') return 'default'
    return 'default'
  }

  const config: DataTableConfig<ActivityLog> = useMemo(
    () => ({
      endpoint: `users/${user.id}/activity-logs`,
      queryFn: params => getUserActivityLogs(user.id, params),
      perPage: 15,
      defaultSortBy: 'created_at',
      defaultSortOrder: 'desc',
      columns: [
        {
          key: 'id',
          label: t('dashboard.settings.activity_logs.id'),
          render: log => `#${log.id}`,
        },
        {
          key: 'action',
          label: t('dashboard.settings.activity_logs.action'),
          filter: {
            type: 'select',
            options: [
              { label: t('dashboard.settings.activity_logs.action.created'), value: 'created' },
              { label: t('dashboard.settings.activity_logs.action.updated'), value: 'updated' },
              { label: t('dashboard.settings.activity_logs.action.deleted'), value: 'deleted' },
              { label: t('dashboard.settings.activity_logs.action.login'), value: 'login' },
              { label: t('dashboard.settings.activity_logs.action.logout'), value: 'logout' },
            ],
          },
          render: log => <Badge variant={getActionVariant(log.action)}>{log.action}</Badge>,
        },
        {
          key: 'description',
          sortable: false,
          label: t('dashboard.settings.activity_logs.description'),
          render: log => log.description,
        },
        {
          key: 'model_type',
          label: t('dashboard.settings.activity_logs.model'),
          render: log =>
            log.model_type ? (
              <div>
                <div className="text-sm font-medium">{log.model_type.split('\\').pop()}</div>
                {log.model_id && <div className="text-xs text-gray-500">ID: {log.model_id}</div>}
              </div>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          key: 'ip_address',
          label: t('dashboard.settings.activity_logs.ip_address'),
          render: log => <span className="font-mono text-xs">{log.ip_address || '-'}</span>,
        },
        {
          key: 'created_at',
          label: t('dashboard.settings.activity_logs.date'),
          render: log => (
            <span className="text-sm">{new Date(log.created_at).toLocaleString()}</span>
          ),
        },
      ],
    }),
    [t, user.id]
  )

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full space-y-4">
        <InfoCard
          title={t('dashboard.users.activity')}
          description={t('dashboard.users.activity_desc')}
        />

        <Card>
          <DataTable config={config} />
        </Card>
      </div>
    </div>
  )
}

export default UserDetailActivityPage
