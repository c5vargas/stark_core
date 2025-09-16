import Layout from '@/contexts/shared/components/Layout'
import TableOutsideActions from '@/contexts/shared/components/table/TableOutsideActions'
import List from '@/contexts/user/components/UsersList'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUsersPage } from '@/contexts/user/hooks/useUsersPage'
import TableFooter from '@/contexts/shared/components/table/TableFooter'

const CategoriesPage = () => {
  const { t } = useTranslation()
  const { users, isLoading, error, page, perPage, handleSearch, handlePagination } = useUsersPage()
  const navigate = useNavigate()

  const onCreate = () => navigate(`/dashboard/users/create`)

  if (error) {
    return <div>Error...</div>
  }

  return (
    <Layout pageTitle={t('dashboard.users')}>
      <TableOutsideActions
        onCreate={onCreate}
        addBtnLabel={t('dashboard.users.create')}
        onSearch={handleSearch}
      />

      <div className="-mx-3 flex flex-wrap">
        <div className="w-full max-w-full flex-0">
          <div className="rounded-2xl border-0 bg-white shadow-xl">
            <List elements={users} loading={isLoading} />
          </div>
        </div>
      </div>

      <TableFooter
        page={page}
        onPageChange={handlePagination}
        hasNextPage={users?.length === perPage}
      />
    </Layout>
  )
}

export default CategoriesPage
