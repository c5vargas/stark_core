import { useRef, useState, DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useUploadMedia } from '../hooks/useUploadMedia'
import { BaseButton } from '@/contexts/shared/components/Button'
import { FolderAddIcon } from '@/contexts/shared/components/HugeIcons'

interface MediaUploadZoneProps {
  onUploadComplete?: () => void
  accept?: string
  multiple?: boolean
}

export const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({
  onUploadComplete,
  accept = 'image/*,video/*',
  multiple = false,
}) => {
  const { t } = useTranslation()
  const { upload, uploading } = useUploadMedia()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    for (const file of fileArray) {
      try {
        await upload(file)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }

    if (onUploadComplete) {
      onUploadComplete()
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
        isDragging
          ? 'border-violet-500 bg-violet-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 text-4xl">
          <FolderAddIcon />
        </div>
        <p className="mb-2 text-lg font-medium text-gray-700">
          {t('dashboard.media.upload_zone.title')}
        </p>
        <p className="mb-4 text-sm text-gray-500">{t('dashboard.media.upload_zone.description')}</p>
        <BaseButton
          variant="primary"
          title={uploading ? t('dashboard.media.uploading') : t('dashboard.media.select_files')}
          onClick={handleClick}
          disabled={uploading}
          loading={uploading}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={e => handleFileChange(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  )
}
