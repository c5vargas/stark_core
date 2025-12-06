import { useState, useMemo } from 'react'
import { Permission, Role } from '@/contexts/settings/libs/types'
import { PermissionItem } from '@/contexts/settings/components/permissions/PermissionItem'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'

interface RoleCardProps {
  role: Role
  permissions: Permission[]
  onToggle: (role: Role, perm: Permission) => void
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, permissions, onToggle }) => {
  const [search, setSearch] = useState('')

  const filteredPermissions = useMemo(() => {
    if (!search.trim()) return permissions
    return permissions.filter(
      p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.descr.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, permissions])

  return (
    <div className="rounded border bg-white shadow-sm">
      <div className="space-y-4 p-4">
        <header className="flex items-center justify-between">
          <h6 className="text-lg font-semibold capitalize">{role.name}</h6>

          <InputText
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar permisos..."
            className="w-auto"
          />
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPermissions.map(perm => (
            <PermissionItem
              key={`role-${role.id}-perm-${perm.id}`}
              roleId={role.id}
              permId={perm.id}
              name={perm.name}
              description={perm.descr}
              enabled={!!role.permissions.find(el => el.id === perm.id)}
              onToggle={() => onToggle(role, perm)}
            />
          ))}
        </div>

        {filteredPermissions.length === 0 && (
          <p className="text-center text-sm text-gray-500 italic">No se encontraron permisos.</p>
        )}
      </div>
    </div>
  )
}
