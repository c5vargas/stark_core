import Layout from '@/contexts/shared/components/Layout'
import DashboardLayout from '@/contexts/dashboard/pages/DashboardLayout'
import { AnalyticsWidget } from '@/contexts/dashboard/components/AnalyticsWidget'
import { AnalyticsChart } from '@/contexts/dashboard/components/AnalyticsChart'
import { TopPages } from '@/contexts/dashboard/components/TopPages'
import { useAnalytics } from '@/contexts/dashboard/hooks/useAnalytics'
import { Alert } from '@/contexts/shared/components/ui/Alert'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { t } = useTranslation()
  const { isEnabled } = useAnalytics()

  return (
    <Layout pageTitle="Dashboard">
      <DashboardLayout>
        <div className="space-y-4">
          {/* Analytics disabled notice */}
          {!isEnabled && (
            <Alert variant="info">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t('dashboard.analytics.not_configured.title')}</h3>
                  <p className="mt-1 text-sm">{t('dashboard.analytics.not_configured.message')}</p>
                </div>
                <Link
                  to="/dashboard/settings/analytics"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  {t('dashboard.analytics.configure')}
                </Link>
              </div>
            </Alert>
          )}

          {/* Analytics enabled - show metrics */}
          {isEnabled && (
            <>
              {/* Main metrics widgets */}
              <AnalyticsWidget />

              {/* Traffic chart */}
              <AnalyticsChart />

              {/* Top pages */}
              <TopPages />
            </>
          )}

          {/* Welcome message for when analytics is disabled */}
          {!isEnabled && (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('dashboard.analytics.welcome.title')}
              </h2>
              <p className="mt-2 text-gray-600">{t('dashboard.analytics.welcome.message')}</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </Layout>
  )
}

export default DashboardPage
