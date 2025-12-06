import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import {
  ChartIcon,
  UserGroupIcon,
  EyeIcon,
  ClockIcon,
} from '@/contexts/shared/components/HugeIcons'
import { useAnalytics } from '@/contexts/dashboard/hooks/useAnalytics'

export const AnalyticsWidget: React.FC = () => {
  const { t } = useTranslation()
  const { overview } = useAnalytics()

  const analytics = overview.data || {
    pageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: '0:00',
    bounceRate: 0,
  }

  const stats = [
    {
      title: t('dashboard.analytics.page_views'),
      value: analytics.pageViews.toLocaleString(),
      icon: <EyeIcon className="size-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12.5%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.unique_visitors'),
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: <UserGroupIcon className="size-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8.2%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.avg_session_duration'),
      value: analytics.avgSessionDuration,
      icon: <ClockIcon className="size-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5.1%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.bounce_rate'),
      value: `${analytics.bounceRate}%`,
      icon: <ChartIcon className="size-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3.4%',
      changeType: 'decrease' as const,
    },
  ]

  if (overview.loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-8 w-32 rounded bg-gray-200"></div>
                <div className="h-3 w-16 rounded bg-gray-200"></div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-0 !text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="mb-0 !text-3xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`mt-1 mb-0 flex items-center text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span>{stat.change}</span>
                <span className="ml-1 text-gray-500">
                  {t('dashboard.analytics.vs_last_period')}
                </span>
              </p>
            </div>
            <div className="rounded-lg bg-pink-50 p-3">
              <div className="text-pink-700">{stat.icon}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
