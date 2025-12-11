import { useTranslation } from 'react-i18next'
import { Modal } from './Modal'
import { BaseButton } from '../Button'

type ConfirmDialogVariant = 'danger' | 'warning' | 'info'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  variant?: ConfirmDialogVariant
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  variant = 'danger',
  confirmLabel,
  cancelLabel,
  isLoading = false,
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm()
    }
  }

  return (
    <Modal title={title} onCancel={onCancel} showFooter={false} closeOnOverlayClick={!isLoading}>
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <BaseButton
            variant="secondary"
            title={cancelLabel || t('buttons.cancel')}
            onClick={onCancel}
            disabled={isLoading}
          />
          <BaseButton
            variant={variant}
            title={confirmLabel || t('buttons.confirm')}
            onClick={handleConfirm}
            loading={isLoading}
          />
        </div>
      </div>
    </Modal>
  )
}
