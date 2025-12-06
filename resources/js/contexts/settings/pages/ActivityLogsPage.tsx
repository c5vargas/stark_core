import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Badge, BadgeVariant } from '@/contexts/shared/components/ui/Badge'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import { Label } from '@/contexts/shared/components/ui/form/Label'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import TableComponent from '@/contexts/shared/components/table/TableComponent'
import TableFooter from '@/contexts/shared/components/table/TableFooter'
import { InfoCard } from '../components/InfoCard'
import getActivityLogs, { ActivityLog } from '../actions/getActivityLogs'

const ActivityLogsPage = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(15)
  const [action, setAction] = useState('')
  const [userId, setUserId] = useState('')
  const [query, setQuery] = useState('')

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['activity-logs', page, perPage, action, userId, query],
    queryFn: () =>
      getActivityLogs({
        page,
        perPage,
        action: action || undefined,
        user_id: userId ? parseInt(userId) : undefined,
        query: query || undefined,
      }),
  })

  const getActionVariant = (action: string): BadgeVariant => {
    if (action === 'created') return 'success'
    if (action === 'updated') return 'info'
    if (action === 'deleted') return 'error'
    if (action === 'login' || action === 'logout') return 'default'
    return 'default'
  }

  const handlePagination = (delta: number) => {
    setPage(p => Math.max(1, p + delta))
  }

  return (
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.activity_logs')}
        description={t('dashboard.settings.activity_logs_desc')}
      >
        <p>{t('dashboard.settings.activity_logs_long_desc')}</p>
      </InfoCard>

      <Card>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <Label>{t('dashboard.settings.activity_logs.search')}</Label>
            <InputText
              type="text"
              placeholder={t('dashboard.settings.activity_logs.search_placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div>
            <Label>{t('dashboard.settings.activity_logs.action')}</Label>
            <Select value={action} onChange={e => setAction(e.target.value)}>
              <option value="">{t('dashboard.settings.activity_logs.all_actions')}</option>
              <option value="created">
                {t('dashboard.settings.activity_logs.action.created')}
              </option>
              <option value="updated">
                {t('dashboard.settings.activity_logs.action.updated')}
              </option>
              <option value="deleted">
                {t('dashboard.settings.activity_logs.action.deleted')}
              </option>
              <option value="login">{t('dashboard.settings.activity_logs.action.login')}</option>
              <option value="logout">{t('dashboard.settings.activity_logs.action.logout')}</option>
            </Select>
          </div>
          <div>
            <Label>{t('dashboard.settings.activity_logs.user_id')}</Label>
            <InputText
              type="number"
              placeholder={t('dashboard.settings.activity_logs.user_filter')}
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>
          <div>
            <Label>{t('dashboard.settings.activity_logs.per_page')}</Label>
            <Select value={perPage} onChange={e => setPerPage(parseInt(e.target.value))}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select>
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
        ) : logs.length === 0 ? (
          <EmptyState title={t('dashboard.settings.activity_logs.not_found')} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <TableComponent loading={false}>
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.id')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.user')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.action')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.description')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.model')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.ip_address')}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {t('dashboard.settings.activity_logs.date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log: ActivityLog) => (
                    <tr key={log.id} className="border-b">
                      <td className="px-4 py-3">#{log.id}</td>
                      <td className="px-4 py-3">
                        {log.user ? (
                          <div>
                            <div className="font-medium">{log.user.name}</div>
                            <div className="text-xs text-gray-500">{log.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">
                            {t('dashboard.settings.activity_logs.system')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={getActionVariant(log.action)}>{log.action}</Badge>
                      </td>
                      <td className="px-4 py-3">{log.description}</td>
                      <td className="px-4 py-3">
                        {log.model_type ? (
                          <div>
                            <div className="text-sm font-medium">
                              {log.model_type.split('\\').pop()}
                            </div>
                            {log.model_id && (
                              <div className="text-xs text-gray-500">ID: {log.model_id}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{log.ip_address || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableComponent>
            </div>
            <TableFooter
              page={page}
              onPageChange={handlePagination}
              hasNextPage={logs.length >= perPage}
              total={logs.length}
              showing={logs.length}
            />
          </>
        )}
      </Card>
    </div>
  )
}

export default ActivityLogsPage
