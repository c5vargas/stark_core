import React from 'react'
import { useTranslation } from 'react-i18next'
import { Media } from '../libs/types'
import { Checkbox } from '@/contexts/shared/components/ui/form/Checkbox'
import { formatDate } from '@/contexts/shared/utils/date'
import { MediaListItemActions } from './MediaListItemActions'

interface MediaListViewProps {
  media: Media[]
  onDelete: (id: number) => void
  selectedIds: number[]
  onSelect: (id: number, selected: boolean) => void
  isLoading?: boolean
}

export const MediaListView: React.FC<MediaListViewProps> = ({
  media,
  onDelete,
  selectedIds,
  onSelect,
  isLoading = false,
}) => {
  const { t } = useTranslation()

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(10).keys()].map(i => (
          <div
            key={i}
            className="flex animate-pulse gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <div className="h-16 w-16 rounded bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-3 w-1/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-500">{t('dashboard.media.no_media')}</p>
          <p className="mt-2 text-sm text-gray-400">{t('dashboard.media.upload_first_message')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {media.map(item => {
        const isSelected = selectedIds.includes(item.id)
        const isImage = item.mime.startsWith('image/')
        const isVideo = item.mime.startsWith('video/')

        return (
          <div
            key={item.id}
            className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
              isSelected
                ? 'border-violet-500 bg-violet-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Checkbox checked={isSelected} onChange={checked => onSelect(item.id, checked)} />

            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100">
              {isImage ? (
                <img src={item.url} alt={item.filename} className="h-full w-full object-cover" />
              ) : isVideo ? (
                <div className="flex h-full items-center justify-center bg-gray-800">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl">📄</div>
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h5 className="mb-0 truncate font-medium text-gray-900" title={item.filename}>
                {item.filename}
              </h5>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{formatFileSize(item.size)}</span>
                <span>•</span>
                <span>{item.mime}</span>
                <span>•</span>
                <span>{formatDate(item.created_at as string, 'short')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MediaListItemActions media={item} onDelete={onDelete} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
