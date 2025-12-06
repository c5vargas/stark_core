import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/contexts/auth/stores/authStore'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutSquareIcon, SettingsIcon, User03Icon } from './HugeIcons'

interface UserDropdownProps {
  className?: string
}

const UserDropdown: React.FC<UserDropdownProps> = ({ className = '' }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    navigate('/auth')
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full !bg-gradient-to-r !from-purple-700 !to-pink-500 text-white">
          <User03Icon className="h-4 w-4" />
        </div>
        <span className="hidden sm:block">{user?.name}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black focus:outline-none">
          <div className="py-1">
            <div className="border-b border-slate-200 px-4 py-3">
              <p className="mb-0 text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="mb-0 text-sm text-slate-500">{user?.email}</p>
            </div>

            <div className="py-1">
              <Link
                to={`/dashboard/users/${user?.id}/general`}
                className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                <User03Icon className="mr-3 h-4 w-4" />
                Mi Perfil
              </Link>

              <Link
                to="/dashboard/settings"
                className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                <SettingsIcon className="mr-3 h-4 w-4" />
                Configuración
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-200 py-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogoutSquareIcon className="mr-3 h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
