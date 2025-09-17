import { useTranslation } from 'react-i18next'
import { ShopIcon, UserIcon } from './Icons'
import { Link, useLocation } from 'react-router-dom'
import { useSettings } from '@/contexts/settings/hooks/useSettings'

type NavLink = {
  path: string
  title: string
  icon: JSX.Element
  exact: boolean
}

const Sidebar = ({ showSidebar }: { showSidebar: boolean }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const location = useLocation()

  const navLinks: NavLink[] = [
    {
      path: '/dashboard',
      title: t('dashboard.title'),
      icon: <ShopIcon />,
      exact: true,
    },
    {
      path: '/dashboard/users',
      title: t('dashboard.users.title'),
      icon: <UserIcon />,
      exact: false,
    },
    {
      path: '/dashboard/settings',
      title: t('dashboard.settings.settings'),
      icon: <ShopIcon />,
      exact: false,
    },
  ]

  const isActive = (link: NavLink) => {
    if (link.exact) {
      return location.pathname === link.path
    }
    return location.pathname.startsWith(link.path)
  }

  const baseClasses =
    'ease-soft-in-out py-2.7 mx-4 my-0 flex items-center rounded-lg px-4 text-sm whitespace-nowrap transition-all'

  const activeClasses =
    'active xl:shadow-soft-xl bg-white font-semibold text-slate-700 [&>div]:bg-gradient-to-tl [&>div]:from-purple-700 [&>div]:to-pink-500 [&>div>svg]:text-white'

  const inactiveClasses = 'text-slate-500'

  return (
    showSidebar && (
      <aside className="ease-soft-in-out ps ps--active-y fixed inset-y-0 left-0 z-990 my-4 block w-full max-w-64 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-none transition-all duration-200 xl:ml-4 xl:translate-x-0 xl:bg-transparent">
        <div className="h-auto">
          <i
            className="fas fa-times absolute top-0 right-0 cursor-pointer p-4 text-slate-400 opacity-50 xl:hidden"
            aria-hidden="true"
            sidenav-close-btn=""
          ></i>
          <div className="m-0 block px-8 py-6 text-sm whitespace-nowrap text-slate-700">
            <img
              src={settings?.app_logo || ''}
              className="ease-soft-in-out inline-block h-full max-h-16 max-w-full transition-all duration-200"
              alt="main_logo"
            />
          </div>
        </div>

        <hr className="mt-0 h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent"></hr>

        <div
          className="block h-auto w-full grow basis-full items-center"
          id="sidenav-collapse-main"
        >
          <ul className="mb-0 flex list-none flex-col pl-0">
            {navLinks.map(link => (
              <li key={link.path} className="mt-0.5 w-full">
                <Link
                  to={link.path}
                  className={`${baseClasses} ${isActive(link) ? activeClasses : inactiveClasses}`}
                >
                  <div className="shadow-soft-sm mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current stroke-none p-2.5 text-center text-black [&>svg]:h-[12px] [&>svg]:w-[12px]">
                    {link.icon}
                  </div>
                  <span className="ease-soft pointer-events-none ml-1 text-slate-700 opacity-100 duration-300">
                    {link.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    )
  )
}

export default Sidebar
