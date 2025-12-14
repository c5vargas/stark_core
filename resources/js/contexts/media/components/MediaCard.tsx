import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Media } from '../libs/types'
import { BaseButton } from '@/contexts/shared/components/Button'
import { TrashIcon, EyeIcon } from '@/contexts/shared/components/Icons'
import { Modal } from '@/contexts/shared/components/ui/Modal'
import { clsx } from 'clsx'

interface MediaCardProps {
  media: Media
  onDelete: (id: number) => void
  onSelect?: (media: Media) => void
  isSelectable?: boolean
  isSelected?: boolean
  showActions?: boolean
}

export const MediaCard: React.FC<MediaCardProps> = ({
  media,
  onDelete,
  onSelect,
  isSelectable = false,
  isSelected = false,
}) => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const isImage = media.mime.startsWith('image/')
  const isVideo = media.mime.startsWith('video/')

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleDelete = () => {
    onDelete(media.id)
    setShowDeleteModal(false)
  }

  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(media)
    }
  }

  return (
    <>
      <div
        className={clsx(
          'group relative overflow-hidden rounded-lg border-2 bg-white transition-all',
          isSelectable && 'cursor-pointer hover:shadow-lg',
          isSelected ? 'border-violet-500 ring-2 ring-violet-200' : 'border-gray-200'
        )}
        onClick={handleCardClick}
      >
        {/* Preview */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {isImage ? (
            <img
              src={media.url}
              alt={media.filename}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : isVideo ? (
            <div className="flex h-full items-center justify-center">
              <video
                src={media.url}
                className="h-full w-full object-cover"
                controls={false}
                preload="metadata"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 text-4xl">📄</div>
                <div className="text-xs text-gray-500">
                  {media.mime.split('/')[1]?.toUpperCase()}
                </div>
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-evenly gap-2 bg-black/0 transition-all group-hover:bg-black/50">
            <BaseButton
              variant="ghost"
              size="xl"
              title=""
              icon={<EyeIcon />}
              onClick={e => {
                e.stopPropagation()
                setShowPreview(true)
              }}
              className="m-0! p-0! text-white opacity-0 group-hover:opacity-100!"
            />
            <BaseButton
              variant="ghost"
              size="xl"
              title=""
              icon={<TrashIcon />}
              onClick={e => {
                e.stopPropagation()
                setShowDeleteModal(true)
              }}
              className="m-0! p-0! text-white opacity-0 group-hover:opacity-100!"
            />
          </div>

          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-white">
              ✓
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-2">
          <p className="truncate text-xs font-medium text-gray-700" title={media.filename}>
            {media.filename}
          </p>
          <p className="text-xs text-gray-500">{formatFileSize(media.size)}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          title={t('dashboard.media.confirm_delete')}
          onCancel={() => setShowDeleteModal(false)}
          onSubmit={handleDelete}
          submitLabel={t('buttons.delete')}
        >
          <p>{t('dashboard.media.delete_message', { filename: media.filename })}</p>
        </Modal>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <Modal title={media.filename} onCancel={() => setShowPreview(false)} showFooter={false}>
          <div className="max-h-[70vh] overflow-auto">
            {isImage ? (
              <img src={media.url} alt={media.filename} className="w-full" />
            ) : isVideo ? (
              <video src={media.url} controls className="w-full" />
            ) : (
              <div className="flex items-center justify-center p-8">
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {t('dashboard.media.download_file')}
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
