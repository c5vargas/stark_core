import { NavLink } from 'react-router-dom'
import { NavItem } from '../libs/types'
import { useTranslation } from 'react-i18next'
import { CogIcon } from '@/contexts/shared/components/Icons'
import { Card } from '@/contexts/shared/components/ui/Card'

const SettingsSidebar = () => {
  const { t } = useTranslation()

  const navigator: NavItem[] = [
    {
      name: 'dashboard.settings.general',
      route: '/dashboard/settings/general',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.localization',
      route: '/dashboard/settings/localization',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.analytics',
      route: '/dashboard/settings/analytics',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.mail',
      route: '/dashboard/settings/mail',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.roles',
      route: '/dashboard/settings/roles',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.one_signal',
      route: '/dashboard/settings/onesignal',
      icon: <CogIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.settings.gdpr',
      route: '/dashboard/settings/gdpr',
      icon: <CogIcon className="me-2 size-4" />,
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
