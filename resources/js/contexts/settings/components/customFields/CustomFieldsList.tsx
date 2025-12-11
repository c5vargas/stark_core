import { useTranslation } from 'react-i18next'
import { CustomField } from '@/contexts/user/libs/types'
import { EmptyState } from '@/contexts/shared/components/ui/EmptyState'
import { CustomFieldListItem } from './CustomFieldListItem'

interface CustomFieldsListProps {
  fields: CustomField[]
  onEdit: (field: CustomField) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
  onCreateNew?: () => void
}

export const CustomFieldsList: React.FC<CustomFieldsListProps> = ({
  fields,
  onEdit,
  onDelete,
  isDeleting = false,
  onCreateNew,
}) => {
  const { t } = useTranslation()

  if (fields.length === 0) {
    return (
      <EmptyState
        title={t('dashboard.settings.custom_fields.no_fields')}
        description={t('dashboard.settings.custom_fields.no_fields_desc')}
        action={
          onCreateNew
            ? {
                label: t('dashboard.settings.custom_fields.add_field'),
                onClick: onCreateNew,
              }
            : undefined
        }
      />
    )
  }

  return (
    <div className="space-y-2">
      {fields.map(field => (
        <CustomFieldListItem
          key={field.id}
          field={field}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  )
}
