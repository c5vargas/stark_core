import { useTranslation } from 'react-i18next'
import BrandSettings from '../components/BrandSettings'
import GeneralSettings from '../components/GeneralSettings'
import { InfoCard } from '../components/InfoCard'

const SettingsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.settings.general')}
          description={t('dashboard.settings.general_desc')}
        >
          <p>{t('dashboard.settings.general_long_desc')}</p>
        </InfoCard>
        <BrandSettings />
        <GeneralSettings />
      </div>
    </div>
  )
}

export default SettingsPage
