import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { useAnalytics } from '@/contexts/dashboard/hooks/useAnalytics'
import Loading from '@/contexts/shared/components/Loading'

export const AnalyticsChart: React.FC = () => {
  const { t } = useTranslation()
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const { useTraffic } = useAnalytics()
  const { data: trafficResponse, isLoading } = useTraffic(timeRange)

  const currentData = trafficResponse?.data || []
  const maxValue =
    currentData.length > 0 ? Math.max(...currentData.map(d => Math.max(d.views, d.visitors))) : 1

  if (isLoading) {
    return (
      <Card>
        <div className="flex min-h-[400px] items-center justify-center">
          <Loading />
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('dashboard.analytics.traffic_overview')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('7d')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              timeRange === '7d'
                ? 'bg-blue-600 !text-violet-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.analytics.period.7d')}
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              timeRange === '30d'
                ? 'bg-blue-600 !text-violet-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.analytics.period.30d')}
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              timeRange === '90d'
                ? 'bg-blue-600 !text-violet-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.analytics.period.90d')}
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          <span className="text-sm text-gray-600">{t('dashboard.analytics.page_views')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-600"></div>
          <span className="text-sm text-gray-600">{t('dashboard.analytics.visitors')}</span>
        </div>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {currentData.slice(0, timeRange === '7d' ? 7 : 30).map((item, index) => {
            const viewHeight = (item.views / maxValue) * 100
            const visitorHeight = (item.visitors / maxValue) * 100

            return (
              <div key={index} className="group relative flex flex-1 items-end gap-0.5">
                <div
                  className="w-full rounded-t-sm bg-blue-600 transition-all group-hover:bg-blue-700"
                  style={{ height: `${viewHeight}%` }}
                  title={`Views: ${item.views}`}
                ></div>
                <div
                  className="w-full rounded-t-sm bg-green-600 transition-all group-hover:bg-green-700"
                  style={{ height: `${visitorHeight}%` }}
                  title={`Visitors: ${item.visitors}`}
                ></div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                  <div>{item.day}</div>
                  <div>
                    {t('dashboard.analytics.page_views')}: {item.views}
                  </div>
                  <div>
                    {t('dashboard.analytics.visitors')}: {item.visitors}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-xs text-gray-500">
        {timeRange === '7d' && (
          <>
            {currentData.map((item, i) => (
              <span key={i}>{item.day}</span>
            ))}
          </>
        )}
        {timeRange !== '7d' && (
          <>
            <span>{t('dashboard.analytics.chart.start')}</span>
            <span>{t('dashboard.analytics.chart.middle')}</span>
            <span>{t('dashboard.analytics.chart.end')}</span>
          </>
        )}
      </div>
    </Card>
  )
}
