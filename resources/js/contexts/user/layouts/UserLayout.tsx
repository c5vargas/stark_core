import Layout from '@/contexts/shared/components/Layout'
import Loading from '@/contexts/shared/components/Loading'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { Alert } from '@/contexts/shared/components/ui/Alert'
import { useUserLayout } from '@/contexts/user/hooks/useUserLayout'
import { UserSidebar } from '@/contexts/user/components/UserSidebar'

const UserLayout = () => {
  const { t } = useTranslation()
  const { user, isLoading, error } = useUserLayout()

  if (isLoading) {
    return (
      <Layout pageTitle={t('dashboard.users.title')}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loading />
        </div>
      </Layout>
    )
  }

  if (error) return <Alert message={t('fetch.error')} variant="error" />

  return (
    <Layout pageTitle={t('dashboard.users.title')}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <aside className="md:col-span-4 lg:col-span-3">
          <UserSidebar userId={user?.id} />
        </aside>

        <section className="min-w-0 md:col-span-8 lg:col-span-9">
          <Outlet context={{ user }} />
        </section>
      </div>
    </Layout>
  )
}

export default UserLayout
