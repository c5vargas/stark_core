import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import uploadMedia from '../actions/uploadMedia'

export const useUploadMedia = () => {
  const { showAlert } = useAlert()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutateAsync: upload, isPending: uploading } = useMutation({
    mutationFn: uploadMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
      showAlert(t('controller.file_uploaded'), 'success')
    },
    onError: (err: Error) => {
      showAlert(err.message, 'error')
    },
  })

  return { upload, uploading }
}
