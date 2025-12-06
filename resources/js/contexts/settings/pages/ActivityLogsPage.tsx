import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { InfoCard } from '../components/InfoCard'
import getActivityLogs, { ActivityLog } from '../actions/getActivityLogs'
import Loading from '@/contexts/shared/components/Loading'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Select } from '@/contexts/shared/components/ui/form/Select'

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

  const getStatusColor = (action: string) => {
    if (action === 'created') return 'bg-green-100 text-green-800'
    if (action === 'updated') return 'bg-blue-100 text-blue-800'
    if (action === 'deleted') return 'bg-red-100 text-red-800'
    if (action === 'login') return 'bg-purple-100 text-purple-800'
    if (action === 'logout') return 'bg-gray-100 text-gray-800'
    return 'bg-gray-100 text-gray-800'
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
            <label className="mb-1 block text-sm font-medium">
              {t('dashboard.settings.activity_logs.search')}
            </label>
            <InputText
              type="text"
              placeholder={t('dashboard.settings.activity_logs.search_placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              {t('dashboard.settings.activity_logs.action')}
            </label>
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
            <label className="mb-1 block text-sm font-medium">
              {t('dashboard.settings.activity_logs.user_id')}
            </label>
            <InputText
              type="number"
              placeholder={t('dashboard.settings.activity_logs.user_filter')}
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              {t('dashboard.settings.activity_logs.per_page')}
            </label>
            <Select value={perPage} onChange={e => setPerPage(parseInt(e.target.value))}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : logs.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            {t('dashboard.settings.activity_logs.not_found')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
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
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(log.action)}`}
                      >
                        {log.action}
                      </span>
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
            </table>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {t('dashboard.settings.activity_logs.showing', {
              count: logs.length,
              total: logs.length,
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
            >
              {t('dashboard.settings.activity_logs.previous')}
            </button>
            <span className="flex items-center px-4">
              {t('dashboard.settings.activity_logs.page')} {page}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={logs.length < perPage}
              className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
            >
              {t('dashboard.settings.activity_logs.next')}
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ActivityLogsPage
