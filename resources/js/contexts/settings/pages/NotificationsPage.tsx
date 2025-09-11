import { NotificationsForm } from '@/contexts/settings/components/NotificationsForm'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { DocumentationLink } from '@/contexts/settings/components/DocumentationLink'
import { HelpSquareIcon } from '@/contexts/shared/components/HugeIcons'
import { useTranslation } from 'react-i18next'

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full max-w-full flex-0 space-y-4">
        <InfoCard
          title={t('dashboard.settings.one_signal')}
          description={t('dashboard.settings.one_signal_desc')}
        >
          <p className="text-gray-700">{t('dashboard.settings.one_signal_long_desc')}</p>

          <DocumentationLink
            href="https://documentation.onesignal.com/docs/web-push-custom-code-setup"
            title={t('dashboard.settings.one_signal.read_documentation')}
            description={t('dashboard.settings.one_signal.read_documentation_desc')}
            icon={<HelpSquareIcon className="size-8 text-gray-500" />}
          />
        </InfoCard>

        <NotificationsForm />
      </div>
    </div>
  )
}

export default NotificationsPage
