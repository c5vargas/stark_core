import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Button } from '@/contexts/shared/components/Button'
import { InfoCard } from '../components/InfoCard'
import getHealth from '../actions/getHealth'
import Loading from '@/contexts/shared/components/Loading'

const HelpPage = () => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const { data: health, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return 'bg-green-100 text-green-800'
    if (status === 'warning') return 'bg-yellow-100 text-yellow-800'
    if (status === 'unhealthy') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'healthy') return '✓'
    if (status === 'warning') return '⚠'
    if (status === 'unhealthy') return '✗'
    return '-'
  }

  const copyHealthInfo = () => {
    if (!health) return

    const healthInfo = JSON.stringify(health, null, 2)
    navigator.clipboard.writeText(healthInfo).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const openSupportTicket = () => {
    // Replace with your Envato support URL
    const envatoSupportUrl = 'https://support.envato.com/hc/en-us/requests/new'
    window.open(envatoSupportUrl, '_blank')
  }

  return (
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.help')}
        description={t('dashboard.settings.help_desc')}
      >
        <p>{t('dashboard.settings.help_long_desc')}</p>
      </InfoCard>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t('dashboard.settings.help.health_status')}</h3>
          <div className="flex gap-2">
            <Button onClick={copyHealthInfo} className="bg-blue-500 hover:bg-blue-600">
              {copied
                ? t('dashboard.settings.help.copied')
                : t('dashboard.settings.help.copy_health')}
            </Button>
            <Button onClick={openSupportTicket} className="bg-purple-500 hover:bg-purple-600">
              {t('dashboard.settings.help.open_ticket')}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : health ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{t('dashboard.settings.help.overall_status')}</span>
                <span
                  className={`rounded px-3 py-1 text-sm font-medium ${getStatusColor(health.status)}`}
                >
                  {getStatusIcon(health.status)} {health.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {t('dashboard.settings.help.last_checked')}{' '}
                {new Date(health.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(health.checks).map(([key, check]) => (
                <div key={key} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(check.status)}`}
                    >
                      {getStatusIcon(check.status)} {check.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{check.message}</p>
                  {check.usage_percent !== undefined && (
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>
                          {t('dashboard.settings.help.usage')} {check.usage_percent.toFixed(2)}%
                        </span>
                        <span>
                          {check.used} / {check.total}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${
                            check.usage_percent > 90
                              ? 'bg-red-500'
                              : check.usage_percent > 70
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${check.usage_percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium">{t('dashboard.settings.help.app_info')}</h4>
              <div className="space-y-1 font-mono text-sm">
                <div>
                  <span className="text-gray-600">{t('dashboard.settings.help.app_name')}</span>{' '}
                  {import.meta.env.VITE_APP_NAME || 'Stark Core'}
                </div>
                <div>
                  <span className="text-gray-600">{t('dashboard.settings.help.environment')}</span>{' '}
                  {import.meta.env.MODE || 'production'}
                </div>
                <div>
                  <span className="text-gray-600">
                    {t('dashboard.settings.help.health_timestamp')}
                  </span>{' '}
                  {health.timestamp}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-900">
                {t('dashboard.settings.help.need_help')}
              </h4>
              <p className="mb-3 text-sm text-blue-800">
                {t('dashboard.settings.help.need_help_desc')}
              </p>
              <Button onClick={openSupportTicket} className="bg-blue-600 hover:bg-blue-700">
                {t('dashboard.settings.help.open_ticket_envato')}
              </Button>
            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500">
            {t('dashboard.settings.help.unable_to_load')}
          </p>
        )}
      </Card>
    </div>
  )
}

export default HelpPage
