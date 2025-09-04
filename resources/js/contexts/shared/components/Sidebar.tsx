import { useTranslation } from "react-i18next";
import { FoodIcon, MenuRestaurantIcon, ShopIcon } from "./Icons";
import { Link, useLocation } from "react-router-dom";

type NavLink = {
  path: string,
  title: string,
  icon: JSX.Element,
  exact: boolean
}

const Sidebar = ({showSidebar}: {showSidebar: boolean}) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks: NavLink[] = [
    {
      path: '/dashboard',
      title: t('dashboard.title'),
      icon: <ShopIcon />,
      exact: true
    },
    {
      path: '/dashboard/categories',
      title: t('dashboard.categories.title'),
      icon: <MenuRestaurantIcon />,
      exact: false
    },
    {
      path: '/dashboard/settings',
      title: t('dashboard.settings.settings'),
      icon: <MenuRestaurantIcon />,
      exact: false
    },
  ]

  const isActive = (link: NavLink) => {
    if (link.exact) {
      return location.pathname === link.path;
    }
    return location.pathname.startsWith(link.path);
  };

  return showSidebar && (
    <aside className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-200 -translate-x-full bg-white border-0 shadow-none xl:ml-4 ease-soft-in-out z-990 max-w-64 rounded-2xl xl:translate-x-0 xl:bg-transparent ps ps--active-y">
      <div className="h-20">

        <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" aria-hidden="true" sidenav-close-btn=""></i>
        <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href=" https://demos.creative-tim.com/soft-ui-dashboard-pro/pages/dashboards/default.html " target="_blank">
          <img src="https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/assets/img/logo-ct-dark.png" className="inline-block h-full max-w-full transition-all duration-200 ease-soft-in-out max-h-8" alt="main_logo" />
          <img src="https://demos.creative-tim.com/soft-ui-dashboard-pro-tailwind/assets/img/logo-ct.png" className="hidden h-full max-w-full transition-all duration-200 ease-soft-in-out max-h-8" alt="main_logo" />
          <span className="ml-1 font-semibold transition-all duration-200 ease-soft-in-out">Soft UI Dashboard PRO</span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent"></hr>

      <div className="items-center block w-full h-auto grow basis-full" id="sidenav-collapse-main">
        <ul className="flex flex-col pl-0 mb-0 list-none">
         
          {navLinks.map(link => (
            <li key={link.path} className="mt-0.5 w-full">
              <Link
                to={link.path}
                className={`ease-soft-in-out text-sm py-2.7 my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${
                  isActive(link) ? 'active bg-white font-semibold text-slate-700 xl:shadow-soft-xl [&>div>svg]:text-white [&>div]:bg-gradient-to-tl [&>div]:from-purple-700 [&>div]:to-pink-500' : 'text-slate-500'
                }`}
              >
                <div className="[&>svg]:w-[12px] [&>svg]:h-[12px] stroke-none shadow-soft-sm mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                  {link.icon}
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft text-slate-700">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;