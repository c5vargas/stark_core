import { Link } from 'react-router-dom'
import { usePublicSettings } from '../hooks/usePublicSettings'

const Header = () => {
  const { settings } = usePublicSettings()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            {settings.app_logo ? (
              <img
                src={settings.app_logo}
                alt={settings.app_name || 'Logo'}
                className="h-10 max-h-10 w-auto max-w-[200px] object-contain"
              />
            ) : (
              <span className="text-xl font-semibold text-gray-900">
                {settings.app_name || 'App'}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

