import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { useUserStatistics } from '@/contexts/user/hooks/useUserStatistics'
import { ChartIcon } from '@/contexts/shared/components/HugeIcons'
import { StatCard } from '@/contexts/shared/components/charts/StatCard'

const UserStatisticsWidget = () => {
  const { t } = useTranslation()
  const { statistics, isLoading } = useUserStatistics()

  if (isLoading || !statistics) {
    return (
      <Card>
        <div className="py-8 text-center text-gray-500">Loading...</div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <ChartIcon className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.users.statistics')}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard
          title={t('dashboard.users.total')}
          value={statistics.total}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
        <StatCard
          title={t('dashboard.users.status.active')}
          value={statistics.active}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
        <StatCard
          title={t('dashboard.users.status.inactive')}
          value={statistics.inactive}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
        <StatCard
          title={t('dashboard.users.status.pending')}
          value={statistics.pending}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
        <StatCard
          title={t('dashboard.users.status.blocked')}
          value={statistics.blocked}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
        <StatCard
          title={t('dashboard.users.new_this_month')}
          value={statistics.new_this_month}
          icon={<ChartIcon className="h-5 w-5 text-gray-600" />}
        />
      </div>
    </Card>
  )
}

export default UserStatisticsWidget
