import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseButton } from '@/contexts/shared/components/Button'
import { GridViewIcon, ListBulletIcon } from '@/contexts/shared/components/Icons'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { SegmentedControl } from '@/contexts/shared/components/ui/SegmentedControl'

type ViewMode = 'grid' | 'list'

interface MediaToolbarProps {
  viewMode: ViewMode
  search: string
  bulkSelect: boolean
  selectedCount: number
  onViewModeChange: (mode: ViewMode) => void
  onBulkSelectToggle: () => void
  onSearchChange: (value: string) => void
  onBulkDelete?: () => void
}

export const MediaToolbar: React.FC<MediaToolbarProps> = ({
  viewMode,
  onViewModeChange,
  search,
  onSearchChange,
  bulkSelect,
  onBulkSelectToggle,
  selectedCount,
  onBulkDelete,
}) => {
  const { t } = useTranslation()

  return (
    <div className="mb-4 space-y-3 border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between gap-2">
        <div className="max-w-[200px]">
          <InputText
            className="pl-10"
            type="text"
            placeholder={t('dashboard.media.search_placeholder')}
            value={search ?? ''}
            onChange={e => onSearchChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <SegmentedControl
            variant="toolbar"
            value={viewMode}
            onChange={v => onViewModeChange(v as ViewMode)}
            options={[
              {
                value: 'grid',
                label: <GridViewIcon className="h-4 w-4" />,
                ariaLabel: 'Grid view',
              },
              {
                value: 'list',
                label: <ListBulletIcon className="h-4 w-4" />,
                ariaLabel: 'List view',
              },
            ]}
          />

          <BaseButton
            variant="secondary"
            title={
              bulkSelect ? t('dashboard.media.cancel_selection') : t('dashboard.media.bulk_select')
            }
            onClick={onBulkSelectToggle}
          />
        </div>

        {/* Bulk Actions */}
        {bulkSelect && selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {t('dashboard.media.selected_count', { count: selectedCount })}
            </span>
            {onBulkDelete && (
              <BaseButton
                variant="danger"
                size="sm"
                title={t('dashboard.media.delete_selected')}
                onClick={onBulkDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
