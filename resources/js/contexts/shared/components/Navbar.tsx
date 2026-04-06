import { ArrowRightIcon } from './HugeIcons'
import { MenuIcon, ShopIcon } from './Icons'
import UserDropdown from './UserDropdown'
import { Button } from './Button'

interface NavbarProps {
  pageTitle: string
  onHandleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({ pageTitle, onHandleSidebar }) => {
  return (
    <nav className="w-full transition-all duration-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onHandleSidebar}
              className="text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Abrir menú"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>

            <nav className="hidden sm:flex" aria-label="Breadcrumb">
              <ol className="flex items-center gap-1">
                <li className="flex items-center">
                  <ShopIcon className="h-4 w-4 text-slate-400" />
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="h-4 w-6 text-slate-400" />
                  <span className="text-sm text-slate-500">Panel</span>
                </li>
                <li className="flex items-center">
                  <ArrowRightIcon className="h-4 w-6 text-slate-400" />
                  <span
                    className="text-sm font-medium text-slate-900 capitalize"
                    aria-current="page"
                  >
                    {pageTitle}
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onHandleSidebar}
              className="hidden text-slate-600 hover:bg-slate-100 lg:block xl:hidden [&>svg]:!h-5 [&>svg]:!w-5"
              aria-label="Toggle sidebar"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>

            <UserDropdown />
          </div>
        </div>

        <div className="pb-4 lg:hidden">
          <h1 className="text-lg font-semibold text-slate-900 capitalize">{pageTitle}</h1>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
