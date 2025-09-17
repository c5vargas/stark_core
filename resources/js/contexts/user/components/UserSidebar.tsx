import { NavLink } from 'react-router-dom'
import { NavItem } from '@/contexts/settings/libs/types'
import { useTranslation } from 'react-i18next'
import { Card } from '@/contexts/shared/components/ui/Card'
import { SettingsIcon } from '@/contexts/shared/components/HugeIcons'
import clsx from 'clsx'
import { TrashIcon } from '@/contexts/shared/components/Icons'

interface UserSidebarProps {
  userId?: string
}

export const UserSidebar = ({ userId }: UserSidebarProps) => {
  const { t } = useTranslation()

  const navigator: NavItem[] = [
    {
      name: 'dashboard.users.general',
      route: `/dashboard/users/${userId}/general`,
      icon: <SettingsIcon className="me-2 size-4" />,
    },
    {
      name: 'dashboard.users.remove',
      route: `/dashboard/users/${userId}/remove`,
      icon: <TrashIcon className="me-2 size-4" />,
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
