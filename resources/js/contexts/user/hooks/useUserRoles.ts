import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { User } from '@/contexts/user/libs/types'
import { Role } from '@/contexts/settings/libs/types'
import getRoles from '@/contexts/settings/actions/getRoles'
import syncUserRoles from '@/contexts/user/actions/syncUserRoles'

export const useUserRoles = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const { user } = useOutletContext<{ user: User }>()

  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

  const { mutateAsync: syncRoles, isPending: syncing } = useMutation({
    mutationFn: (roleIds: number[]) => syncUserRoles(user.id, { role_ids: roleIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.id] })
      showAlert(t('messages.controller.user.roles_synced'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const currentRoleIds = useMemo(() => {
    if (!user.roles || !data?.roles) return []
    return data.roles.filter((r: Role) => user.roles?.includes(r.name)).map((r: Role) => r.id)
  }, [user.roles, data?.roles])

  return {
    roles: data?.roles ?? [],
    currentRoleIds,
    isLoading,
    syncing,
    syncRoles,
  }
}
