import { useOutletContext } from 'react-router-dom'
import { User } from '@/contexts/user/libs/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import updateUserById from '@/contexts/user/actions/updateUserById'

export const useUserPage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const { user } = useOutletContext<{ user: User }>()

  const { mutateAsync: update, isPending: updating } = useMutation({
    mutationFn: (payload: Partial<User>) => updateUserById(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.id] })
      showAlert(t('controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  return {
    user,
    updating,
    update,
  }
}
