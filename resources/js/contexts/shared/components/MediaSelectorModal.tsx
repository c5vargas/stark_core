import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/contexts/shared/components/ui/Modal'
import { useMedia } from '@/contexts/shared/hooks/useMedia'
import { useUploadMedia } from '@/contexts/shared/hooks/useUploadMedia'
import { clsx } from 'clsx'
import { Media } from '@/contexts/shared/libs/types'
import { InputFile } from './ui/form/InputFile'
import { FormField } from './ui/form/FormField'

interface MediaSelectorModalProps {
  isOpen: boolean
  onCancel: () => void
  onSelect: (media: Media) => void
}

export const MediaSelectorModal: React.FC<MediaSelectorModalProps> = ({
  isOpen,
  onCancel,
  onSelect,
}) => {
  const { t } = useTranslation()
  const { media, isLoading, refetch } = useMedia()
  const { upload, uploading } = useUploadMedia()
  const [selected, setSelected] = useState<Media | null>(null)

  if (!isOpen) return null

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const uploaded = await upload(file)
    setSelected(uploaded)
    refetch()
  }

  const handleSubmit = () => {
    if (selected) onSelect(selected)
    onCancel()
  }

  return (
    <Modal title={t('dashboard.media.select')} onCancel={onCancel} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <FormField label={t('dashboard.media.upload')}>
          <InputFile
            name="upload"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </FormField>

        <div className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto pe-1">
          {isLoading ? (
            <p>{t('loading')}</p>
          ) : (
            media.map(m => (
              <div
                key={m.id}
                onClick={() => setSelected(m)}
                className={clsx(
                  'cursor-pointer rounded-md border-2 p-1',
                  selected?.id === m.id
                    ? '!border-violet-500 ring-2 ring-violet-200'
                    : '!border-gray-50'
                )}
              >
                <img src={m.url} alt={m.filename} className="h-20 w-full object-contain" />
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  )
}
