import { useTranslation } from 'react-i18next'
import { User } from '@/contexts/user/libs/types'
import { UserListItem } from '@/contexts/user/components/UserListItem'
import TableHead from '@/contexts/shared/components/table/TableHead'
import TableComponent from '@/contexts/shared/components/table/TableComponent'

interface UsersListProps {
  elements?: User[]
  loading: boolean
}

const UsersList = ({ elements = [], loading }: UsersListProps) => {
  const { t } = useTranslation()

  return (
    <TableComponent loading={loading}>
      <TableHead values={[t('dashboard.user.form.name')]} />

      <tbody>
        {elements.map(item => (
          <UserListItem key={item.id} user={item} />
        ))}
      </tbody>
    </TableComponent>
  )
}

export default UsersList
