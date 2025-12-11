import { NavLink } from 'react-router-dom'
import { NavItem } from '@/contexts/settings/libs/types'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import {
  ActivityLogIcon,
  AnalyticsIcon,
  BackupIcon,
  FingerPrintScanIcon,
  HelpSquareIcon,
  LicenseDraftIcon,
  MailSettingIcon,
  MessageNotificationIcon,
  SecurityLockIcon,
  SettingsIcon,
  TranslationIcon,
} from '@/contexts/shared/components/HugeIcons'
import clsx from 'clsx'

const SettingsSidebar = () => {
  const { t } = useTranslation()

  const navigator: NavItem[] = [
    {
      name: 'dashboard.settings.general',
      route: '/dashboard/settings/general',
      icon: <SettingsIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.localization',
      route: '/dashboard/settings/localization',
      icon: <TranslationIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.analytics',
      route: '/dashboard/settings/analytics',
      icon: <AnalyticsIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.mail',
      route: '/dashboard/settings/mail',
      icon: <MailSettingIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.roles',
      route: '/dashboard/settings/roles',
      icon: <SecurityLockIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.one_signal',
      route: '/dashboard/settings/push',
      icon: <MessageNotificationIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.gdpr',
      route: '/dashboard/settings/gdpr',
      icon: <LicenseDraftIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.backups',
      route: '/dashboard/settings/backups',
      icon: <BackupIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.activity_logs',
      route: '/dashboard/settings/activity-logs',
      icon: <ActivityLogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.custom_fields',
      route: '/dashboard/settings/custom-fields',
      icon: <FingerPrintScanIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.help',
      route: '/dashboard/settings/help',
      icon: <HelpSquareIcon className="me-2 size-4" />,
    },
  ]

  return (
    <Card>
      <div className="flex flex-col">
        {navigator.map(item => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              clsx('flex items-center rounded-lg px-4 py-3 transition', {
                'bg-gray-200 font-medium text-gray-900': isActive,
                'text-gray-700 hover:bg-gray-100': !isActive,
              })
            }
          >
            {item.icon}
            {t(item.name)}
          </NavLink>
        ))}
      </div>
    </Card>
  )
}

export default SettingsSidebar
