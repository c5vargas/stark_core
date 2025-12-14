import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/contexts/shared/components/ui/Modal'
import { useMedia } from '../hooks/useMedia'
import { useUploadMedia } from '../hooks/useUploadMedia'
import { Media } from '../libs/types'
import { MediaGrid } from './MediaGrid'
import { BaseButton } from '@/contexts/shared/components/Button'
import { InputFile } from '@/contexts/shared/components/ui/form/InputFile'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'

interface MediaSelectorModalProps {
  isOpen: boolean
  onCancel: () => void
  onSelect: (media: Media) => void
  accept?: string
}

export const MediaSelectorModal: React.FC<MediaSelectorModalProps> = ({
  isOpen,
  onCancel,
  onSelect,
  accept = 'image/*',
}) => {
  const { t } = useTranslation()
  const { media, isLoading, refetch } = useMedia()
  const { upload, uploading } = useUploadMedia()
  const [selected, setSelected] = useState<Media | null>(null)
  const [search, setSearch] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  // Filter media based on search and type
  const filteredMedia = useMemo(() => {
    let filtered = media

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()))
    }

    return filtered
  }, [media, search])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const uploaded = await upload(file)
      setSelected(uploaded)
      refetch()
      setShowUpload(false)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleSubmit = () => {
    if (selected) {
      onSelect(selected)
      onCancel()
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      title={t('dashboard.media.select')}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={t('buttons.select')}
      showFooter={true}
    >
      <div className="flex flex-col gap-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <InputText
              placeholder={t('dashboard.media.search_placeholder')}
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
            />
          </div>
        </div>

        {/* Upload Section */}
        {showUpload ? (
          <div className="space-y-2">
            <FormField label={t('dashboard.media.upload')}>
              <InputFile
                name="upload"
                accept={accept}
                onChange={handleFileChange}
                disabled={uploading}
              />
            </FormField>
            <BaseButton
              variant="secondary"
              size="sm"
              title={t('buttons.cancel')}
              onClick={() => setShowUpload(false)}
            />
          </div>
        ) : (
          <BaseButton
            variant="outline"
            title={t('dashboard.media.upload_new')}
            onClick={() => setShowUpload(true)}
          />
        )}

        {/* Media Grid */}
        <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p>{t('loading')}</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-gray-500">{t('dashboard.media.no_results')}</p>
              {!showUpload && (
                <BaseButton
                  variant="primary"
                  size="sm"
                  title={t('dashboard.media.upload_first')}
                  onClick={() => setShowUpload(true)}
                  className="mt-4"
                />
              )}
            </div>
          ) : (
            <MediaGrid
              media={filteredMedia}
              columns="3"
              onDelete={() => {}} // Disable delete in selector mode
              onSelect={setSelected}
              selectedMedia={selected}
            />
          )}
        </div>

        {/* Selected indicator */}
        {selected && (
          <div className="rounded-lg bg-violet-50 p-3">
            <p className="m-0 text-sm font-medium text-violet-700">
              {t('dashboard.media.selected')}: {selected.filename}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
