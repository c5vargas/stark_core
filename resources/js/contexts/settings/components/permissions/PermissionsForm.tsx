import { RoleCard } from './RoleCard'
import { usePermissions } from '@/contexts/settings/hooks/usePermissions'
import Loading from '@/contexts/shared/components/Loading'

export const PermissionsForm: React.FC = () => {
  const { roles, permissions, loading, handleToggle } = usePermissions()

  if (!roles || !permissions || loading) {
    return <Loading />
  }

  return roles.map(role => (
    <RoleCard
      key={`role-${role.id}`}
      role={role}
      permissions={permissions}
      onToggle={handleToggle}
    />
  ))
}
