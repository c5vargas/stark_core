import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '@/contexts/shared/components/Layout'
import { DataTable } from '@/contexts/shared/components/table/DataTable'
import { DataTableConfig } from '@/contexts/shared/libs/dataTable/types'
import { Badge } from '@/contexts/shared/components/ui/Badge'
import { Button } from '@/contexts/shared/components/Button'
import { Card } from '@/contexts/shared/components/ui/Card'
import getUsers from '@/contexts/user/actions/getUsers'
import { User } from '@/contexts/user/libs/types'
import { formatDate } from '@/contexts/shared/utils/date'
import { isUserOnline } from '@/contexts/user/libs/utils/isUserOnline'

const UsersListPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onCreate = () => navigate('/dashboard/users/create')

  const getStatusVariant = (status: string): 'success' | 'info' | 'error' | 'default' => {
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'default'
    if (status === 'pending') return 'info'
    if (status === 'blocked') return 'error'
    return 'default'
  }

  const config: DataTableConfig<User> = useMemo(
    () => ({
      endpoint: 'users',
      queryFn: getUsers,
      perPage: 15,
      defaultSortBy: 'created_at',
      defaultSortOrder: 'desc',
      columns: [
        {
          key: 'name',
          label: t('dashboard.users.form.name'),
          render: user => {
            const online = isUserOnline(user.last_login_at)
            return (
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-800 capitalize">{user.name}</span>
                {online && (
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-green-500"
                    title="Online"
                  />
                )}
              </div>
            )
          },
        },
        {
          key: 'email',
          label: t('dashboard.users.form.email'),
          render: user => <span className="text-sm text-gray-600">{user.email}</span>,
        },
        {
          key: 'status',
          label: t('dashboard.users.form.status'),
          filter: {
            type: 'select',
            options: [
              { label: t('dashboard.users.status.active'), value: 'active' },
              { label: t('dashboard.users.status.inactive'), value: 'inactive' },
              { label: t('dashboard.users.status.pending'), value: 'pending' },
              { label: t('dashboard.users.status.blocked'), value: 'blocked' },
            ],
          },
          render: user => (
            <Badge variant={getStatusVariant(user.status)}>
              {t(`dashboard.users.status.${user.status}`)}
            </Badge>
          ),
        },
        {
          key: 'created_at',
          label: t('dashboard.users.form.created_at'),
          render: user => (
            <span className="text-sm text-gray-500">
              {user.created_at ? formatDate(user.created_at, 'medium') : '-'}
            </span>
          ),
        },
      ],
    }),
    [t]
  )

  const handleRowClick = (user: User) => {
    navigate(`/dashboard/users/${user.id}`)
  }

  return (
    <Layout pageTitle={t('dashboard.users')}>
      <Card>
        <DataTable
          config={config}
          headerActions={
            <Button title={t('dashboard.users.create')} variant="primary" onClick={onCreate}>
              {t('dashboard.users.create')}
            </Button>
          }
          onRowClick={handleRowClick}
        />
      </Card>
    </Layout>
  )
}

export default UsersListPage
