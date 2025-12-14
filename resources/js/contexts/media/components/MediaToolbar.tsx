import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseButton } from '@/contexts/shared/components/Button'
import { GridViewIcon, ListBulletIcon } from '@/contexts/shared/components/Icons'
import { clsx } from 'clsx'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'

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
          <div className="flex h-[38px] gap-1 rounded-lg border border-gray-200 bg-white p-1">
            <BaseButton
              variant="ghost"
              icon={<GridViewIcon className="h-4 w-4" />}
              title=""
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={clsx(
                'rounded px-3 py-1.5 text-sm font-medium transition-colors',
                viewMode === 'grid' ? 'bg-gray-200' : 'text-gray-600 hover:bg-gray-100'
              )}
              aria-label="Grid view"
            />
            <BaseButton
              variant="ghost"
              icon={<ListBulletIcon className="h-4 w-4" />}
              title=""
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={clsx(
                'rounded px-3 py-1.5 text-sm font-medium transition-colors',
                viewMode === 'list' ? 'bg-gray-200' : 'text-gray-600 hover:bg-gray-100'
              )}
              aria-label="List view"
            />
          </div>

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
