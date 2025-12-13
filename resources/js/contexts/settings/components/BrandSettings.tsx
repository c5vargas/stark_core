import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { Card } from '@/contexts/shared/components/ui/Card'
import { BaseButton } from '@/contexts/shared/components/Button'
import { MediaSelectorModal } from '@/contexts/shared/components/MediaSelectorModal'
import { Media } from '@/contexts/shared/libs/types'

interface FilePreview {
  file: File | null
  previewUrl: string | null
}

const BrandSettings: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update } = useSettings()

  const [logo, setLogo] = useState<FilePreview>({ file: null, previewUrl: null })
  const [favicon, setFavicon] = useState<FilePreview>({ file: null, previewUrl: null })

  const [logoModalOpen, setLogoModalOpen] = useState(false)
  const [faviconModalOpen, setFaviconModalOpen] = useState(false)

  const handleFileChange = (media: Media, type: 'logo' | 'favicon') => {
    if (type === 'logo') {
      update({ app_logo: media.url })
    } else {
      update({ app_favicon: media.url })
    }
  }

  useEffect(() => {
    if (!settings) return

    if (settings.app_logo) {
      setLogo({ file: null, previewUrl: settings.app_logo })
    }
    if (settings.app_favicon) {
      setFavicon({ file: null, previewUrl: settings.app_favicon })
    }
  }, [settings])

  return (
    <Card>
      <FormField label={t('dashboard.settings.site_logo')}>
        <div className="flex items-center gap-4">
          {logo.previewUrl && (
            <img
              src={logo.previewUrl}
              alt="Logo Preview"
              className="h-16 w-auto rounded border bg-gray-50 object-contain"
            />
          )}
          <BaseButton
            variant="secondary"
            title={t('dashboard.media.select')}
            onClick={() => setLogoModalOpen(true)}
          />
        </div>
      </FormField>

      <FormField label={t('dashboard.settings.site_favicon')}>
        <div className="flex items-center gap-4">
          {favicon.previewUrl && (
            <img
              src={favicon.previewUrl}
              alt="Favicon Preview"
              className="aspect-square size-16 rounded border bg-gray-50 object-cover"
            />
          )}
          <BaseButton
            variant="secondary"
            title={t('dashboard.media.select')}
            onClick={() => setFaviconModalOpen(true)}
          />
        </div>
      </FormField>

      <MediaSelectorModal
        isOpen={logoModalOpen}
        onCancel={() => setLogoModalOpen(false)}
        onSelect={media => handleFileChange(media, 'logo')}
      />

      <MediaSelectorModal
        isOpen={faviconModalOpen}
        onCancel={() => setFaviconModalOpen(false)}
        onSelect={media => handleFileChange(media, 'favicon')}
      />
    </Card>
  )
}

export default BrandSettings
