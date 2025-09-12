import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { Card } from '@/contexts/shared/components/ui/Card'
import { useUploadMedia } from '@/contexts/shared/hooks/useUploadMedia'
import { InputFile } from '@/contexts/shared/components/ui/form/InputFile'

interface FilePreview {
  file: File | null
  previewUrl: string | null
}

const BrandSettings: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update } = useSettings()
  const { upload } = useUploadMedia()

  const [logo, setLogo] = useState<FilePreview>({ file: null, previewUrl: null })
  const [favicon, setFavicon] = useState<FilePreview>({ file: null, previewUrl: null })

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'favicon'
  ) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    const uploadedFile = await upload(file)

    if (type === 'logo') {
      update({ app_logo: uploadedFile.url })
    } else {
      update({ app_favicon: uploadedFile.url })
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
          <InputFile
            name="site_logo"
            accept="image/*"
            onChange={e => handleFileChange(e, 'logo')}
          />
        </div>
      </FormField>

      <FormField label={t('dashboard.settings.site_favicon')}>
        <div className="flex items-center gap-4">
          {favicon.previewUrl && (
            <img
              src={favicon.previewUrl}
              alt="Favicon Preview"
              className="aspect-square size-16 rounded border bg-gray-50 object-contain object-cover"
            />
          )}
          <InputFile
            name="site_favicon"
            accept="image/x-icon,image/png"
            onChange={e => handleFileChange(e, 'favicon')}
          />
        </div>
      </FormField>
    </Card>
  )
}

export default BrandSettings
