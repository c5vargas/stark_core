import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Permission, Role } from '@/contexts/settings/libs/types'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import getRoles from '@/contexts/settings/actions/getRoles'
import updateRoles, { IUpdateRoles } from '@/contexts/settings/actions/updateRoles'

export const usePermissions = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()

  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: (payload: IUpdateRoles) => updateRoles(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      showAlert(t('controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const handleToggle = (role: Role, perm: Permission) => {
    const updatedRoles = [...roles]
    const selectedRole = updatedRoles.find(r => r.id === role.id)

    if (!selectedRole) return

    const hasPerm = selectedRole.permissions.find(el => el.id === perm.id)

    if (hasPerm) {
      selectedRole.permissions = selectedRole.permissions.filter(el => el.id !== perm.id)
    } else {
      selectedRole.permissions.push(perm)
    }

    setRoles(updatedRoles)

    update({
      id: role.id,
      name: role.name,
      perms: selectedRole.permissions.map(el => el.id),
    })
  }

  useEffect(() => {
    if (!data) return

    setRoles(data.roles)
    setPermissions(data.permissions)
  }, [data])

  return {
    permissions,
    roles,
    loading: isLoading,
    handleToggle,
  }
}
