import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Media } from '../libs/types'
import { BaseButton } from '@/contexts/shared/components/Button'
import { TrashIcon, EyeIcon } from '@/contexts/shared/components/Icons'
import { Modal } from '@/contexts/shared/components/ui/Modal'

interface MediaListItemActionsProps {
  media: Media
  onDelete: (id: number) => void
}

export const MediaListItemActions: React.FC<MediaListItemActionsProps> = ({ media, onDelete }) => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const isImage = media.mime.startsWith('image/')
  const isVideo = media.mime.startsWith('video/')

  const handleDelete = () => {
    onDelete(media.id)
    setShowDeleteModal(false)
  }

  return (
    <>
      <BaseButton
        variant="outline"
        title="Ver"
        icon={<EyeIcon />}
        onClick={() => setShowPreview(true)}
      />
      <BaseButton
        variant="danger"
        title="Eliminar"
        icon={<TrashIcon />}
        onClick={() => setShowDeleteModal(true)}
      />

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
