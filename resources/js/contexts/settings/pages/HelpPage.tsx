import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/contexts/shared/components/ui/Card'
import { Button } from '@/contexts/shared/components/Button'
import { Badge, BadgeVariant } from '@/contexts/shared/components/ui/Badge'
import { ProgressBar } from '@/contexts/shared/components/ui/ProgressBar'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import Loading from '@/contexts/shared/components/Loading'
import { InfoCard } from '../components/InfoCard'
import getHealth from '../actions/getHealth'

const HelpPage = () => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const { data: health, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const getStatusVariant = (status: string): BadgeVariant => {
    if (status === 'healthy') return 'success'
    if (status === 'warning') return 'warning'
    if (status === 'unhealthy') return 'error'
    return 'default'
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
          <div className="flex min-h-[300px] items-center justify-center">
            <Loading />
          </div>
        ) : health ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{t('dashboard.settings.help.overall_status')}</span>
                <Badge variant={getStatusVariant(health.status)} className="px-3 py-1 text-sm">
                  {getStatusIcon(health.status)} {health.status.toUpperCase()}
                </Badge>
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
                    <Badge variant={getStatusVariant(check.status)}>
                      {getStatusIcon(check.status)} {check.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{check.message}</p>
                  {check.usage_percent !== undefined && (
                    <ProgressBar
                      value={check.usage_percent}
                      max={100}
                      label={t('dashboard.settings.help.usage')}
                      showValues={true}
                      used={check.used}
                      total={check.total}
                      className="mt-2"
                    />
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
              <Button onClick={openSupportTicket} variant="outline">
                {t('dashboard.settings.help.open_ticket_envato')}
              </Button>
            </div>
          </div>
        ) : (
          <EmptyState title={t('dashboard.settings.help.unable_to_load')} />
        )}
      </Card>
    </div>
  )
}

export default HelpPage
