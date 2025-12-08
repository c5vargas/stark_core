import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { User } from '@/contexts/user/libs/types'
import { Permission } from '@/contexts/settings/libs/types'
import getRoles from '@/contexts/settings/actions/getRoles'
import syncUserPermissions from '@/contexts/user/actions/syncUserPermissions'

export const useUserPermissions = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const { user } = useOutletContext<{ user: User }>()

  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const { mutateAsync: syncPermissions, isPending: syncing } = useMutation({
    mutationFn: (permissionIds: number[]) =>
      syncUserPermissions(user.id, { permission_ids: permissionIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.id] })
      showAlert(t('messages.controller.user.permissions_synced'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const currentPermissionIds = useMemo(() => {
    if (!user.permissions || !data?.permissions) return []
    return data.permissions
      .filter((p: Permission) => user.permissions?.includes(p.name))
      .map((p: Permission) => p.id)
  }, [user.permissions, data?.permissions])

  return {
    permissions: data?.permissions ?? [],
    currentPermissionIds,
    isLoading,
    syncing,
    syncPermissions,
  }
}
