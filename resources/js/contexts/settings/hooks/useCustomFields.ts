import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { CustomField } from '@/contexts/user/libs/types'
import getCustomFields from '@/contexts/settings/actions/getCustomFields'
import createCustomField from '@/contexts/settings/actions/createCustomField'
import updateCustomField from '@/contexts/settings/actions/updateCustomField'
import deleteCustomField from '@/contexts/settings/actions/deleteCustomField'

export const useCustomFields = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { showAlert } = useAlert()

  const { data, isLoading } = useQuery({
    queryKey: ['custom-fields'],
    queryFn: getCustomFields,
  })

  const { mutateAsync: create, isPending: creating } = useMutation({
    mutationFn: (payload: Partial<CustomField>) => createCustomField(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-fields'] })
      showAlert(t('messages.controller.custom_field.created'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const { mutateAsync: update, isPending: updating } = useMutation({
    mutationFn: ({ id, ...payload }: Partial<CustomField> & { id: number }) =>
      updateCustomField(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-fields'] })
      showAlert(t('messages.controller.updated'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const { mutateAsync: remove, isPending: deleting } = useMutation({
    mutationFn: (id: number) => deleteCustomField(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-fields'] })
      showAlert(t('messages.controller.custom_field.deleted'), 'success')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  return {
    fields: data ?? [],
    isLoading,
    creating,
    updating,
    deleting,
    create,
    update,
    remove,
  }
}
