import { Link } from 'react-router-dom'
import { usePublicSettings } from '../hooks/usePublicSettings'

const Footer = () => {
  const { settings } = usePublicSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-600">
            © {currentYear} {settings.app_name || 'App'}. All rights reserved.
          </div>
          <nav className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer

