import Layout from '@/contexts/shared/components/Layout'
import { useTranslation } from 'react-i18next'
import { useSettingsLayout } from '@/contexts/settings/hooks/useSettingsLayout'
import { Outlet } from 'react-router-dom'
import Loading from '@/contexts/shared/components/Loading'
import SettingsSidebar from '@/contexts/settings/components/SettingsSidebar'
import { Alert } from '@/contexts/shared/components/ui/Alert'

const SettingsLayout = () => {
  const { t } = useTranslation()
  const { settings, loading, error } = useSettingsLayout()

  if (loading) {
    return (
      <Layout pageTitle={t('dashboard.settings.general')}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loading />
        </div>
      </Layout>
    )
  }

  if (error) return <Alert message={t('fetch.error')} variant="error" />

  return (
    <Layout pageTitle={t('dashboard.settings.general')}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <aside className="md:col-span-4 lg:col-span-3">
          <SettingsSidebar />
        </aside>

        <section className="min-w-0 md:col-span-8 lg:col-span-9">
          <Outlet context={{ settings }} />
        </section>
      </div>
    </Layout>
  )
}

export default SettingsLayout
