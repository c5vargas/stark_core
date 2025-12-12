import { useTranslation } from 'react-i18next'
import { CustomField, CustomFieldType } from '@/contexts/user/libs/types'
import { Badge } from '@/contexts/shared/components/ui/Badge'
import { BaseButton } from '@/contexts/shared/components/Button'
import { EditIcon, TrashIcon } from '@/contexts/shared/components/Icons'
import {
  ArrangeByNumbersIcon,
  AtIcon,
  CalendarIcon,
  ParagraphIcon,
  SelectIcon,
  TextIcon,
} from '@/contexts/shared/components/HugeIcons'

interface CustomFieldListItemProps {
  field: CustomField
  onEdit?: (field: CustomField) => void
  onDelete?: (id: number) => void
  isDeleting?: boolean
}

const FieldTypeIcon = ({ type, className }: { type: CustomFieldType; className?: string }) => {
  switch (type) {
    case 'text':
      return <TextIcon className={className} />
    case 'textarea':
      return <ParagraphIcon className={className} />
    case 'select':
      return <SelectIcon className={className} />
    case 'date':
      return <CalendarIcon className={className} />
    case 'number':
      return <ArrangeByNumbersIcon className={className} />
    case 'email':
      return <AtIcon className={className} />
    default:
      return <ParagraphIcon className={className} />
  }
}

export const CustomFieldListItem: React.FC<CustomFieldListItemProps> = ({
  field,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 transition-colors">
            <FieldTypeIcon type={field.type} className="h-5 w-5" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h4 className="mb-0 text-base font-semibold text-gray-900">{field.label}</h4>
                <Badge variant="info" className="text-xs capitalize">
                  {field.type}
                </Badge>
                {field.required && (
                  <Badge variant="warning" className="text-xs">
                    {t('dashboard.settings.custom_fields.required')}
                  </Badge>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-500">
                    {t('dashboard.settings.custom_fields.name')}:
                  </span>
                  <span className="rounded bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-700">
                    {field.name}
                  </span>
                </div>
                {field.options && field.options.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <span className="font-medium whitespace-nowrap text-gray-500">
                      {t('dashboard.settings.custom_fields.options')}:
                    </span>
                    <span className="text-gray-600">
                      {Array.isArray(field.options) ? field.options.join(', ') : field.options}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {(onEdit || onDelete) && (
              <div className="flex shrink-0 items-center gap-2">
                {onEdit && (
                  <BaseButton
                    title={t('buttons.edit')}
                    variant="ghost"
                    onClick={() => onEdit(field)}
                    size="sm"
                    icon={<EditIcon className="h-4 w-4" />}
                    className="opacity-60 transition-opacity duration-200"
                  />
                )}
                {onDelete && (
                  <BaseButton
                    title={t('buttons.delete')}
                    variant="ghost"
                    onClick={() => onDelete(field.id)}
                    loading={isDeleting}
                    size="sm"
                    icon={<TrashIcon className="h-4 w-4" />}
                    className="text-red-600 opacity-60 transition-opacity duration-200"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
