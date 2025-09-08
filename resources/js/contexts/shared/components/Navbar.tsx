import { useAuthStore } from '@/contexts/auth/stores/authStore'
import { BellIcon, CogIcon, MenuIcon, SearchIcon, ShopIcon, UserIcon } from './Icons'
import { Link } from 'react-router-dom'

interface NavbarProps {
  pageTitle: string
  onHandleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({ pageTitle, onHandleSidebar }) => {
  const { user } = useAuthStore()

  return (
    <nav
      navbar-main=""
      className="duration-250 ease-soft-in relative mx-6 mt-6 flex flex-wrap items-center justify-between rounded-2xl px-0 py-2 shadow-none transition-all lg:flex-nowrap lg:justify-start"
      navbar-scroll="true"
    >
      <div className="flex-wrap-inherit mx-auto flex w-full items-center justify-between px-4 py-1">
        <nav>
          <ol className="mr-12 flex flex-wrap rounded-lg bg-transparent pt-1 sm:mr-16">
            <li className="breadcrumb-item text-sm leading-normal">
              <a className="text-slate-700 opacity-30" href="#">
                <ShopIcon className="mb-1 h-[12px] w-[12px]" />
              </a>
            </li>
            <li className="pl-2 text-sm leading-normal before:float-left before:pr-2 before:text-gray-600 before:content-['/']">
              <a className="text-slate-700 opacity-50" href="#">
                Pages
              </a>
            </li>
            <li
              className="pl-2 text-sm capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
              aria-current="page"
            >
              {pageTitle}
            </li>
          </ol>
          <h6 className="mb-0 font-bold capitalize">{pageTitle}</h6>
        </nav>

        <div className="flex items-center">
          <button
            onClick={onHandleSidebar}
            className="ease-nav-brand hidden p-0 text-sm text-slate-500 transition-all xl:block"
          >
            <div className="w-4.5 overflow-hidden">
              <i className="ease-soft mb-0.75 relative block h-0.5 translate-x-[5px] rounded-sm bg-slate-500 transition-all"></i>
              <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
              <i className="ease-soft relative block h-0.5 translate-x-[5px] rounded-sm bg-slate-500 transition-all"></i>
            </div>
          </button>
        </div>

        <div
          className="mt-2 flex grow items-center sm:mr-6 sm:mt-0 md:mr-0 lg:flex lg:basis-auto"
          id="navbar"
        >
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="ease-soft relative flex w-full flex-wrap items-stretch rounded-lg transition-all">
              <span className="ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-br-none rounded-tr-none border border-r-0 border-transparent bg-transparent px-2.5 py-2 text-center text-sm font-normal text-slate-500 transition-all">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                className="focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pl-9 pr-3 text-sm text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
          </div>

          <ul className="md-max:w-full mb-0 flex list-none flex-row items-center justify-end pl-0">
            <li className="flex h-12 items-center p-0">
              <Link
                to="/dashboard/profile"
                className="ease-nav-brand block flex items-center p-0 text-sm font-semibold text-slate-500 transition-all"
              >
                <UserIcon className="h-5 w-5 md:mr-1" />
                <span className="hidden sm:inline">{user?.name}</span>
              </Link>
            </li>

            <li className="flex h-12 items-center pl-3 md:pl-4 xl:hidden">
              <a
                sidenav-trigger=""
                className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
                href="#"
                aria-expanded="false"
              >
                <MenuIcon className="h-5 w-5" />
              </a>
            </li>

            <li className="flex h-12 items-center px-3 md:px-4">
              <a href="#" className="ease-nav-brand p-0 text-sm text-slate-500 transition-all">
                <CogIcon className="h-4 w-4" />
              </a>
            </li>

            <li className="relative flex h-12 items-center pr-2">
              <p className="transform-dropdown-show hidden"></p>
              <a
                dropdown-trigger=""
                href="#"
                className="ease-nav-brand block p-0 text-sm text-slate-500 transition-all"
                aria-expanded="false"
              >
                <BellIcon className="h-3.5 w-3.5" />
              </a>

              <ul
                dropdown-menu=""
                className="transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 min-w-44 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-sm text-slate-500 opacity-0 transition-all before:absolute before:left-auto before:right-2 before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 before:sm:right-7 lg:absolute lg:left-auto lg:right-0 lg:mt-2 lg:block lg:cursor-pointer"
              >
                <li className="relative mb-2">
                  <a
                    className="ease-soft py-1.2 group clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
                    href="#"
                  >
                    <div className="flex py-1">
                      <div className="my-auto">
                        <img
                          src="../../assets/img/team-2.jpg"
                          className="mr-4 inline-flex h-9 w-9 max-w-none items-center justify-center rounded-xl text-sm text-white"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-1 text-sm font-normal leading-normal group-hover:text-slate-700">
                          <span className="font-semibold">New message</span> from Laur
                        </h6>
                        <p className="mb-0 text-xs leading-tight text-slate-400 group-hover:text-slate-700">
                          <i className="fa fa-clock mr-1" aria-hidden="true"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
