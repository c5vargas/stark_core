import { useTranslation } from 'react-i18next'
import { StatCard } from '@/contexts/shared/components/charts/StatCard'
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
      change: '+12.5%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.unique_visitors'),
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: <UserGroupIcon className="size-6" />,
      change: '+8.2%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.avg_session_duration'),
      value: analytics.avgSessionDuration,
      icon: <ClockIcon className="size-6" />,
      change: '+5.1%',
      changeType: 'increase' as const,
    },
    {
      title: t('dashboard.analytics.bounce_rate'),
      value: `${analytics.bounceRate}%`,
      icon: <ChartIcon className="size-6" />,
      change: '-3.4%',
      changeType: 'decrease' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
          changeLabel={t('dashboard.analytics.vs_last_period')}
          loading={overview.loading}
        />
      ))}
    </div>
  )
}
