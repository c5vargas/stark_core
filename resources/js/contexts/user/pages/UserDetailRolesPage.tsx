import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { BaseButton } from '@/contexts/shared/components/Button'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { useUserRoles } from '@/contexts/user/hooks/useUserRoles'
import { useUserPermissions } from '@/contexts/user/hooks/useUserPermissions'
import { Role, Permission } from '@/contexts/settings/libs/types'
import { Switch } from '@/contexts/shared/components/ui/form/Switch'
import { useAuthStore } from '@/contexts/auth/stores/authStore'

const UserDetailRolesPage = () => {
  const { t } = useTranslation()
  const hasPermission = useAuthStore(state => state.hasPermission)
  const canViewRoles = hasPermission('view.settings') || hasPermission('edit.settings')
  const canEditRoles = hasPermission('edit.settings') || hasPermission('edit.users')

  const {
    roles,
    currentRoleIds,
    isLoading: rolesLoading,
    syncing: rolesSyncing,
    syncRoles,
  } = useUserRoles()
  const {
    permissions,
    currentPermissionIds,
    isLoading: permsLoading,
    syncing: permsSyncing,
    syncPermissions,
  } = useUserPermissions()

  const [selectedRoleId, setSelectedRoleId] = useState<number | ''>('')
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([])
  const prevRoleIdRef = useRef<number | ''>('')
  const prevPermIdsRef = useRef<string>('')

  useEffect(() => {
    // Get the first role ID (since we only allow one role now)
    const firstRoleId = currentRoleIds.length > 0 ? currentRoleIds[0] : ''
    if (prevRoleIdRef.current !== firstRoleId) {
      setSelectedRoleId(firstRoleId)
      prevRoleIdRef.current = firstRoleId
    }
  }, [currentRoleIds])

  useEffect(() => {
    const currentPermIdsStr = currentPermissionIds.sort().join(',')
    if (prevPermIdsRef.current !== currentPermIdsStr) {
      setSelectedPermissionIds([...currentPermissionIds])
      prevPermIdsRef.current = currentPermIdsStr
    }
  }, [currentPermissionIds])

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = e.target.value === '' ? '' : Number(e.target.value)
    setSelectedRoleId(roleId)
  }

  const togglePermission = (permissionId: number) => {
    setSelectedPermissionIds(prev =>
      prev.includes(permissionId) ? prev.filter(id => id !== permissionId) : [...prev, permissionId]
    )
  }

  const handleRolesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send as array with single role ID (backend expects array)
    const roleIds = selectedRoleId !== '' ? [selectedRoleId] : []
    syncRoles(roleIds)
  }

  const handlePermissionsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    syncPermissions(selectedPermissionIds)
  }

  const groupedPermissions = permissions.reduce(
    (acc, perm: Permission) => {
      const category = perm.name.split('.')[0] || 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(perm)
      return acc
    },
    {} as Record<string, Permission[]>
  )

  if (!canViewRoles) {
    return (
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full">
          <Card>
            <div className="py-8 text-center text-gray-500">
              {t('dashboard.users.no_permission_to_view_roles')}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full space-y-4">
        <InfoCard
          title={t('dashboard.users.roles')}
          description={t('dashboard.users.roles_desc')}
        />

        <Card>
          <form onSubmit={handleRolesSubmit} className="space-y-4">
            <FormField label={t('dashboard.settings.roles')}>
              {rolesLoading ? (
                <div className="py-4 text-center text-gray-500">Loading...</div>
              ) : (
                <Select
                  value={selectedRoleId}
                  onChange={handleRoleChange}
                  disabled={!canEditRoles || roles.length === 0}
                >
                  <option value="">{t('dashboard.users.select_role')}</option>
                  {roles.map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>

            {canEditRoles && (
              <BaseButton
                title={t('dashboard.users.update')}
                variant="primary"
                loading={rolesSyncing || rolesLoading}
                type="submit"
              />
            )}
          </form>
        </Card>

        <Card>
          <form onSubmit={handlePermissionsSubmit} className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{t('dashboard.users.permissions')}</h3>
            </div>

            {Object.entries(groupedPermissions).map(([category, perms]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-gray-700 uppercase">{category}</h3>
                <div className="space-y-3">
                  {perms.map((perm: Permission) => (
                    <div key={perm.id} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">{perm.name}</label>
                        {perm.descr && <p className="text-xs text-gray-500">{perm.descr}</p>}
                      </div>
                      {canEditRoles ? (
                        <Switch
                          checked={selectedPermissionIds.includes(perm.id)}
                          onChange={() => togglePermission(perm.id)}
                        />
                      ) : (
                        <div className="text-sm text-gray-400">
                          {selectedPermissionIds.includes(perm.id) ? '✓' : ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {canEditRoles && (
              <BaseButton
                title={t('dashboard.users.update')}
                variant="primary"
                loading={permsSyncing || permsLoading}
                type="submit"
              />
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailRolesPage
