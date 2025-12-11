import { useTranslation } from 'react-i18next'
import { CustomField } from '@/contexts/user/libs/types'
import { Badge } from '@/contexts/shared/components/ui/Badge'
import { BaseButton } from '@/contexts/shared/components/Button'

interface CustomFieldListItemProps {
  field: CustomField
  onEdit: (field: CustomField) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const CustomFieldListItem: React.FC<CustomFieldListItemProps> = ({
  field,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-3">
          <h4 className="font-semibold">{field.label}</h4>
          <Badge variant="info">{field.type}</Badge>
          {field.required && (
            <Badge variant="warning">{t('dashboard.settings.custom_fields.required')}</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">{t('dashboard.settings.custom_fields.name')}:</span>{' '}
          {field.name}
        </p>
        {field.options && field.options.length > 0 && (
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">{t('dashboard.settings.custom_fields.options')}:</span>{' '}
            {Array.isArray(field.options) ? field.options.join(', ') : field.options}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {t('dashboard.settings.custom_fields.order')}: {field.order}
        </p>
      </div>
      <div className="flex gap-2">
        <BaseButton
          title={t('buttons.edit')}
          variant="secondary"
          onClick={() => onEdit(field)}
          size="sm"
        />
        <BaseButton
          title={t('buttons.delete')}
          variant="danger"
          onClick={() => onDelete(field.id)}
          loading={isDeleting}
          size="sm"
        />
      </div>
    </div>
  )
}
