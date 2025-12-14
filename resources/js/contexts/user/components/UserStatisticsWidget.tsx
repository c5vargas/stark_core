import { useTranslation } from 'react-i18next'
import { useUserStatistics } from '@/contexts/user/hooks/useUserStatistics'
import { ChartIcon } from '@/contexts/shared/components/HugeIcons'
import { StatCard } from '@/contexts/shared/components/charts/StatCard'

const UserStatisticsWidget = () => {
  const { t } = useTranslation()
  const { statistics, isLoading } = useUserStatistics()

  const stats = [
    {
      title: t('dashboard.users.total'),
      value: statistics?.total || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      title: t('dashboard.users.status.active'),
      value: statistics?.active || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      title: t('dashboard.users.status.inactive'),
      value: statistics?.inactive || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      title: t('dashboard.users.status.pending'),
      value: statistics?.pending || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      title: t('dashboard.users.status.blocked'),
      value: statistics?.blocked || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
    {
      title: t('dashboard.users.new_this_month'),
      value: statistics?.new_this_month || 0,
      icon: <ChartIcon className="h-5 w-5 text-gray-600" />,
    },
  ]

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <ChartIcon className="h-5 w-5 text-gray-600" />
        <h3 className="m-0 text-lg font-semibold text-gray-900">
          {t('dashboard.users.statistics')}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            loading={isLoading}
          />
        ))}
      </div>
    </>
  )
}

export default UserStatisticsWidget
