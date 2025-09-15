import Layout from '@/contexts/shared/components/Layout'
import Loading from '@/contexts/shared/components/Loading'
import { useTranslation } from 'react-i18next'
import { useUserPage } from '@/contexts/user/hooks/useUserPage'

const UserPage = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useUserPage()

  if (isLoading) {
    return <Loading />
  }

  return (
    user && (
      <Layout pageTitle={t('dashboard.users.title')}>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full max-w-full shrink-0 px-3 lg:w-6/12 lg:flex-0">
            <h4>
              {user.id
                ? t('dashboard.users.h4', { user: user?.name })
                : t('dashboard.users.h4.new')}
            </h4>
            <p>{t('dashboard.users.p', { user: user?.name })}</p>
          </div>
        </div>

        <div className="-mx-3 mt-6 flex flex-wrap"></div>
      </Layout>
    )
  )
}

export default UserPage
