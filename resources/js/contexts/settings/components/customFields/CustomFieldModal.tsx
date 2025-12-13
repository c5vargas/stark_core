import { useTranslation } from 'react-i18next'
import { Modal } from '@/contexts/shared/components/ui/Modal'
import { CustomFieldForm } from './CustomFieldForm'
import { CustomField } from '@/contexts/user/libs/types'

interface CustomFieldModalProps {
  isOpen: boolean
  field?: CustomField
  onClose: () => void
  onSubmit: (data: Partial<CustomField>) => void | Promise<void>
  isLoading?: boolean
}

export const CustomFieldModal: React.FC<CustomFieldModalProps> = ({
  isOpen,
  field,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  const handleSubmit = async (data: Partial<CustomField>) => {
    await onSubmit(data)
    onClose()
  }

  return (
    <Modal
      title={
        field
          ? t('dashboard.settings.custom_fields.edit_field')
          : t('dashboard.settings.custom_fields.add_field')
      }
      onCancel={onClose}
      showFooter={false}
      closeOnOverlayClick={!isLoading}
    >
      <CustomFieldForm
        initialData={field}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  )
}
