import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'
import { PermissionsForm } from '@/contexts/settings/components/permissions/PermissionsForm'

const PermissionsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.settings.roles')}
          description={t('dashboard.settings.roles_desc')}
        >
          <p className="text-gray-700">{t('dashboard.settings.roles_long_desc')}</p>
        </InfoCard>

        <PermissionsForm />
      </div>
    </div>
  )
}

export default PermissionsPage
