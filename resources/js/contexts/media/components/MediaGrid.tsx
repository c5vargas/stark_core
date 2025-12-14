import React from 'react'
import { Media } from '../libs/types'
import { MediaCard } from './MediaCard'
import { Checkbox } from '@/contexts/shared/components/ui/form/Checkbox'
import clsx from 'clsx'

interface MediaGridProps {
  media: Media[]
  selectedMedia?: Media | null
  selectedIds?: number[]
  bulkSelectMode?: boolean
  isLoading?: boolean
  columns?: string
  onDelete: (id: number) => void
  onSelect?: (media: Media) => void
  onBulkSelect?: (id: number, selected: boolean) => void
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  media,
  columns,
  onDelete,
  onSelect,
  selectedMedia,
  selectedIds = [],
  onBulkSelect,
  bulkSelectMode = false,
  isLoading = false,
}) => {
  const columnsClasses = () => {
    switch (columns) {
      case '2':
        return 'grid-cols-2'
      case '3':
        return 'grid-cols-3'
      case '4':
        return 'grid-cols-4'
      case '5':
        return 'grid-cols-5'
      case '6':
        return 'grid-cols-6'
      default:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
    }
  }

  if (isLoading) {
    return (
      <div className={clsx(`grid gap-4 ${columnsClasses()}`)}>
        {[...Array(12).keys()].map(i => (
          <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-500">No hay medios disponibles</p>
          <p className="mt-2 text-sm text-gray-400">Sube tu primer archivo para comenzar</p>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(`grid gap-4 ${columnsClasses()}`)}>
      {media.map(item => {
        const isBulkSelected = bulkSelectMode && selectedIds.includes(item.id)
        const isSelected = bulkSelectMode ? isBulkSelected : selectedMedia?.id === item.id

        return (
          <div key={item.id} className="relative">
            {bulkSelectMode && (
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={isBulkSelected}
                  onChange={checked => onBulkSelect?.(item.id, checked)}
                />
              </div>
            )}
            <MediaCard
              media={item}
              onDelete={onDelete}
              onSelect={onSelect}
              isSelectable={!!onSelect && !bulkSelectMode}
              isSelected={isSelected}
            />
          </div>
        )
      })}
    </div>
  )
}
