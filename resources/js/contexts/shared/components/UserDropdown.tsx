import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/contexts/auth/stores/authStore'
import { useNavigate } from 'react-router-dom'
import { LogoutSquareIcon, SettingsIcon, User03Icon } from './HugeIcons'
import { Button } from './Button'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuFooter,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuSection,
  useDropdownContext,
} from './ui/Dropdown'

interface UserDropdownProps {
  className?: string
}

const UserDropdownTrigger: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { open, toggle } = useDropdownContext()

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggle}
      aria-expanded={open}
      aria-haspopup="menu"
      aria-label={t('dashboard.user_menu.open_user_menu')}
      className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full !bg-gradient-to-r !from-purple-700 !to-pink-500 text-white">
        <User03Icon className="h-4 w-4" />
      </div>
      <span className="hidden sm:block">{user?.name}</span>
      <svg
        className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </Button>
  )
}

const UserDropdown: React.FC<UserDropdownProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <Dropdown className={className}>
      <UserDropdownTrigger />
      <DropdownMenu>
        <DropdownMenuHeader>
          <p className="mb-0 text-sm font-medium text-slate-900">{user?.name}</p>
          <p className="mb-0 text-sm text-slate-500">{user?.email}</p>
        </DropdownMenuHeader>

        <DropdownMenuSection>
          <DropdownMenuItem to={`/dashboard/users/${user?.id}/general`} icon={<User03Icon />}>
            {t('dashboard.user_menu.my_profile')}
          </DropdownMenuItem>
          <DropdownMenuItem to="/dashboard/settings" icon={<SettingsIcon />}>
            {t('dashboard.settings.settings')}
          </DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuFooter>
          <DropdownMenuItem variant="danger" icon={<LogoutSquareIcon />} onClick={handleLogout}>
            {t('auth.logout')}
          </DropdownMenuItem>
        </DropdownMenuFooter>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
