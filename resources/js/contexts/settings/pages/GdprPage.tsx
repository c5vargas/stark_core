import { GdprForm } from '@/contexts/settings/components/GdprForm'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'

const GdprPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.settings.gdpr')}
          description={t('dashboard.settings.gdpr_desc')}
        >
          <p className="text-gray-700">{t('dashboard.settings.gdpr_long_desc')}</p>
        </InfoCard>

        <GdprForm />
      </div>
    </div>
  )
}

export default GdprPage
