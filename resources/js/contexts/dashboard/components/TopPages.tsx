import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { EyeIcon } from '@/contexts/shared/components/HugeIcons'
import { useAnalytics } from '@/contexts/dashboard/hooks/useAnalytics'
import Loading from '@/contexts/shared/components/Loading'

export const TopPages: React.FC = () => {
  const { t } = useTranslation()
  const { topPages } = useAnalytics()

  if (topPages.loading) {
    return (
      <Card>
        <div className="flex min-h-[300px] items-center justify-center">
          <Loading />
        </div>
      </Card>
    )
  }

  const pages = topPages.data || []

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {t('dashboard.analytics.top_pages')}
      </h3>

      <div className="space-y-3">
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <EyeIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="m-0 font-medium text-gray-900">{page.path}</p>
                <p className="m-0 text-sm leading-normal text-gray-500">
                  {t('dashboard.analytics.avg_time')}: {page.avgTime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="mb-0 text-xl font-semibold text-gray-900">
                {page.views.toLocaleString()}
              </p>
              <p className="mb-0 text-sm text-gray-500">
                {page.uniqueViews.toLocaleString()} {t('dashboard.analytics.unique')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
