import { useMutation } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import uploadFile from '../actions/uploadFile'

export const useUploadMedia = () => {
  const { showAlert } = useAlert()
  const { t } = useTranslation()

  const { mutateAsync: upload, isPending: uploading } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      showAlert(t('controller.file_uploaded'), 'success')
    },
    onError: (err: Error) => {
      showAlert(err.message, 'error')
    },
  })

  return { upload, uploading }
}
