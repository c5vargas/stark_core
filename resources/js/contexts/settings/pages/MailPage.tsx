import { MailSettingsForm } from '@/contexts/settings/components/MailSettingsForm'
import { MailerTest } from '@/contexts/settings/components/MailerTest'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'

const MailPage = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.settings.mail')}
          description={t('dashboard.settings.mail_desc')}
        >
          <p>{t('dashboard.settings.mail_long_desc')}</p>
        </InfoCard>

        <MailSettingsForm />
        <MailerTest />
      </div>
    </div>
  )
}

export default MailPage
