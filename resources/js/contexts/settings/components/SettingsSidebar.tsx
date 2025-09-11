import { NavLink } from 'react-router-dom'
import { NavItem } from '@/contexts/settings/libs/types'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import {
  AnalyticsIcon,
  LicenseDraftIcon,
  MailSettingIcon,
  MessageNotificationIcon,
  SecurityLockIcon,
  SettingsIcon,
  TranslationIcon,
} from '@/contexts/shared/components/HugeIcons'

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
  ]

  return (
    <Card>
      <div className="flex flex-col">
        {navigator.map(item => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              [
                'flex items-center rounded px-4 py-3 transition',
                isActive
                  ? 'bg-gray-200 font-medium text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100',
              ].join(' ')
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
