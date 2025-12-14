import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import deleteMedia from '../actions/deleteMedia'

export const useDeleteMedia = () => {
  const { showAlert } = useAlert()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteMediaItem, isPending: deleting } = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
      showAlert(t('controller.media.deleted'), 'success')
    },
    onError: (err: Error) => {
      showAlert(err.message, 'error')
    },
  })

  return { deleteMedia: deleteMediaItem, deleting }
}
